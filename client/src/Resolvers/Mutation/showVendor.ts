import { Resolver } from "../Resolver.type";

const showVendor: Resolver = (_, variables, { cache, getCacheKey }): null => {
  console.log("in show vendor resolver", variables);
  return null;
};

export default showVendor;
