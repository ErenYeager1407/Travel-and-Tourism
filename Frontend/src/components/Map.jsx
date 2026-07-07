import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapComponent = ({ coordinates, locationName }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const userMarker = useRef(null);
  const popupRef = useRef(null);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [hasRoute, setHasRoute] = useState(false);

  useEffect(() => {
    if (!coordinates || coordinates.length !== 2) return;

    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: coordinates,
      zoom: 12
    });

    const popupHtml = `<div style="color: black; font-weight: 600; padding: 2px;">${locationName || 'Destination'}</div>`;
    popupRef.current = new mapboxgl.Popup({ offset: 25, closeButton: false, closeOnClick: true })
      .setHTML(popupHtml);

    marker.current = new mapboxgl.Marker({ color: '#ff0000' })
      .setLngLat(coordinates)
      .setPopup(popupRef.current)
      .addTo(map.current);

    const markerElement = marker.current.getElement();
    markerElement.style.cursor = 'pointer';

    markerElement.addEventListener('mouseenter', () => {
      if (!popupRef.current.isOpen()) {
        marker.current.togglePopup();
      }
    });

    markerElement.addEventListener('mouseleave', () => {
      if (popupRef.current.isOpen()) {
        marker.current.togglePopup();
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [coordinates, locationName]);

  // Update center and marker if coordinates change
  useEffect(() => {
    if (map.current && marker.current && coordinates && coordinates.length === 2) {
      map.current.flyTo({ center: coordinates });
      marker.current.setLngLat(coordinates);
      if (popupRef.current) {
        popupRef.current.setHTML(`<div style="color: black; font-weight: 600; padding: 2px;">${locationName || 'Destination'}</div>`);
      }
      
      // Clean up previous route if coordinates change
      if (map.current.getSource('route')) {
        map.current.removeLayer('route');
        map.current.removeSource('route');
        setHasRoute(false);
      }
      if (userMarker.current) {
        userMarker.current.remove();
        userMarker.current = null;
      }
    }
  }, [coordinates, locationName]);

  const handleShowRoute = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoadingRoute(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userLng = position.coords.longitude;
        const userLat = position.coords.latitude;
        const userCoords = [userLng, userLat];

        try {
          if (!map.current) return;

          // 1. Add/Update User Marker
          if (userMarker.current) {
            userMarker.current.setLngLat(userCoords);
          } else {
            // Create user marker as a custom blue dot element
            const el = document.createElement('div');
            el.className = 'user-marker-pulse';
            el.style.width = '18px';
            el.style.height = '18px';
            el.style.borderRadius = '50%';
            el.style.backgroundColor = '#0284c7';
            el.style.border = '3px solid #fff';
            el.style.boxShadow = '0 0 10px rgba(2, 132, 199, 0.6)';

            userMarker.current = new mapboxgl.Marker(el)
              .setLngLat(userCoords)
              .setPopup(new mapboxgl.Popup({ offset: 15 }).setHTML('<div style="color: black; font-weight: 600;">Your Location</div>'))
              .addTo(map.current);
          }

          // 2. Fetch directions from Mapbox Directions API
          const response = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${userLng},${userLat};${coordinates[0]},${coordinates[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch route");
          }

          const data = await response.json();
          if (!data.routes || data.routes.length === 0) {
            throw new Error("No route found");
          }

          const routeGeometry = data.routes[0].geometry;

          // 3. Draw Route Line on Map
          const mapInstance = map.current;
          if (mapInstance.getSource('route')) {
            mapInstance.getSource('route').setData({
              type: 'Feature',
              properties: {},
              geometry: routeGeometry
            });
          } else {
            mapInstance.addSource('route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: routeGeometry
              }
            });

            mapInstance.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#06b6d4', // Cyan theme color
                'line-width': 5,
                'line-opacity': 0.85
              }
            });
          }

          // 4. Adjust viewport to fit route bounds
          const bounds = new mapboxgl.LngLatBounds()
            .extend(userCoords)
            .extend(coordinates);

          mapInstance.fitBounds(bounds, {
            padding: { top: 60, bottom: 60, left: 60, right: 60 },
            maxZoom: 14,
            duration: 1500
          });

          setHasRoute(true);
        } catch (error) {
          console.error("Routing error:", error);
          alert("Could not load route: " + error.message);
        } finally {
          setLoadingRoute(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Failed to get your location: " + error.message);
        setLoadingRoute(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleOpenGoogleMaps = () => {
    if (!coordinates || coordinates.length !== 2) return;
    // Google Maps directions url expects latitude,longitude
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates[1]},${coordinates[0]}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full mb-6">
      {/* Map Container */}
      <div
        ref={mapContainer}
        className="mapbox-container shadow-inner border border-white/5"
        style={{ height: '320px', width: '100%', borderRadius: '1rem', zIndex: 0 }}
      />
      
      {/* Controls Overlay */}
      <div className="absolute top-3 left-3 z-10 flex gap-2 flex-wrap">
        <button
          onClick={handleShowRoute}
          disabled={loadingRoute}
          className="bg-black/80 hover:bg-black text-white text-xs font-semibold px-3.5 py-2 rounded-full border border-white/10 backdrop-blur-md transition shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <span>📍</span>
          <span>{loadingRoute ? 'Locating...' : hasRoute ? 'Update Route' : 'Show Route'}</span>
        </button>
        <button
          onClick={handleOpenGoogleMaps}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold px-3.5 py-2 rounded-full border border-white/10 transition shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
        >
          <span>🗺️</span>
          <span>Open in Google Maps</span>
        </button>
      </div>
    </div>
  );
};

export default MapComponent;
