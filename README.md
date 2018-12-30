# homeremote-lamps
Experiment to rewrite the lightswitches component of Homeremote

## Running

* Run `nvm use` in both `/server` and `/client`
* Run `yarn` in both `/server` and `/client`
* Run `yarn start` in both `/server` and `/client`

## Target stack

* :heavy_check_mark: CRA https://github.com/facebook/create-react-app
* :heavy_check_mark: TypeScript
* :heavy_check_mark: Apollo-GraphQL for API
* :heavy_check_mark: Node + Express https://www.apollographql.com/docs/apollo-server/getting-started.html
* :heavy_check_mark: optional: Styled Components
* Apollo-GraphQL for Local state management in the UI @ https://www.apollographql.com/docs/react/essentials/local-state.html#queries
* Type coverage with https://www.npmjs.com/package/type-coverage (seems to just give a list of missing type path+positions)
* Add a REST call: https://www.apollographql.com/docs/link/links/rest.html  https://github.com/apollographql/apollo-link-rest/ - alternatively use a bridge https://github.com/dacz/apollo-bridge-link
* Apollo Boost does not support Apollo devtools
* Add observable with watchQuery
* Build a query dynamically
* Use https://graphql-code-generator.com/ to generate types and HOC
* Observables are very well possible with GraphQL. Apollo is all-in-one solution for modern web: types, observables, local state, REST, GraphQL 


## Resources

* https://www.apollographql.com/docs/react/
* https://www.apollographql.com/docs/react/essentials/get-started.html
* https://www.apollographql.com/docs/react/essentials/local-state.html
* https://blog.apollographql.com/the-future-of-state-management-dd410864cae2
* local state codesandbox: https://codesandbox.io/s/github/apollographql/apollo-link-state/tree/master/examples/todo
* https://graphql-code-generator.com/ by Uri Goldshtein
* No `jsx` extension: https://github.com/facebook/create-react-app/issues/87 and https://github.com/facebook/create-react-app/releases/tag/v0.4.1. However `tsx` extension is still needed.
* Space X open API: https://github.com/r-spacex/SpaceX-API