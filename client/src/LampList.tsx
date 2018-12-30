import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Lamp, { ILamp } from './Lamp';

const QUERY = gql`
  {
    # rates(currency: "USD") {
    #  currency
    #  rate
    #}
    lamps(room:"Living") {
      id
      name
      size
      isOn @client
    }
  }
`;

/* Using the open Currency API to emulate a back-end for
 * lamps. Currency name is used as the toggle name and the rate is used to determine the initial value
 * */
const LampList = () => (
  <Query query={QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.lamps.map((lamp: ILamp) => (
          <Lamp key={lamp.name} {...lamp} />
        ));
    }}
  </Query>
);

export default LampList;