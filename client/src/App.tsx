import React, { FC, Fragment } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
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

const App: FC = () => (
  <div className="App">
    <DeviceList title="Devices" />
    <VendorMap />
    {/* {({ data: { animationItems}}:any) => {
        console.log(animationItems);
        return (<div></div>)
      }} */}
    <Query query={GET_ANIMATION_ITEMS}>
      {({ data: { animationItems } }: any) =>
        animationItems.map((item: any) => {
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
        })
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
