import React, { useRef, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
interface Props {
    lat?: string,
    lng?: string,
    name: string
}
const PlaceMap = (props: Props) => {
    const { lat, lng, name } = props;
    const parsedLat = parseFloat(lat || '');
    const parsedLng = parseFloat(lng || '');
    const googleMapRef = useRef<HTMLDivElement | null>(null);
    const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAP_API_KEY || '',
        version: 'weekly',
    });

    useEffect(() => {
        const mapOptions = {
            center: { lat: parsedLat, lng: parsedLng },
            zoom: 16,
            disableDefaultUI: true,
            fullscreenControl: false,
            zoomControl: false,
            // mapTypeId: 'satellite',
            keyboardShortcuts: false
        };

        loader.load().then(() => {
            const google = window.google;
            const map = new google.maps.Map(googleMapRef.current as HTMLElement, mapOptions);

            // Create a marker
            const marker = new google.maps.Marker({
                position: { lat: parsedLat, lng: parsedLng },
                map: map,
                title: name, // Marker title
            });
        });
    }, [loader]);

    return <div style={{ width: '70%', height: '215px' }} ref={googleMapRef}></div>;
};

export default PlaceMap;
