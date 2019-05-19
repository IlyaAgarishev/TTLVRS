/* eslint-disable react/style-prop-object */
import React, { useEffect, useState, useCallback } from "react";
// @ts-ignore
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";
import { EventEditor } from "../EventEditor";
import EventWindow from "../EventWindow";
import styled from "styled-components";
import logoSrc from "../img/logotype.svg";
import { QuickFilters } from "../QuickFilters";
import { api } from "../config";

export type MapCoords = {
  latitude: number;
  longitude: number;
};

export interface ChilliumEvent {
  name: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
  };
  time_start: string;
  time_end: string;
}

const kievCoords = {
  latitude: 30.526719307390927,
  longitude: 50.469711345117666
};

const Header = styled.h1`
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto 10px;
  font-family: "Arial Black", sans-serif;
  font-size: 20px;
  background: white;
  border-radius: 0 0 10px 10px;
  padding: 3px 15px;
  color: rgba(0, 0, 0, 0.7);
  border: 0;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3);
`;

const HeaderContainer = styled.header`
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
`;

export default function Index() {
  const [
    { latitude: userLatitude, longitude: userLongitude },
    setUserPosition
  ] = useState<MapCoords>(kievCoords);
  const [eventEditorOpened, setEventEditorOpened] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<MapCoords>(
    kievCoords
  );
  const [nearEvents, setNearEvents] = useState<ChilliumEvent[]>([]);
  const [openedEvent, setOpenedEvent] = useState<ChilliumEvent | null>(null);

  useEffect(() => {
    const savePosition = (position: Position) => {
      setUserPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(savePosition);
      const id = navigator.geolocation.watchPosition(savePosition);
      return () => navigator.geolocation.clearWatch(id);
    }
  }, []);

  const fetchEvents = useCallback(() => {
    fetch(
      api(
        `/api/events?latitude=${userLatitude}&longitude=${userLongitude}&radius=1000`
      )
    )
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Unable to fetch events");
        }
      })
      .then((events: ChilliumEvent[]) => setNearEvents(events))
      .catch(console.error);
  }, [userLongitude, userLatitude]);

  useEffect(fetchEvents, [fetchEvents]);

  const selectPosition = useCallback(event => {
    const [latitude, longitude] = event.get("coords");

    setEventEditorOpened(true);
    setSelectedPosition({
      latitude,
      longitude
    });
  }, []);

  return (
    <div>
      <YMaps>
        <Map
          state={{
            center: [userLatitude, userLongitude],
            zoom: 17
          }}
          width="100vw"
          height="100vh"
          onClick={selectPosition}
        >
          <ZoomControl
            options={{
              size: "small",
              zoomDuration: 200
            }}
          />
          <Placemark
            geometry={[userLatitude, userLongitude]}
            options={{
              preset: "islands#redStretchyIcon"
            }}
            properties={{
              iconContent: "Вы здесь"
            }}
          />
          {nearEvents.map(event => (
            <Placemark
              geometry={[event.location.latitude, event.location.longitude]}
              options={{ preset: "islands#blackDotIcon" }}
              onClick={() => {
                setOpenedEvent(event);
              }}
            />
          ))}
        </Map>
      </YMaps>
      <HeaderContainer>
        <Header>
          <img src={logoSrc} alt="Logotype" height={30} />
          Чиллиум
        </Header>
        <QuickFilters />
      </HeaderContainer>
      {eventEditorOpened && (
        <EventEditor
          position={selectedPosition}
          onAdd={fetchEvents}
          onClose={() => setEventEditorOpened(false)}
          setEvents={setNearEvents}
        />
      )}
      {openedEvent && (
        <EventWindow event={openedEvent} onClose={() => setOpenedEvent(null)} />
      )}
    </div>
  );
}
