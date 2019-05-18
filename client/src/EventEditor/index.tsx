import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import config from "../config";

interface EventEditorProps {
    position: [number, number],
    onClose: () => void,
}

interface ReverseGeoFeature {
    type: string,
    id: string,
    center: [number, number],
    place_name: string,
    place_type: string[],
    properties: {},
    relevance: number,
    text: string,
}

interface ReverseGeoResponse {
    features: ReverseGeoFeature[]
}

function buildMapboxQuery(query: string) {
    return `https://api.mapbox.com${query}?access_token=${config.mapboxToken}`;
}

function getPlaceName(geo: ReverseGeoResponse) {
    if (geo.features.length > 0) {
        return geo.features[0].text;
    } else {
        return 'Неизвестно где';
    }
}

export function EventEditor({ position: [ latitude, longitude ], onClose }: EventEditorProps) {
    const [place, setPlace] = useState('');

    useEffect(() => {
        fetch(buildMapboxQuery(`/geocoding/v5/mapbox.places/${latitude},${longitude}.json`))
            .then(resp => resp.json())
            .then(geo => setPlace(getPlaceName(geo)));
    }, [latitude, longitude]);

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.header}>Создать метку</h1>
            <button className={styles.close} type="button" onClick={onClose} />
            <form className={styles.form} action="">
                <span className={styles.place}>Место: {place}</span>
                <input className={styles.title} type="text" placeholder="Что происходит?" />
                <textarea className={styles.description} />
                <button className={styles.submit} type="submit">
                    Отметить
                </button>
            </form>
        </div>
    );
}
