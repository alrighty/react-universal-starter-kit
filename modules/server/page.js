import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import serialize from 'serialize-javascript';

import configureStore from 'app/store';
import routes from 'app/routes';

import fetchAsyncData from './utils/fetchAsyncData';
import createServerFetch from './utils/createServerFetch';

export const devSendPage = (req, res) => {
  const chunks = ['common', 'main'];
  res.render('index', {
    title: 'React Universal Starter Kit',
    styles: req.bundle.getStyleAssets(chunks),
    scripts: req.bundle.getScriptAssets(chunks)
  });
}

export const sendPage = (req, res) => {
  const memoryHistory = createMemoryHistory(req.url)
  const store = configureStore({
    history: memoryHistory,
    fetch: createServerFetch({ cookies: req.cookies })
  })
  const history = syncHistoryWithStore(memoryHistory, store)

  match({ history, routes, location: req.url }, async (error, redirectLocation, renderProps) => {
    try {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {

        // Fetch components data
        await fetchAsyncData(renderProps.components, { store });

        const state = serialize(store.getState());

        // Render app
        const content = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps}/>
          </Provider>
        );

        // Assets
        const chunks = ['common', 'main'];
        const styles = req.bundle.getStyleAssets(chunks);
        const scripts = req.bundle.getScriptAssets(chunks);

        // Render page
        res.render('index', {
          title: 'React Universal Starter Kit',
          styles,
          scripts,
          content,
          state
        });
      }
    } catch(error) {
      res.status(500).send(error.message)
    }
  })
}
