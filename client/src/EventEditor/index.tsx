import React, {
  HTMLProps,
  SyntheticEvent,
  useEffect,
  useRef,
  useState
} from "react";
// @ts-ignore
import Swipe from "react-easy-swipe";
import styles from "./index.module.css";
import { useReverseGeo } from "../hooks/useReverseGeo";
import { api } from "../config";
import styled from "styled-components";
import recordIcon from "../img/record.svg";
import photoIcon from "../img/photo.svg";
import { ChilliumEvent, MapCoords } from "../types";

const IconButton = styled.button<
  { src: string } & HTMLProps<HTMLButtonElement>
>`
  background: url(${({ src }) => src}) no-repeat center center / 50% 50%,
    rgba(255, 255, 255, 0.5);
  width: 40px;
  height: 40px;
  margin: 5px;
  border-radius: 50%;
  border: 2px solid white;
`;

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
  const videoRef = useRef(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const place = useReverseGeo(position);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function(stream) {
          if (videoRef && videoRef.current) {
            // @ts-ignore
            videoRef.current.srcObject = stream;
            // @ts-ignore
            videoRef.current.play();
          }
        });
    }
  }, []);

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data: Partial<ChilliumEvent> = {
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
  };

  return (
    <Swipe onSwipeDown={onClose}>
      <form className={styles.wrapper} onSubmit={submit}>
        <div className={styles.header}>
          <h1 className={styles.popupName}>Создать метку</h1>
          <button className={styles.submit} type="submit">
            Создать
          </button>
        </div>
        {error && <p>{error}</p>}
        <div className={styles.form}>
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
          <div className={styles.photoContainer}>
            <video
              className={styles.camera}
              ref={videoRef}
              width="200"
              height="200"
              autoPlay
            />
            <div className={styles.photoCover}>
              <IconButton type="button" src={photoIcon} />
              <IconButton type="button" src={recordIcon} />
            </div>
          </div>
        </div>
      </form>
    </Swipe>
  );
}
