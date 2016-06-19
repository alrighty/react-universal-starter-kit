// Some code from: https://github.com/ryanflorence/async-props/blob/master/modules/AsyncProps.js

const eachComponents = (components, iterator) => {
  for (let i = 0, l = components.length; i < l; i++) {
    if (typeof components[i] === 'object') {
      for (const key in components[i]) { // eslint-disable-line guard-for-in, no-restricted-syntax
        iterator(components[i][key])
      }
    } else {
      iterator(components[i])
    }
  }
}

const filterAndFlattenComponents = (components) => {
  const flattened = []
  eachComponents(components, (Component) => {
    if (Component && Component.fetchData) {
      flattened.push(Component)
    }
  })
  return flattened
}

const fetchAllData = (components, props) => components.map(
  (Component) => Component.fetchData(props)
)

export default function fetchAsyncData(rawComponents, props) {
  const components = filterAndFlattenComponents(rawComponents)
  return Promise.all(fetchAllData(components, props))
}
