

function invertLatLon(polylines) {
  const invertedPolylines = [];

  for (const polyline of polylines) {
    const invertedPolyline = [];
    for (const point of polyline) {
      const invertedPoint = [point[1], point[0]];
      invertedPolyline.push(invertedPoint);
    }
    invertedPolylines.push(invertedPolyline);
  }

  return invertedPolylines;
}

export default invertLatLon;
