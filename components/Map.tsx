import Mapbox, {
  Camera,
  CircleLayer,
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

      <ShapeSource
        id="scooters"
        shape={featureCollection(points)}
        cluster
        onPress={(e) => console.log(JSON.stringify(e, null, 2))}>
        <SymbolLayer
          id="clusters-count"
          style={{
            textField: ['get', 'point_count'],
            textSize: 16,
            textColor: '#ffffff',
            textPitchAlignment: 'map',
          }}
        />

        <CircleLayer
          id="clusters"
          belowLayerID="clusters-count"
          filter={['has', 'point_count']}
          style={{
            circlePitchAlignment: 'map',
            circleColor: '#42E100',
            circleRadius: 20,
            circleOpacity: 0.6,
            circleStrokeWidth: 2,
            circleStrokeColor: 'white',
          }}
        />

        <SymbolLayer
          id="scooter-icons"
          filter={['!', ['has', 'point_count']]}
          style={{
            iconImage: 'pin',
            iconSize: 0.5,
            iconAllowOverlap: true,
            iconAnchor: 'bottom',
          }}
        />

        <Images images={{ pin }} />
      </ShapeSource>
    </MapView>
  );
}
