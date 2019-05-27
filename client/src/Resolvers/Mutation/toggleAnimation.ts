import { gql } from "apollo-boost";
import { Resolver } from "../Resolver.type";

const toggleAnimation: Resolver = (
  _,
  variables,
  { cache, getCacheKey }
): null => {
  const id = getCacheKey({ __typename: "AnimationItem", id: variables.id });
  const fragment = gql`
    fragment animatingItem on AnimationItem {
      isAnimating
    }
  `;
  const animationItem = cache.readFragment({ fragment, id });
  const data = { ...animationItem, isAnimating: !animationItem.isAnimating };
  cache.writeData({ id, data });
  return null;
};

export default toggleAnimation;
