import { Resolver } from "../Resolver.type";
import { Country } from "../../Components/DeviceList";
import { Vendor } from "../../Containers/withShowVendorMutation";

const vendors: Resolver = (_, variables, { cache, getCacheKey }): Vendor[] => {
  // console.log("in Vendor Resolver", variables);
  if (variables && variables.countryCode === Country.NL) {
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
        stock: ["IrPlug"],
        location: {
          __typename: "Location",
          lat: 1.23456,
          lon: 1.24566
        }
      }
    ];
  }
  return [];
};

export default vendors;
