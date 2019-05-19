const config = {
  endpoint: "http://10.34.34.56:8080",
  mapboxToken:
    "pk.eyJ1Ijoic2hvb2siLCJhIjoiY2p2dGJkOWNuMWNiZjRhb3oyMHB2ZmhjdyJ9.J1u2GpeX6HyMdqojkCFh2A",
  yandexToken: "58969dfd-fa1b-4983-8b66-bb6c4d96ae6f"
};

export default config;

export function api(url: string) {
  return config.endpoint + url;
}
