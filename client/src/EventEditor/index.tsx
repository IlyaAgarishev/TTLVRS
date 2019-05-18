import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
// @ts-ignore
import Swipe from "react-easy-swipe";
import styles from "./index.module.css";
import config from "../config";
import { ChilliumEvent } from "../App";

interface EventEditorProps {
  position: [number, number];
  onClose: () => void;
  setEvents: any;
}

interface ReverseGeoFeature {
  type: string;
  id: string;
  center: [number, number];
  place_name: string;
  place_type: string[];
  properties: {
    [name: string]: string;
  };
  relevance: number;
  text: string;
}

interface ReverseGeoResponse {
  features: ReverseGeoFeature[];
}

function buildMapboxQuery(query: string) {
  return `https://api.mapbox.com${query}?access_token=${config.mapboxToken}`;
}

function getPlaceName(geo: ReverseGeoResponse) {
  console.log(geo);
  if (geo.features.length > 0) {
    if (geo.features[0].properties["address"]) {
      // @ts-ignore
      return geo.features[0].properties.address;
    } else {
      return geo.features[0].text;
    }
  } else {
    return "Неизвестно где";
  }
}

export function EventEditor({
  position: [longitude, latitude],
  onClose,
  setEvents
}: EventEditorProps) {
  const [place, setPlace] = useState("");
  const [shiftDown, setShiftDown] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      buildMapboxQuery(
        `/geocoding/v5/mapbox.places/${longitude},${latitude}.json`
      )
    )
      .then(resp => resp.json())
      .then(geo => setPlace(getPlaceName(geo)));
  }, [latitude, longitude]);

  const submit = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    const data: ChilliumEvent = {
      name,
      description,
      location: {
        latitude,
        longitude
      }
    };

    // fetch('/api/events', {
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     method: 'POST',
    //     body: JSON.stringify(data),
    // }).then(onClose, () => setError('Error'));

    setEvents((events: any) => [...events, data]);
    onClose();
  }, []) as any;

  return (
    <Swipe onSwipeDown={onClose}>
      <div
        className={styles.wrapper}
        style={{ transform: `translateY(${shiftDown})` }}
      >
        <h1 className={styles.header}>Создать метку</h1>
        {error && <p>{error}</p>}
        {/*<button className={styles.close} type="button" onClick={onClose} />*/}
        <form className={styles.form} onSubmit={submit}>
          <p className={styles.place}>
            <span className={styles.label}>Место:</span>
            <span className={styles.placeValue}>{place}</span>
          </p>
          <label className={styles.label}>
            Название события
            <input
              className={styles.input}
              name="name"
              value={name}
              type="text"
              placeholder="Что происходит?"
              onChange={e => setName(e.target.value)}
              autoFocus
            />
          </label>
          <label className={styles.label}>
            Описание
            <textarea
              className={styles.input}
              name="description"
              value={description}
              rows={8}
              placeholder="Опишите кратко почему это может быть интересно"
              onChange={e => setDescription(e.target.value)}
            />
          </label>
          <button className={styles.submit} type="submit">
            Отметить
          </button>
        </form>
      </div>
    </Swipe>
  );
}
