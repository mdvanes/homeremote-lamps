import React, {FC} from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
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

interface ILampBorderProps {
  allOn: boolean;
  onClick: any;
}

const LampBorder:FC<ILampBorderProps> = styled.div`
  border: 10px solid ${({allOn}:ILampBorderProps) => allOn ? 'darkgreen' : 'transparent'}
  border-radius: 20px;
`;

interface Props {
  loading: any;
  error: any;
  data: any;
  subscribeToMore: any;
  client: any;
}

/* Using the open Currency API to emulate a back-end for
 * lamps. Currency name is used as the toggle name and the rate is used to determine the initial value
 * */
const LampList:FC = () => (
  <Query query={QUERY}>
    {({ loading, error, data, subscribeToMore, client }: any) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      // Besides `client.watchQuery`, `subscribeToMoreRef` may be useful
      // This conflicts with the reactiveness of React, but it does log the expected value
      // const observableQuery = client.watchQuery({query: QUERY, pollInterval: 1000});
      // observableQuery.subscribe({
      //   next: (x:any) => {
      //     // return {data}
      //     console.log(x, x.data.lamps.map((l:any) => l.isOn));
      //   }
      // });

      const allOn = data.lamps.every((lamp: ILamp) => lamp.isOn);

      return (
        <LampBorder allOn={allOn} onClick={()=>{}}>
          {data.lamps.map((lamp: ILamp) => (
            <Lamp key={lamp.name} {...lamp} />
          ))}
        </LampBorder>);
    }}
  </Query>
);

export default LampList;