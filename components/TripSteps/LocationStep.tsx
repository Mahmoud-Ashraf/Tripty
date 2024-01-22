import { useEffect, useState } from 'react';
import classes from './trip-steps.module.scss';
import useHttp from '../../hooks/use-http';
import { City } from '@/interfaces/City';
import { useDispatch, useSelector } from 'react-redux';
import { tripActions } from '@/store/Trip/Trip';
import Translate from '../helpers/Translate/Translate';
import Loader from '../UI/Loader/Loader';
import { RootState } from '@/store';

const LocationStep = () => {
    const dispatch = useDispatch();
    const { isLoading, error, sendRequest } = useHttp();
    const [citeies, setCities] = useState<City[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<City>()
    const tripData = useSelector((state: RootState) => state.trip.tripData);

    useEffect(() => {
        getLocations();
    }, []);

    const handleLocationClick = (city: City) => {
        setCurrentCity(city);
    }
    const getLocations = () => {
        sendRequest(
            {
                url: '/api/cities',
                method: 'GET'
            },
            (data: any) => {
                setCities(data);
                if (tripData?.city_id) {
                    setCurrentCity(data.find((city: any) => city.id === tripData.city_id));
                } else {
                    setCurrentCity(data[0]);
                }
            },
            (error: any) => {
                console.error(error);
            }
        )
    }

    const setCurrentCity = (city: City) => {
        setSelectedLocation(city);
        dispatch(tripActions.setTripData({ city_id: city.id }));
    }
    return (
        <div className={classes.location}>
            {isLoading && <Loader full />}
            <div className={classes.locationInput}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24.237" height="30.847" viewBox="0 0 24.237 30.847">
                    <path d="M24.237 12.619c0 9.815-12.118 18.228-12.118 18.228S0 22.434 0 12.619A12.376 12.376 0 0 1 12.118 0a12.376 12.376 0 0 1 12.119 12.619z" fill="#6c3d8e" fillRule="evenodd" />
                    <ellipse cx="4.039" cy="4.206" rx="4.039" ry="4.206" transform="translate(8.079 8.413)" fill="#fff" />
                </svg>
                <p className={classes.locationText}>
                    <Translate id='tripModal.myLocation' /> <span className={classes.locationName}>{selectedLocation?.name}</span>
                </p>
            </div>
            <ul className={classes.locationCities}>
                {
                    citeies?.map(city => {
                        return (
                            <li onClick={() => handleLocationClick(city)} className={`${classes.locationCity} ${selectedLocation?.id === city.id ? classes.selected : ''}`} key={city.id}>{city.name}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default LocationStep;