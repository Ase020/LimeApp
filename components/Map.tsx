import Mapbox, { Camera, LocationPuck, MapView } from '@rnmapbox/maps';

const accessToken = (process.env.EXPO_PUBLIC_MAPBOX_KEY as string) || '';
Mapbox.setAccessToken(accessToken);

export default function Map() {
  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera followUserLocation followZoomLevel={16} />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />
    </MapView>
  );
}
