import React from "react";
import styles from "./index.module.css";
import geoIcon from "../img/geo.svg";
import authorIcon from "../img/author.svg";
import descriptionIcon from "../img/description.svg";
import { ChilliumEvent } from "../App";
import { useReverseGeo } from "../hooks/useReverseGeo";
import styled from "styled-components";
// @ts-ignore
import Swipe from "react-easy-swipe";

interface EventWindowProps {
  event: ChilliumEvent;
  onClose: () => void;
}

const Wrapper = styled.div`
  box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  min-height: 400px;
  background: white;
  border-radius: 20px 20px 0 0;
  padding: 30px;
  color: #474747;
`;

const Header = styled.div`
  font-size: 1.5em;
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const Preview = styled.img`
  max-width: 100px;
  max-height: 100px;
  border-radius: 20px;
  margin-right: 10px;
  object-fit: cover;
`;

const Titles = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
`;

const Name = styled.h1`
  margin: 0;
  font-size: 1.2rem;
  flex: 1;
`;

const Geo = styled.span`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
`;

const DescriptionSection = styled.div<
  { icon: string } & React.HTMLProps<HTMLDivElement>
>`
  margin: 15px 0;
  width: 100%;
  font-size: 1rem;
  padding-left: 40px;
  background: url(${(props: any) => props.icon}) no-repeat top left / 20px 20px;
`;

export default function EventWindow({ event, onClose }: EventWindowProps) {
  const place = useReverseGeo(event.location);

  return (
    <Swipe onSwipeDown={onClose}>
      <Wrapper>
        <Header>
          <Preview
            src="https://r.hswstatic.com/w_907/gif/tesla-cat.jpg"
            alt="event-pic"
            className={styles.preview}
          />
          <Titles>
            <Name>{event.name}</Name>
            <Geo>
              <img
                src={geoIcon}
                alt="geo"
                className={styles.geoImg}
                role="presentation"
              />
              <span>{place}</span>
            </Geo>
          </Titles>
        </Header>
        <DescriptionSection icon={descriptionIcon}>
          {event.description}
        </DescriptionSection>
        <DescriptionSection icon={authorIcon}>Дядя Ваня</DescriptionSection>
      </Wrapper>
    </Swipe>
  );
}
