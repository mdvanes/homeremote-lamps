/* eslint-disable @typescript-eslint/no-explicit-any */
interface Cache {
  cache: any;
  getCacheKey: any;
}

// eslint-disable-next-line
export type Resolver = (
  _: any,
  variables: any,
  { cache, getCacheKey }: Cache
) => any;
