import {Resolver} from "../Resolver.type";
import {gql} from "apollo-boost";

const toggleLamp: Resolver =  (_, variables, {cache, getCacheKey}) => {
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
};

export default toggleLamp;
