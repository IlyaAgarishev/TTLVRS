/* eslint-disable react/style-prop-object */
import React, { useEffect, useState, useCallback } from "react";
import ReactMapboxGl, { Layer, Feature, ZoomControl } from "react-mapbox-gl";
import { MapMouseEvent } from "mapbox-gl";
import styles from "./index.module.css";
import config from "../config";
import { EventEditor } from "../EventEditor";
import EvetnWindow from "../EventWindow";
import EventWindow from "../EventWindow";

type MapCoords = [number, number];

const Map = ReactMapboxGl({
  accessToken: config.mapboxToken
});

export default function Index() {
  const [userPosition, setUserPosition] = useState<MapCoords>([0, 0]);
  const [eventEditorOpened, setEventEditorOpened] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<MapCoords>([0, 0]);

  useEffect(() => {
    const savePosition = (position: Position) => {
      setUserPosition([position.coords.longitude, position.coords.latitude]);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(savePosition);
      const id = navigator.geolocation.watchPosition(savePosition);
      return () => navigator.geolocation.clearWatch(id);
    }
  }, []);

  const selectPosition = useCallback((map, event) => {
    console.log(event);
    const mapEvent = event as MapMouseEvent;

    setEventEditorOpened(true);
    setSelectedPosition([mapEvent.lngLat.lng, mapEvent.lngLat.lat]);
  }, []);

  return (
    <div>
      <EventWindow />
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        center={userPosition}
        zoom={[15]}
        onClick={selectPosition}
        movingMethod="jumpTo"
      >
        <ZoomControl />
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={userPosition} />
        </Layer>
      </Map>
      {eventEditorOpened && (
        <EventEditor
          position={selectedPosition}
          onClose={() => setEventEditorOpened(false)}
        />
      )}
    </div>
  );
}
