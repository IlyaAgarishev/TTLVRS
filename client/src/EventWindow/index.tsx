import React from "react";
import styles from "./index.module.css";
import geoIcon from "../img/geo.svg";
import authorIcon from "../img/author.svg";
import descriptionIcon from "../img/description.svg";
import mediaIcon from "../img/photo2.svg";
import placeholder from "../img/image-placeholder.svg";
import { useReverseGeo } from "../hooks/useReverseGeo";
// @ts-ignore
import Swipe from "react-easy-swipe";
import { ChilliumEvent } from "../types";
import {
  DescriptionSection,
  Geo,
  Header,
  Name,
  Preview,
  Titles,
  Wrapper
} from "./styled";

interface EventWindowProps {
  event: ChilliumEvent;
  onClose: () => void;
}

export default function EventWindow({ event, onClose }: EventWindowProps) {
  const place = useReverseGeo(event.location);
  const distance =
    event.distance > 1000
      ? (event.distance / 1000).toFixed(1) + "км"
      : event.distance.toFixed(0) + "м";

  const previewMedia = event.media.find(media => media.media_type === "image");
  const preview = previewMedia ? previewMedia.link : placeholder;

  return (
    <Swipe onSwipeDown={onClose}>
      <Wrapper>
        <Header>
          <Preview src={preview} alt="event-pic" className={styles.preview} />
          <Titles>
            <Name>{event.name}</Name>
            <Geo>
              <img
                src={geoIcon}
                alt="geo"
                className={styles.geoImg}
                role="presentation"
              />
              <span>
                {place} ({distance})
              </span>
            </Geo>
          </Titles>
        </Header>
        <DescriptionSection icon={descriptionIcon}>
          {event.description}
        </DescriptionSection>
        {event.author && (
          <DescriptionSection icon={authorIcon}>
            {event.author.name}
          </DescriptionSection>
        )}
        {event.media.length > 0 && (
          <DescriptionSection icon={mediaIcon}>
            <img className={styles.media} src={event.media[0].link} alt="" />
          </DescriptionSection>
        )}
      </Wrapper>
    </Swipe>
  );
}
