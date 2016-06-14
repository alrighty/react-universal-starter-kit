import fs from 'fs';
import invariant from 'invariant';

const createBundle = (webpackStats) => {
  const { publicPath, assetsByChunkName } = webpackStats

  const createURL = (asset) =>
    publicPath + asset

  const getAssets = (chunks = [ 'main' ]) =>
    (Array.isArray(chunks) ? chunks : [ chunks ]).reduce((memo, chunk) => (
      memo.concat(assetsByChunkName[chunk] || [])
    ), [])

  const getScriptAssets = (...args) =>
    getAssets(...args)
      .filter(asset => (/\.js$/).test(asset))
      .map(createURL)

  const getStyleAssets = (...args) =>
    getAssets(...args)
      .filter(asset => (/\.css$/).test(asset))
      .map(createURL)

  return {
    createURL,
    getAssets,
    getScriptAssets,
    getStyleAssets
  }
}

/**
 * An express middleware that sets req.bundle from the build
 * info in the given stats file. Should be used in production.
 */
export const staticAssets = (webpackStatsFile) => {
  let stats
  try {
    stats = JSON.parse(fs.readFileSync(webpackStatsFile, 'utf8'))
  } catch (error) {
    invariant(
      false,
      'staticAssets middleware cannot read the build stats in %s; ' +
      'do `npm run build` before starting the server',
      webpackStatsFile
    )
  }

  const bundle = createBundle(stats)

  return (req, res, next) => {
    req.bundle = bundle
    next()
  }
}

/**
 * An express middleware that sets req.bundle from the
 * latest result from a running webpack compiler (i.e. using
 * webpack-dev-middleware). Should only be used in dev.
 */
export const devAssets = (webpackCompiler) => {
  const callbacks = [];
  let bundle;

  const waitUntilDone = (callback) => {
    if (!bundle) {
      callbacks.push(callback);
    } else {
      callback();
    }
  }

  webpackCompiler.plugin('done', (stats) => {
    bundle = createBundle(stats.toJson());
    while(callbacks.length) {
      callbacks.shift().call();
    }
  })

  return (req, res, next) => {
    waitUntilDone(() => {
      req.bundle = bundle;
      next();
    });
  }
}
