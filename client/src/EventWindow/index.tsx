/* eslint-disable react/style-prop-object */
import React, { useEffect, useState, useCallback } from "react";
import styles from "./index.module.css";
import Geo from "../img/geo.svg";

export default function EventWindow() {
  return (
    <div className={styles.eventWindow}>
      <img
        src="https://r.hswstatic.com/w_907/gif/tesla-cat.jpg"
        alt="event-pic"
        className={styles.img}
      />
      <div className={styles.title}>Title</div>
      <div className={styles.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae sit odit
        in quisquam quo natus, praesentium incidunt officiis necessitatibus
        exercitationem ut enim nostrum sapiente magni, error illum, corrupti
        iusto eos!
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.geo}>
          <img src={Geo} alt="geo" className={styles.geoImg} />
          <div>2nd Street Dorm</div>
        </div>
        <div className={styles.eventNow}>
          <div className={styles.circle} /> Сейчас
        </div>
      </div>
    </div>
  );
}
