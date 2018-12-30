import gql from 'graphql-tag';

export const defaults = {
  animationItems: [{
    __typename: 'AnimationItem',
    id: 1,
    name: 'App-logo',
    isAnimating: true
  }],
  logger: 'Initial logger'
};

interface ICache {
  cache: any,
  getCacheKey: any
}

export const resolvers = {
  Mutation: {
    toggleAnimation: (_: any, variables: any, {cache, getCacheKey}: ICache) => {
      const id = getCacheKey({__typename: 'AnimationItem', id: variables.id});
      const fragment = gql`
        fragment animatingItem on AnimationItem {
          isAnimating
        }
      `;
      const animationItem = cache.readFragment({fragment, id});
      const data = {...animationItem, isAnimating: !animationItem.isAnimating};
      cache.writeData({id, data});
      return null;
    },
    toggleLamp: (_: any, variables: any, {cache, getCacheKey}: ICache) => {
      const id = getCacheKey({__typename: 'Lamp', id: variables.id});
      const fragment = gql`
        fragment toggleLamp on lamps {
          isOn
        }
      `;
      /* This works, but gives this error: You are using the simple (heuristic) fragment matcher, but your queries contain union or interface types. Apollo Client will not be able to accurately map fragments. To make this error go away, use the `IntrospectionFragmentMatcher` as described in the docs: https://www.apollographql.com/docs/react/recipes/fragment-matching.html */
      const toggleLamp = cache.readFragment({fragment, id});
      const data = {...toggleLamp, isOn: !toggleLamp.isOn};
      cache.writeData({id, data});
      return null;
    }
  },
  Lamp: {
    __typename: 'Lamp',
    isOn: () => false,
  }
};