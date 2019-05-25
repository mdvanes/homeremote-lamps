import {Resolver} from "../Resolver.type";

const devices: Resolver = (_, variables, {cache, getCacheKey}) => {
  return [{
    __typename: "Device",
    name: "Switcheroo",
    manufacturer: "Baeon"
  }, {
    __typename: "Device",
    name: "IrPlug",
    manufacturer: "Figaro"
  }];
};

export default devices;
