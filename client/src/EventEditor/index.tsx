import React, { SyntheticEvent, useEffect, useState } from "react";
// @ts-ignore
import Swipe from "react-easy-swipe";
import styles from "./index.module.css";
import { ChilliumEvent, MapCoords } from "../App";
import { useReverseGeo } from "../hooks/useReverseGeo";
import { api } from "../config";

interface EventEditorProps {
  position: MapCoords;
  onClose: () => void;
  onAdd: () => void;
  setEvents: any;
}

export function EventEditor({ position, onClose, onAdd }: EventEditorProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const place = useReverseGeo(position);

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data: ChilliumEvent = {
      name,
      description,
      location: position,
      time_start: new Date().toISOString(),
      time_end: new Date().toISOString()
    };

    fetch(api("/api/events"), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    }).then(
      () => {
        onAdd();
        onClose();
      },
      () => setError("Error")
    );

    onClose();
  };

  return (
    <Swipe onSwipeDown={onClose}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.popupName}>Создать метку</h1>
          <button className={styles.submit} type="submit">
            Создать
          </button>
        </div>
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
              autoFocus
              value={name}
              type="text"
              placeholder="Что происходит?"
              onChange={e => setName(e.target.value)}
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
        </form>
      </div>
    </Swipe>
  );
}
