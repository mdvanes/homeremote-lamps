import { gql } from 'apollo-boost';

// eslint-disable-next-line no-unused-vars
const clientSchemaExtensions = gql`

  "Indicates that the client should resolve the field value locally as part of a query, e.g. in a React component"
  directive @client on FIELD

  type AnimationItem {
    id: String
    isAnimating: Boolean
  }
  
  type Device {
    name: String
    manufacturer: String
  }
  
  type Location {
    lon: Float
    lat: Float
  }
  
  type Vendor {
    name: String
    stock: [Device]
    location: Location
  }
  
  enum Country {
    NL
    BE
    LU
  }
  
  extend type Query {
    "Client-only field that contains a list of animation items"
    animationItems: [AnimationItem]
    "Client-only field with a list of devices"
    devices: [Device]
    "Client-only field with a list of vendors for devices"
    vendors(countryCode: Country): [Vendor]
  }
  
  scalar None
  
  extend type Mutation {
    toggleLamp(id: Int): None
  }
  
  extend type Lamp {
    isOn: Boolean
  }
`;
