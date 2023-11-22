import { useEffect, useState } from 'react';
import classes from './trip-steps.module.scss';
import useHttp from '../../hooks/use-http';
import { City } from '@/interfaces/City';
import { useDispatch } from 'react-redux';
import { tripActions } from '@/store/Trip/Trip';
import Translate from '../helpers/Translate/Translate';

const LocationStep = () => {
    const dispatch = useDispatch();
    const { isLoading, error, sendRequest } = useHttp();
    const [citeies, setCities] = useState<City[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<City>({ id: 1, name: 'Riyadh', code: null })

    useEffect(() => {
        getLocations();
    }, []);

    const handleLocationClick = (city: City) => {
        setSelectedLocation(city);
        dispatch(tripActions.setTripData({ city_id: city.id }))
    }
    const getLocations = () => {
        sendRequest(
            {
                url: '/api/cities',
                method: 'GET'
            },
            (data: any) => {
                setCities(data);
            },
            (error: any) => {
                console.error(error);
            }
        )
    }
    return (
        <div className={classes.location}>
            <div className={classes.locationInput}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24.237" height="30.847" viewBox="0 0 24.237 30.847">
                    <path d="M24.237 12.619c0 9.815-12.118 18.228-12.118 18.228S0 22.434 0 12.619A12.376 12.376 0 0 1 12.118 0a12.376 12.376 0 0 1 12.119 12.619z" fill="#62588d" fillRule="evenodd" />
                    <ellipse cx="4.039" cy="4.206" rx="4.039" ry="4.206" transform="translate(8.079 8.413)" fill="#fff" />
                </svg>
                <p className={classes.locationText}>
                    <Translate id='tripModal.myLocation'/> <span className={classes.locationName}>{selectedLocation.name}</span>
                </p>
            </div>
            <ul className={classes.locationCities}>
                {
                    citeies?.map(city => {
                        return (
                            <li onClick={() => handleLocationClick(city)} className={classes.locationCity} key={city.id}>{city.name}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default LocationStep;