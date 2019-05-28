import React, { FC, Fragment, ReactNode } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import styled from "styled-components";
// @ts-ignore
import logo from "./logo.svg";
import "./App.css";
import LampList from "./LampList";
import LocalStateDirectWriteButton from "./LocalStateDirectWriteButton";
import LocalStateMutationToggle from "./LocalStateMutationToggle";
import DeviceList from "./Components/DeviceList";
import VendorMap from "./Components/VendorMap";

const GET_ANIMATION_ITEMS = gql`
  {
    animationItems @client {
      id
      isAnimating
    }
  }
`;

interface AnimationQuery {
  data: {
    animationItems: AnimationItem[];
  };
}

interface AnimationItem {
  id: number;
  isAnimating: boolean;
}

const Panel = styled.div`
  display: inline-block;
  vertical-align: top;
  min-width: 400px;
  max-width: 50vw;
`;

const App: FC = (): JSX.Element => (
  <div className="App">
    <div>
      <Panel>
        <DeviceList title="Devices" />
      </Panel>
      <Panel>
        <VendorMap />
      </Panel>
    </div>
    {/* {({ data: { animationItems}}:any) => {
        console.log(animationItems);
        return (<div></div>)
      }} */}
    <Query query={GET_ANIMATION_ITEMS}>
      {({ data: { animationItems } }: AnimationQuery): ReactNode =>
        animationItems.map(
          (item: AnimationItem): ReactNode => {
            const className = `App-logo ${item.isAnimating ? "on" : "off"}`;
            return (
              <Fragment key={`fr${item.id}`}>
                <header
                  className="App-header"
                  style={{
                    minHeight: "auto"
                  }}
                >
                  <img src={logo} className={className} alt="logo" />
                </header>
                <LocalStateMutationToggle {...item} />
              </Fragment>
            );
          }
        )
      }
    </Query>

    <hr />
    <p>These cards share the same state store</p>
    <LocalStateDirectWriteButton />
    <LocalStateDirectWriteButton />
    <hr />
    <LampList />
  </div>
);

export default App;
