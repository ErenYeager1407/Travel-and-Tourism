import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapComponent = ({ coordinates }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    if (!coordinates || coordinates.length !== 2) return;

    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: coordinates,
      zoom: 12
    });

    marker.current = new mapboxgl.Marker({ color: '#ff0000' })
      .setLngLat(coordinates)
      .addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [coordinates]);

  // Update center and marker if coordinates change
  useEffect(() => {
    if (map.current && marker.current && coordinates && coordinates.length === 2) {
      map.current.flyTo({ center: coordinates });
      marker.current.setLngLat(coordinates);
    }
  }, [coordinates]);

  return (
    <div
      ref={mapContainer}
      className="mapbox-container"
      style={{ height: '300px', width: '100%', borderRadius: '0.5rem', marginBottom: '1.5rem', zIndex: 0 }}
    />
  );
};

export default MapComponent;
