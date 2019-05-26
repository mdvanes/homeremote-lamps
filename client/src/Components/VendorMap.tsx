import React, { FC } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const position: [number, number] = [51.505, -0.09];
const zoom = 13;

// Example: https://codepen.io/PaulLeCam/pen/gzVmGw

const VendorMap: FC = () => {
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
      </Map>
    </div>
  );
};

export default VendorMap;
