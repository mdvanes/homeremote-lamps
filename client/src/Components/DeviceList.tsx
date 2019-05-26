import React, { FC } from "react";
import {OperationOption, withQuery} from "react-apollo";
import {gql} from "apollo-boost";

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

/**
 * This example exists to test typing on apollo-boost/compose
 */
const DeviceList: FC<Props> = ({title, devicesQuery}) => <>
  <h1>{title}</h1>
  <ul>
    {devicesQuery && devicesQuery.devices && devicesQuery.devices.map(({name, manufacturer}: Device) => <li key={name}>{name} <i>by {manufacturer}</i></li>)}
  </ul></>;

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

4. With apollo-boost/compose

5. also with input params to Query (?)
 */