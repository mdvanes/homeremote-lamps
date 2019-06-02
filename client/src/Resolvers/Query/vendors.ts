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
          lat: 52.05668,
          lon: 5.11049
        }
      },
      {
        __typename: "Vendor",
        name: "HotRed",
        stock: ["IrPlug"],
        location: {
          __typename: "Location",
          lat: 51.70266,
          lon: 5.28726
        }
      }
    ];
  }
  return [];
};

export default vendors;
