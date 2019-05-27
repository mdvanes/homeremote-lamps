import React, { FC } from "react";
// import {ApolloConsumer, Query} from 'react-apollo';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import styled from "styled-components";

const GET_LOGGER = gql`
  {
    logger @client
  }
`;

const Card = styled.div`
  border: 1px solid #444;
  border-radius: 4px;
  box-shadow: 1px 1px 1px black;
  display: inline-block;
  margin: 1rem;
  max-width: 300px;
  padding: 0.5rem;
`;

const LogArea = styled.div`
  background-color: #ccc;
  margin-top: 0.5rem;
  padding: 0.3rem;
`;

// Example for LocalState Direct Write

/*
// This is enough if only needed to write, without subscribing: <ApolloConsumer>
    {
      client => (<button onClick={() => client.writeData({ data: { logger: 'foo!' } })}>
        Write to log
      </button>)
    }
  </ApolloConsumer>
*/
const LocalStateDirectWriteButton: FC = () => (
  <Query query={GET_LOGGER}>
    {({ data, client }: any) => (
      <Card>
        <button
          onClick={() => client.writeData({ data: { logger: "You clicked!" } })}
        >
          Write to log
        </button>
        <LogArea>{data.logger}</LogArea>
      </Card>
    )}
  </Query>
);

export default LocalStateDirectWriteButton;
