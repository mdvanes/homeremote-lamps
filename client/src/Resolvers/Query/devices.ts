import {Resolver} from "../Resolver.type";

const devices: Resolver = (_, variables, {cache, getCacheKey}) => {
  return [{
    name: "a",
    manufacturer: "b"
  }];
};

export default devices;
