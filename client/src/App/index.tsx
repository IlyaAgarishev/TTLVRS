/* eslint-disable react/style-prop-object */
import React, { useCallback, useEffect, useState } from "react";
// @ts-ignore
import { Circle, Map, Placemark, YMaps, ZoomControl } from "react-yandex-maps";
import { EventEditor } from "../EventEditor";
import EventWindow from "../EventWindow";
import logoSrc from "../img/logotype.svg";
import { QuickFilters } from "../QuickFilters";
import { api } from "../config";
import { buildQuery } from "../utils";
import { Header, HeaderContainer } from "./styled";
import { ChilliumEvent, Filter, MapCoords } from "../types";

const SEARCH_RADIUS_IN_METERS = 2000;

const kievCoords = {
  latitude: 50.449009,
  longitude: 30.522487
};

export default function Index() {
  const [
    { latitude: userLatitude, longitude: userLongitude },
    setUserPosition
  ] = useState<MapCoords>(kievCoords);
  const [
    { latitude: screenLatitude, longitude: screenLongitude },
    setScreenPosition
  ] = useState<MapCoords>(kievCoords);
  const [eventEditorOpened, setEventEditorOpened] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<MapCoords | null>(
    null
  );
  const [nearEvents, setNearEvents] = useState<ChilliumEvent[]>([]);
  const [openedEvent, setOpenedEvent] = useState<ChilliumEvent | null>(null);
  const [selectedTags, setSelectedTags] = useState<Filter[]>([]);
  const [zoom, setZoom] = useState<number>(17);

  useEffect(() => {
    const savePosition = (position: Position) => {
      const coords = position.coords;
      setUserPosition(coords);
    };

    const saveAndMove = (position: Position) => {
      const coords = position.coords;
      setUserPosition(coords);
      setScreenPosition(coords);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(saveAndMove);
      const id = navigator.geolocation.watchPosition(savePosition);
      return () => navigator.geolocation.clearWatch(id);
    }
  }, []);

  const fetchEvents = useCallback(() => {
    const query = buildQuery({
      latitude: screenLatitude,
      longitude: screenLongitude,
      user_lat: userLatitude,
      user_long: userLongitude,
      radius: SEARCH_RADIUS_IN_METERS,
      categories: selectedTags.map(tag => tag.nameEng).join(",")
    });

    fetch(api(`/api/events${query}`))
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Unable to fetch events");
        }
      })
      .then((events: ChilliumEvent[]) => setNearEvents(events))
      .catch(console.error);
  }, [
    screenLongitude,
    screenLatitude,
    selectedTags,
    userLongitude,
    userLatitude
  ]);

  useEffect(fetchEvents, [fetchEvents]);

  const selectPosition = useCallback(event => {
    const [latitude, longitude] = event.get("coords");
    setSelectedPosition({
      latitude,
      longitude
    });
  }, []);

  const handleBoundsChange = useCallback((event: any) => {
    const [latitude, longitude] = event.get("newCenter");
    setZoom(event.get("newZoom"));
    setScreenPosition({ longitude, latitude });
  }, []);

  const onAdd = () => {
    setEventEditorOpened(false);
    setSelectedPosition(null);
  };

  return (
    <div>
      <YMaps>
        <Map
          state={{
            center: [screenLatitude, screenLongitude],
            zoom
          }}
          width="100vw"
          height="100vh"
          onClick={selectPosition}
          onBoundsChange={handleBoundsChange}
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
          {selectedPosition && (
            <Placemark
              geometry={[selectedPosition.latitude, selectedPosition.longitude]}
              properties={{ iconContent: "Добавить событие" }}
              options={{ preset: "islands#nightStretchyIcon" }}
              onClick={() => setEventEditorOpened(true)}
            />
          )}
          {nearEvents.map(event => (
            <Placemark
              key={event.id}
              geometry={[event.location.latitude, event.location.longitude]}
              options={{ preset: "islands#blackDotIcon" }}
              onClick={() => {
                setOpenedEvent(event);
              }}
            />
          ))}
          {zoom < 13 && (
            <Circle
              geometry={[
                [screenLatitude, screenLongitude],
                SEARCH_RADIUS_IN_METERS
              ]}
              options={{
                fillColor: "#FFFFFF",
                strokeColor: "#7B99E1",
                fillOpacity: 0.3,
                strokeOpacity: 0.5,
                strokeWidth: 3
              }}
            />
          )}
        </Map>
      </YMaps>
      <HeaderContainer>
        <Header>
          <img src={logoSrc} alt="Logotype" height={30} />
          Чиллиум
        </Header>
        <QuickFilters
          selectedTags={selectedTags}
          changeSelectedTags={setSelectedTags}
        />
      </HeaderContainer>
      {eventEditorOpened && (
        <EventEditor
          position={selectedPosition || { longitude: 0, latitude: 0 }}
          onAdd={onAdd}
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
