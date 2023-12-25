import React, { useRef, useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface Waypoint {
    location: {
        lat: number;
        lng: number;
    };
}

const Map = ({ locations }: { locations: Waypoint[] }) => {
    const googleMapRef = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
    const [infoWindows, setInfoWindows] = useState<google.maps.InfoWindow[]>([]);
    const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

    const mapOptions: google.maps.MapOptions = {
        disableDefaultUI: true,
        fullscreenControl: false,
        zoomControl: false,
        center: locations[0].location,
        zoom: 10,
        // mapTypeId: 'satellite',
        keyboardShortcuts: false
    };

    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_MAP_API_KEY || '',
            version: 'weekly',
        });

        const createMap = async () => {
            try {
                await loader.load();
                const google = window.google;
                const newMap = new google.maps.Map(
                    googleMapRef.current as HTMLElement,
                    mapOptions
                );
                // const newDirectionService = new google.maps.DirectionsService();
                const newDirectionRendrer = new google.maps.DirectionsRenderer();
                newDirectionRendrer.setMap(newMap);
                setMap(newMap);
                // setDirectionsService(newDirectionService);
                setDirectionsRenderer(newDirectionRendrer);
            } catch (error) {
                console.log('Error loading Google Maps:', error);
            }
        };

        if (googleMapRef.current && !map) {
            createMap();
        }

    }, [map, mapOptions]);

    useEffect(() => {
        if (directionsRenderer && locations.length > 1) {
            const waypoints = locations.slice(1).map(location => ({
                location: new window.google.maps.LatLng(location.location),
            }));

            const origin = locations[0].location;
            const destination = locations[locations.length - 1].location;

            const request: google.maps.DirectionsRequest = {
                origin,
                destination,
                waypoints,
                travelMode: google.maps.TravelMode.DRIVING,
            };
            const service = new window.google.maps.DirectionsService();
            service.route(request, (result, status) => {
                if (status === 'OK') {
                    if (directionsRenderer.getMap()) {
                        directionsRenderer.setMap(null);
                    }
                    const newDirectionRenderer = new window.google.maps.DirectionsRenderer({
                        suppressMarkers: true,
                        preserveViewport: true,
                    });
                    newDirectionRenderer.setMap(map);
                    newDirectionRenderer.setDirections(result);
                    newDirectionRenderer.setOptions({
                        polylineOptions: {
                            strokeColor: '#6c3d8e', // Red color
                            strokeWeight: 4, // Thickness of the route line
                        },
                    });
                    const bounds = new window.google.maps.LatLngBounds();
                    locations.forEach(location => {
                        bounds.extend(location.location);
                    });
                    map?.fitBounds(bounds);
                    setDirectionsRenderer(newDirectionRenderer);
                } else {
                    console.error('Directions request failed due to ' + status);
                }
            });
            // directionsService.route(request, (result, status) => {
            //     if (status === 'OK') {
            //         directionsRenderer.setDirections(result);

            //         directionsRenderer.setOptions({
            //             polylineOptions: {
            //                 strokeColor: '#6c3d8e', // Red color
            //                 strokeWeight: 4, // Thickness of the route line
            //             },
            //         });
            //         const bounds = new window.google.maps.LatLngBounds();
            //         locations.forEach(location => {
            //             bounds.extend(location.location);
            //         });
            //         map?.fitBounds(bounds);
            //     } else {
            //         console.error('Directions request failed due to ' + status);
            //     }
            // });
        }
    }, [directionsRenderer, locations, map]);

    useEffect(() => {
        if (map && locations.length > 0) {
            const google = window.google;
            const infowindows: google.maps.InfoWindow[] = [];
            const markers: google.maps.Marker[] = [];

            locations.forEach((location, index) => {
                const marker = new google.maps.Marker({
                    position: location.location,
                    map: map,
                });

                markers.push(marker);

                const infoWindowContent = `<div>
                    <h3>Place ${index + 1}</h3>
                    <p>Additional details about this location...</p>
                </div>`;

                const infoWindow = new google.maps.InfoWindow({
                    content: infoWindowContent,
                });

                infowindows.push(infoWindow);

                marker.addListener('click', () => {
                    infowindows.forEach((infoWin) => infoWin.close());
                    infoWindow.open(map, marker);
                });
            });

            setMarkers(markers);
            setInfoWindows(infowindows);
        }
    }, [map, locations]);

    useEffect(() => {
        return () => {
            if (markers.length > 0) {
                markers.forEach(marker => {
                    marker.setMap(null);
                });
            }
        };
    }, [markers]);

    return (
        <div id="map" style={{ width: '100%', height: '500px', marginBottom: '1rem' }} ref={googleMapRef}></div>
    );
};

export default Map;
