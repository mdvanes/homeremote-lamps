import React, { FC, ComponentType as Component, ComponentClass } from "react";

import { OperationOption, withQuery } from "react-apollo";
import { gql } from "apollo-boost";

/** compose */
interface ComponentEnhancer<TInner, TOuter> {
  (component: Component<TInner>): ComponentClass<TOuter>;
}

// type Compose =  <TInner, TOutter>(
//   ...functions: Function[]
// ) => ComponentEnhancer<TInner, TOutter>;
//
// // const compose = <TInner, TOuter>(...funcs: Function[]): ComponentEnhancer<TInner, TOuter> =>
// //   funcs.reduce((a, b) => (...args: any[]) => a(b(...args)), (arg: any) => arg)
//
// const compose: Compose = (...funcs) =>
//   funcs.reduce((a, b) => (...args) => a(b(...args)), arg => arg)

function compose<TInner, TOuter>(
  ...funcs: Function[]
): ComponentEnhancer<TInner, TOuter> {
  const functions = funcs.reverse();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-function-return-type,func-names
  return function(...args: any[]) {
    const [firstFunction, ...restFunctions] = functions;
    // eslint-disable-next-line prefer-spread
    let result = firstFunction.apply(null, args);
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    restFunctions.forEach(fnc => {
      result = fnc.call(null, result);
    });
    return result;
  };
}

/** types */
export interface Device {
  __typename?: "Device";
  name: string;
  manufacturer: string;
}

interface Location {
  __typename?: "Location";
  lon: number;
  lat: number;
}

export enum Country {
  NL = "NL"
  // BE = "BE",
  // LU = "LU"
}

export interface Vendor {
  __typename?: "Vendor";
  name: string;
  stock: string[];
  location: Location;
}

interface OuterProps {
  title: string;
}

interface InnerProps {
  devicesQuery: {
    devices: Device[];
  };
  vendorsQuery: {
    vendors: Vendor[];
  };
}

type Props = OuterProps & InnerProps;

/**
 * This example exists to test typing on apollo-boost/compose
 */
const DeviceList: FC<Props> = ({
  title,
  devicesQuery,
  vendorsQuery: { vendors }
}): JSX.Element => (
  <>
    <h1>{title}</h1>
    <table>
      <thead>
        <tr>
          <td>Device Name</td>
          <td>Manufacturer</td>
          <td>Vendor Location</td>
        </tr>
      </thead>
      <tbody>
        {devicesQuery &&
          devicesQuery.devices &&
          devicesQuery.devices.map(
            ({ name, manufacturer }: Device): JSX.Element => (
              <tr key={name}>
                <td>{name}</td>
                <td>{manufacturer}</td>
                <td>
                  {vendors && vendors.map((v): string => v.name).join(", ")}
                </td>
              </tr>
            )
          )}
      </tbody>
    </table>
  </>
);

// Source:  https://graphql-code-generator.com/
//
// export type FindUserComponentProps = Omit<Omit<ReactApollo.QueryProps<FindUserQuery, FindUserQueryVariables>, 'query'>, 'variables'> & { variables: FindUserQueryVariables };
//
// export const FindUserComponent = (props: FindUserComponentProps) => (
//   <ReactApollo.Query<FindUserQuery, FindUserQueryVariables> query={FindUserDocument} {...props} />
// );
//
// export type FindUserProps<TChildProps = {}> = Partial<ReactApollo.DataProps<FindUserQuery, FindUserQueryVariables>> & TChildProps;
//
// function withFindUser<TProps, TChildProps = {}>(operationOptions?: ReactApollo.OperationOption<
//   TProps,
//   FindUserQuery,
//   FindUserQueryVariables,
//   FindUserProps<TChildProps>>) {
//     return ReactApollo.withQuery<TProps, FindUserQuery, FindUserQueryVariables, FindUserProps<TChildProps>>(FindUserDocument, {
//       alias: 'withFindUser',
//       ...operationOptions
//     });
// };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TGraphQLVariables {}

/** withDevicesList HOC - should be in separate file (e.g. Containers/withDevicesList) but embedded here to make it easier to share all relevant code in one go * */
function withDevicesList<TProps, TChildProps = {}>(
  operationOptions: OperationOption<
    TProps,
    Device[],
    TGraphQLVariables,
    TChildProps
  >
) {
  return withQuery<TProps, Device[], TGraphQLVariables, TChildProps>(
    gql`
      {
        devices @client {
          name
          manufacturer
        }
      }
    `,
    {
      name: "devicesQuery",
      ...operationOptions
    }
  );
}

