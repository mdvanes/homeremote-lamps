import { Resolver } from "../Resolver.type";
import { Vendor } from "../../Components/DeviceList";

const vendors: Resolver = (_, variables, { cache, getCacheKey }): Vendor[] => {
  console.log(variables);
  return [
    {
      __typename: "Vendor",
      name: "EddShop",
      stock: [],
      location: {
        lat: 1.23456,
        lon: 1.24566
      }
    },
    {
      __typename: "Vendor",
      name: "HotRed",
      stock: [],
      location: {
        lat: 1.23456,
        lon: 1.24566
      }
    }
  ];
};

export default vendors;
