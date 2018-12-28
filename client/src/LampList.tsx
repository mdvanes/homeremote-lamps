import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Lamp from './Lamp';

interface ILamp {
  name: string;
  size: number;
}

/* Using the open Currency API to emulate a back-end for
 * lamps. Currency name is used as the toggle name and the rate is used to determine the initial value
 * */
const LampList = () => (
  <Query
    query={gql`
      {
        # rates(currency: "USD") {
        #  currency
        #  rate
        #}
        lamps(room:"Living") {
          name
          size
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.lamps.map(({ name, size }: ILamp) => {
        const isOn: boolean = size > 8;
        return (<Lamp key={name} name={name} isOn={isOn} />
      )});
    }}
  </Query>
);

export default LampList;