/** withVendors HOC - should be in separate file (e.g. Containers/withVendors) but embedded here to make it easier to share all relevant code in one go * */
interface VendorsQueryVariables {
  countryCode: Country;
}
function withVendors<TProps, TChildProps = {}>(
  operationOptions: OperationOption<
    TProps,
    Vendor[],
    VendorsQueryVariables,
    TChildProps
  >
) {
  return withQuery<TProps, Vendor[], VendorsQueryVariables, TChildProps>(
    gql`
      query vendorsQuery($countryCode: Country) {
        vendors(countryCode: $countryCode) @client {
          name
          location {
            lat
            lon
          }
        }
      }
    `,
    {
      name: "vendorsQuery",
      options: {
        variables: {
          countryCode: Country.NL
        }
      },
      ...operationOptions
    }
  );
}

// export default withDevicesList<OuterProps, Props>({})(DeviceList);
export default compose<Props, OuterProps>(
  withDevicesList<OuterProps, Props>({}),
  withVendors<OuterProps, Props>({
    // Can be here, too
    // options: {
    //   variables: {
    //     countryCode: "NL"
    //   }
    // }
  })
)(DeviceList);

/*
First step: https://blog.apollographql.com/getting-started-with-typescript-and-apollo-a9aa2c7dcf87

1. Without HOCs

This works fine:

interface Props {
  title: string;
}
const DeviceList: FC<Props> = ({title}) => <><h1>{title}</h1><ul><li>test</li></ul></>;

Now, when DeviceList is used in App.tsx, adding properties that are not in the Props type or leaving out the
title prop will give a compiler error. This is the expected behavior.

2. Add HOC without any helpers

Adding a Query HOC like this works and retains the expected behavior. Placement of Props vs OuterProps in the generic type
is non trivial. It is also unclear to me how the OuterProps is passed to the withQuery HOC content, since it is only used
in operationOptions, but removing it will break the behavior.

export interface Device {
  __typename?: "Device";
  name: string;
  manufacturer: string;
}

interface OuterProps {
  title: string;
}

interface InnerProps {
  devicesQuery: any;
}

type Props = OuterProps & InnerProps;

const DeviceList: FC<Props> = ({title, devicesQuery}) => <>
  <h1>{title}</h1>
  <ul>
    {devicesQuery && devicesQuery.devices && devicesQuery.devices.map(({name, manufacturer}: Device) => <li key={name}>{name} <i>by {manufacturer}</i></li>)}
  </ul></>;

type TGraphQLVariables = {};

function withDevicesList<TProps, TChildProps = {}>(operationOptions: OperationOption<TProps, Device[], TGraphQLVariables, TChildProps>) {
  return withQuery(gql`
    {
      devices @client {
        name
        manufacturer
      }
    }`, {
    name: "devicesQuery",
    ...operationOptions
  })
}

export default withDevicesList<OuterProps, Props>({})(DeviceList);

3. When using recompose/compose to add HOCs

Skipped.

4. With apollo-boost/compose

Exporting like this:

import {OperationOption, withQuery, compose} from "react-apollo";
...
export default compose(withDevicesList<OuterProps, Props>({}))(DeviceList);

Breaks all type checking! Removing the generic (like so export default compose(withDevicesList({}))(DeviceList);
) gives no warnings, but also in App.tsx, the are no checks on the props anymore.
It is because this is not typed (enough): https://github.com/apollographql/react-apollo/blob/2a330a770d96b8849abb40906b2dacdf69187d3b/src/utils/flowRight.ts

export function compose(...funcs: Function[]) {
  const functions = funcs.reverse();
  return function (...args: any[]) {
    const [firstFunction, ...restFunctions] = functions
    let result = firstFunction.apply(null, args);
    restFunctions.forEach((fnc) => {
      result = fnc.call(null, result)
    });
    return result;
  }
}

Its type:
export declare function compose(...funcs: Function[]): (...args: any[]) => any;

The source for the alternative acdlite/recompose/compose is:

https://github.com/acdlite/recompose/blob/master/src/packages/recompose/compose.js
const compose = (...funcs) =>
  funcs.reduce((a, b) => (...args) => a(b(...args)), arg => arg)

export default compose

The type for acdlite/recompose/compose is:

// Source: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/3ba6ab5908979830a8bc179cccd428180a5e0ff2/types/recompose/index.d.ts#L302
// compose: https://github.com/acdlite/recompose/blob/master/docs/API.md#compose
export function compose<TInner, TOutter>(
    ...functions: Function[]
): ComponentEnhancer<TInner, TOutter>;

A proposed PR to fix this: https://github.com/apollographql/react-apollo/pull/3070

5. also with input params to Query (?), multiple Queries, and simplified type (without Operation), Add Styles

 */
