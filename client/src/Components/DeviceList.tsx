import React, { FC } from "react";
import {withQuery} from "react-apollo";
import {gql} from "apollo-boost";

interface Props {
  title: string;
  devicesQuery: any;
}

/**
 * This example exists to test typing on apollo-boost/compose
 */
const DeviceList: FC<Props> = ({title, devicesQuery}) => <>
  <h1>{title}</h1>
  <ul>
    {devicesQuery && devicesQuery.devices && devicesQuery.devices.map(({name, manufacturer}: any) => <li key={name}>{name} <i>by {manufacturer}</i></li>)}
  </ul></>;


export default withQuery(gql`
  {
    devices @client {
      name
      manufacturer
    } 
  }`, {
  name: "devicesQuery"
})
// @ts-ignore
(DeviceList);

/*
1. Without HOCs

This works fine:

interface Props {
  title: string;
}
const DeviceList: FC<Props> = ({title}) => <><h1>{title}</h1><ul><li>test</li></ul></>;

Now, when DeviceList is used in App.tsx, adding properties that are not in the Props type or leaving out the
title prop will give a compiler error. This is the expected behavior.

2. Add HOC without any helpers

3. When using recompose/compose to add HOCs

4. With apollo-boost/compose

5. also with input params to Query (?)
 */