import Mapbox, {
  Camera,
  Images,
  LocationPuck,
  MapView,
  ShapeSource,
  SymbolLayer,
} from '@rnmapbox/maps';
import { featureCollection, point } from '@turf/helpers';

import pin from '~/assets/pin.png';
import scooters from '~/data/scooters.json';

const accessToken = (process.env.EXPO_PUBLIC_MAPBOX_KEY as string) || '';
Mapbox.setAccessToken(accessToken);

export default function Map() {
  const points = scooters.map(({ lat, long }) => point([long, lat]));
  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera followUserLocation followZoomLevel={12} />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />

      <ShapeSource id="scooters" shape={featureCollection(points)}>
        <SymbolLayer
          id="scooter-icons"
          style={{
            iconImage: 'pin',
            iconSize: 0.5,
            iconAllowOverlap: true,
          }}
        />

        <Images images={{ pin }} />
      </ShapeSource>
    </MapView>
  );
}
