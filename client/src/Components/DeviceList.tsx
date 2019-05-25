import React, { FC } from "react";

interface Props {
  title: string;
}

/**
 * This example exists to test typing on apollo-boost/compose
 */
const DeviceList: FC<Props> = ({title}) => <><h1>{title}</h1><ul><li>test</li></ul></>;

export default DeviceList;


/*
1. This works fine:

interface Props {
  title: string;
}
const DeviceList: FC<Props> = ({title}) => <><h1>{title}</h1><ul><li>test</li></ul></>;

Now, when DeviceList is used in App.tsx, adding properties that are not in the Props type or leaving out the
title prop will give a compiler error. This is the expected behavior.

2. Add HOC without

3. When using recompose/compose to add HOCs

4. With apollo-boost/compose

 */