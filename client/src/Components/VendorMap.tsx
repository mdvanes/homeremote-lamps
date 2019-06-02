import React, { FC } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { withQuery } from "react-apollo";
import { gql } from "apollo-boost";
import VendorLayersControl from "./VendorLayersControl";
import { Vendor } from "../Containers/withShowVendorMutation";

const position: [number, number] = [52.08927, 5.11];
const zoom = 8;

// NL 8/52.172/5.738
// Nieuwegein 52.05668/5.11049 17
// Den Bosch 51.70266/5.28726 17

// Example: https://codepen.io/PaulLeCam/pen/gzVmGw

interface Props {
  showVendorQuery: {
    showVendor: Vendor;
  };
}

const VendorMap: FC<Props> = ({
  showVendorQuery: { showVendor }
}): JSX.Element => {
  console.log("showVendor=", showVendor);
  return (
    <div style={{ height: "400px", width: "400px", overflow: "hidden" }}>
      <Map center={position} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <VendorLayersControl />
      </Map>
    </div>
  );
};

// TODO fix ts-ignore
export default withQuery(
  gql`
    query showVendorQuery {
      showVendor @client
    }
  `,
  {
    name: "showVendorQuery"
  }
)(
  // @ts-ignore
  VendorMap
);
