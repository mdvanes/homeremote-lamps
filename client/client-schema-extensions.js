import { gql } from 'apollo-boost';

// eslint-disable-next-line no-unused-vars
const clientSchemaExtensions = gql`

  "Indicates that the client should resolve the field value locally as part of a query, e.g. in a React component"
  directive @client on FIELD

  type AnimationItem {
    id: String
    isAnimating: Boolean
  }
  
  extend type Query {
    "Cient-only field that contains a list of animation items"
    animationItems: [AnimationItem]
  }
  
  scalar None
  
  extend type Mutation {
    toggleLamp(id: Int): None
  }
  
  extend type Lamp {
    isOn: Boolean
  }
`;
