import { Resolver } from "../Resolver.type";
// import { Vendor } from "../../Containers/withShowVendorMutation";

const showVendor: Resolver = (_, { vendorName }, { cache, getCacheKey }): null => {
  try {
    // If variable `vendor` would have type Vendor, writing like this:
    // cache.writeData({
    //   data: {
    //     showVendor: vendor
    //   }
    // });
    // yields: Missing selection set for object of type Vendor returned for query field showVendor
    cache.writeData({
      data: {
        showVendor: vendorName
      }
    });
  } catch (ex) {
    console.log(ex);
  }
  return null;
};

export default showVendor;
