const config = {
  endpoint: "http://localhost:8080",
  mapboxToken:
    "pk.eyJ1Ijoic2hvb2siLCJhIjoiY2p2dGJkOWNuMWNiZjRhb3oyMHB2ZmhjdyJ9.J1u2GpeX6HyMdqojkCFh2A"
};

export default config;

export function api(url: string) {
  return config.endpoint + url;
}
