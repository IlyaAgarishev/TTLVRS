export interface Filter {
  name: string;
  nameEng: string;
}

export type MapCoords = {
  latitude: number;
  longitude: number;
};

interface Media {
  media_type: "video" | "image";
  link: string;
}

export interface ChilliumEvent {
  id: number;
  name: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
  };
  time_start: string;
  time_end: string;
  distance: number;
  author: {
    name: string;
  };
  media: Media[];
}
