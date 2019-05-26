import {Resolver} from "../Resolver.type";
import {Device} from "../../Components/DeviceList";

const devices: Resolver = (_, variables, {cache, getCacheKey}): Device[] => {
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
