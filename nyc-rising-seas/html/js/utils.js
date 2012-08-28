
function getRadDeg(dist,actual) {
  var deg = 180;
  var brng = deg * Math.PI / 180;
  dist = dist/6371000;
  var lat1 = actual.lat * Math.PI / 180;
  var lon1 = actual.lng * Math.PI / 180;
  var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) +
                      Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));
  var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
                              Math.cos(lat1),
                              Math.cos(dist) - Math.sin(lat1) *
                              Math.sin(lat2));
  if (isNaN(lat2) || isNaN(lon2)) return null;
  return actual.lat - (lat2 * 180 / Math.PI) ;
}