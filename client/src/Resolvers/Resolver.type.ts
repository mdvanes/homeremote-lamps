interface ICache {
  cache: any,
  getCacheKey: any
}

export type Resolver = (_: any, variables: any, {cache, getCacheKey}: ICache) => any;
