import { Resolver } from "../Resolver.type";
import { Vendor } from "../../Components/DeviceList";

const vendors: Resolver = (_, variables, { cache, getCacheKey }): Vendor[] => {
  console.log("in Vendor Resolver", variables);
  return [
    {
      __typename: "Vendor",
      name: "EddShop",
      stock: ["Switcheroo", "IrPlug"],
      location: {
        __typename: "Location",
        lat: 1.23456,
        lon: 1.24566
      }
    },
    {
      __typename: "Vendor",
      name: "HotRed",
      stock: ["Switcheroo", "IrPlug"],
      location: {
        __typename: "Location",
        lat: 1.23456,
        lon: 1.24566
      }
    }
  ];
};

export default vendors;
