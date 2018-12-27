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

export const resolvers = {
  Mutation: {
    toggleAnimation: (_: any, variables: any, {cache, getCacheKey}: { cache: any, getCacheKey: any }) => {
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
  },
};