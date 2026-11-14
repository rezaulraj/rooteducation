// The offices map (public/offices-map.svg) uses country outlines: Natural Earth 1:50m (public domain, via world-atlas),
// in a Mercator projection of lon -14..100, lat 4..64, scaled to a 1000-wide box.
export const MAP_H = 701.6;
export const project = (lon: number, lat: number) => {
  const m = (b: number) => Math.log(Math.tan(Math.PI / 4 + (b * Math.PI) / 360));
  // Rounded, so the server and the browser always produce identical numbers.
  return ([((lon - (-14)) / 114) * 1000, ((m(64) - m(lat)) / (((114) * Math.PI) / 180)) * 1000]).map((n) => Math.round(n * 10) / 10);
};
