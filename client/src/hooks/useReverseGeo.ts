import { useState, useEffect } from "react";
import config from "../config";
import { MapCoords } from "../types";

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

function getPlaceName(geo: ReverseGeoResponse) {
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

function buildMapboxQuery(query: string) {
  return `https://api.mapbox.com${query}?access_token=${config.mapboxToken}`;
}

export function useReverseGeo(coords: MapCoords): string {
  const [place, setPlace] = useState("");

  useEffect(() => {
    fetch(
      buildMapboxQuery(
        `/geocoding/v5/mapbox.places/${coords.longitude},${
          coords.latitude
        }.json`
      )
    )
      .then(resp => resp.json())
      .then(geo => setPlace(getPlaceName(geo)));
  }, [coords]);

  return place;
}
