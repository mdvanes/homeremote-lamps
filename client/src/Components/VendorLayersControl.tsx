import React, { FC } from "react";
import {
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  Circle,
  FeatureGroup,
  Rectangle
} from "react-leaflet";
const { BaseLayer, Overlay } = LayersControl;

const position: [number, number] = [52.154, 5.295];
const rectangle: [number, number][] = [
  [52.05668, 5.11049],
  [51.70266, 5.28726]
];

// NL 8/52.172/5.738
// Nieuwegein 52.05668/5.11049 17
// Den Bosch 51.70266/5.28726 17

// Example: https://codepen.io/PaulLeCam/pen/gzVmGw

const VendorLayersControl: FC = () => {
  return (
    <LayersControl position="topright">
      <BaseLayer checked name="OpenStreetMap.Mapnik">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </BaseLayer>
      <BaseLayer name="OpenStreetMap.BlackAndWhite">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
        />
      </BaseLayer>
      <Overlay name="Marker with popup">
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Overlay>
      <Overlay checked name="Layer group with circles">
        <LayerGroup>
          <Circle center={position} fillColor="blue" radius={200} />
          <Circle
            center={position}
            fillColor="red"
            radius={100}
            stroke={false}
          />
          <LayerGroup>
            <Circle
              center={[51.51, -0.08]}
              color="green"
              fillColor="green"
              radius={100}
            />
          </LayerGroup>
        </LayerGroup>
      </Overlay>
      <Overlay name="Feature group">
        <FeatureGroup color="purple">
          <Popup>Popup in FeatureGroup</Popup>
          <Circle center={[51.51, -0.06]} radius={200} />
          <Rectangle bounds={rectangle} />
        </FeatureGroup>
      </Overlay>
    </LayersControl>
  );
};

export default VendorLayersControl;
