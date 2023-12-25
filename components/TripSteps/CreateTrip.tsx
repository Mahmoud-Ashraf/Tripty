import classes from './create-trip.module.scss';
import { useEffect, useState } from 'react';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { tripActions } from '@/store/Trip/Trip';
import { useRouter } from 'next/router';
import PlaceHeader from '@/components/UI/PlaceHeader/PlaceHeader';
import Timeline from '@/components/UI/Timeline/Timeline';
import { Trip } from '@/interfaces/trip';
import TimelineCard from '@/components/UI/TimelineCard/TimelineCard';
import Slider from 'react-slick';
import ReplaceCard from '@/components/ReplaceCard/ReplaceCard';
import { Place } from '@/interfaces/place';
import Head from 'next/head';
import Map from '@/components/Map/Map';
import useHTTP from '@/hooks/use-http';
import Translate from '@/components/helpers/Translate/Translate';

function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <i onClick={onClick} className="fa-solid fa-play custom-next"></i>
    );
}

function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <i onClick={onClick} className="fa-solid fa-play custom-prev"></i>
    );
}
const CreateTrip = () => {
    const { isLoading, error, sendRequest } = useHTTP();
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    const dispatch = useDispatch();
    const router = useRouter();
    // const tripData = useSelector((state: RootState) => state.trip.tripData);
    const [editMode, setEditMode] = useState(false);
    const [editDate, setEditDate] = useState('');
    const currentTrip = useSelector((state: RootState) => state.trip.currentTrip);
    const [data, setData] = useState<Trip>();
    const [viewType, setViewType] = useState<'map' | 'places' | 'replace'>('places');
    useEffect(() => {
        if (currentTrip) {
            setData(currentTrip);
        } else {
            router.push('/home');
        }
        // dispatch(tripActions.closeShowTripModal());
    }, [currentTrip]);

    // useEffect(() => {
    //     return () => {
    //         dispatch(tripActions.clearCurrentTrip());
    //     }
    // }, [])

    const handleReplaceClick = (date: string) => {
        setEditMode(true);
        setEditDate(date);
    }

    const handleSelectPlace = (place: Place) => {
        const timePlacesTemp = data?.places[editDate];
        const sortedTimePlacesTemp = [place, ...timePlacesTemp.filter((currentPlace: Place) => currentPlace.id !== place.id)];
        const tempCurrentTrip = { ...currentTrip, places: { ...currentTrip?.places, [editDate]: sortedTimePlacesTemp } }
        dispatch(tripActions.setCurrentTrip(tempCurrentTrip));
        setEditMode(false);
        setEditDate('');
    }

    const saveTrip = () => {
        let body: { places: { id: number, from: string, to: string }[] } = { places: [] };
        Object.keys(currentTrip?.places)?.map(key => { body.places.push({ id: currentTrip?.places[key][0].id, from: key.split('-')[0], to: key.split('-')[1] }) });
        if (currentTrip) {
            sendRequest(
                {
                    url: `/api/trip/${currentTrip.id}/update`,
                    method: 'POST',
                    body: body
                },
                (data: any) => {
                    dispatch(tripActions.closeShowTripModal());
                    router.push('/home')
                },
                (err: any) => console.error(err)
            )
        }
    }

    return (
        <>
            {/* <Head>
                <title>Tripty - Create your trip</title>
            </Head> */}
            {/* <PlaceHeader>
                <h2><Translate id='headings.your' /></h2>
                <h2><Translate id='headings.trip' /></h2>
            </PlaceHeader> */}
            <div className={classes.container}>
                <div className={classes.header}>
                    <div className={classes.city}>
                        Riyadh
                    </div>
                    <div className={classes.group}>
                        <p>1 day</p>
                        <p>5 Family, 2023</p>
                    </div>
                    <div className={classes.switch}>
                        {
                            viewType === 'map' && !editMode &&
                            <i className="fa-solid fa-bars fs-1" onClick={() => setViewType('places')}></i>
                        }
                        {
                            viewType === 'places' && !editMode &&
                            <svg data-name="Group 252" xmlns="http://www.w3.org/2000/svg" width="64.924" height="58.404" viewBox="0 0 64.924 58.404" onClick={() => setViewType('map')}>
                                <defs>
                                    <clipPath id="l087ls5f0a">
                                        <path data-name="Rectangle 292" fill="#6c3d8e" d="M0 0h64.924v58.404H0z" />
                                    </clipPath>
                                </defs>
                                <g data-name="Group 251" clipPath="url(#l087ls5f0a)">
                                    <path data-name="Path 316" d="M26.106 107.623c.461.785.9 1.528 1.328 2.281a.333.333 0 0 1-.058.3 14.355 14.355 0 0 1-11.132 5.075c-.8 0-1.61-.1-2.415-.132a11.574 11.574 0 0 0-8.311 2.886c-.7.6-1.394 1.22-2.066 1.81l19.122 19.117c.853-.739 1.721-1.539 2.639-2.276a14.1 14.1 0 0 1 10.217-3.179 14.251 14.251 0 0 0 5.47-.4 11.411 11.411 0 0 0 5.123-3.244A14.37 14.37 0 0 1 54.9 125.1c.973-.138 1.968-.131 2.953-.176.788-.037 1.577-.052 2.44-.08-.129-.141-.2-.229-.283-.31q-8.2-8.2-16.4-16.394a.41.41 0 0 1-.091-.6c.418-.7.8-1.428 1.2-2.17.106.1.2.187.294.279q9.694 9.693 19.39 19.383a1.4 1.4 0 0 1-1.008 2.488c-2.431.061-4.865.084-7.292.227a11.185 11.185 0 0 0-7.811 3.733 14.578 14.578 0 0 1-8.919 4.756 20.553 20.553 0 0 1-4.253 0A11.488 11.488 0 0 0 26.733 139c-1.116.935-2.194 1.916-3.3 2.87a1.369 1.369 0 0 1-2.028-.076Q10.949 131.332.49 120.872a1.369 1.369 0 0 1 .059-2.146c1.286-1.126 2.535-2.3 3.884-3.347a14.113 14.113 0 0 1 9.646-2.981 25.236 25.236 0 0 0 3.745.021 11.11 11.11 0 0 0 7.16-3.671c.352-.377.728-.731 1.122-1.124" transform="translate(0 -83.875)" fill="#6c3d8e" />
                                    <path data-name="Path 317" d="M126.081 0a11.447 11.447 0 0 1 11.291 9.776 11.4 11.4 0 0 1-.755 5.623 48.163 48.163 0 0 1-4.025 8.179c-1.714 2.842-3.521 5.629-5.311 8.425a1.376 1.376 0 0 1-2.45 0 110.11 110.11 0 0 1-7.8-13.064 25.207 25.207 0 0 1-2.1-5.441 10.545 10.545 0 0 1 2.091-9.039A11.25 11.25 0 0 1 126.081 0m-.025 28.889c.094-.133.154-.208.2-.289 1.373-2.22 2.78-4.42 4.106-6.667a46.482 46.482 0 0 0 3.646-7.442 8.542 8.542 0 0 0 .62-4.447 8.753 8.753 0 0 0-6.8-7.122 8.61 8.61 0 0 0-8.964 3.678 7.647 7.647 0 0 0-1.021 7.081c.47 1.31.987 2.611 1.585 3.867a92.654 92.654 0 0 0 6.143 10.611c.15.23.3.457.485.731" transform="translate(-91.263)" fill="#6c3d8e" />
                                    <path data-name="Path 318" d="M152.55 27.435a6.21 6.21 0 1 1-6.2-6.187 6.2 6.2 0 0 1 6.2 6.187m-2.745.044a3.465 3.465 0 1 0-6.929-.032 3.465 3.465 0 0 0 6.929.032" transform="translate(-111.549 -16.914)" fill="#6c3d8e" />
                                </g>
                            </svg>
                        }
                    </div>
                </div>
                {
                    editMode ?
                        <div className={classes.content}>
                            <Slider {...settings}>
                                {
                                    data?.places[editDate]?.map((place: Place) => {
                                        return (
                                            <ReplaceCard onSelectPlace={() => handleSelectPlace(place)} place={place} />
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                        :
                        <div className={classes.content}>
                            {
                                viewType === 'map' &&
                                <>
                                    <Map locations={Object.keys(currentTrip?.places)?.map((key) => {
                                        return { location: { lat: Number(currentTrip?.places[key][0].lat), lng: Number(currentTrip?.places[key][0].long) } }
                                    })} />
                                    <Timeline>
                                        {
                                            data?.places &&
                                            Object.keys(data.places)?.map((date, i) => {
                                                const places = data.places[date] || [];
                                                const firstPlace = places.length > 0 ? places[0] : null;

                                                return (
                                                    <Timeline.Item key={i}>
                                                        <Timeline.Point number={i + 1}></Timeline.Point>
                                                        <TimelineCard showCover={false} date={date} place={firstPlace}></TimelineCard>
                                                    </Timeline.Item>
                                                );
                                            })
                                        }
                                    </Timeline>
                                </>
                            }
                            {
                                viewType === 'places' &&
                                <Timeline>
                                    {
                                        data?.places &&
                                        Object.keys(data.places)?.map((date, i) => {
                                            const places = data.places[date] || [];
                                            const firstPlace = places.length > 0 ? places[0] : null;

                                            return (
                                                <Timeline.Item key={firstPlace.id}>
                                                    <Timeline.Point number={i + 1}></Timeline.Point>
                                                    <TimelineCard date={date} place={firstPlace} onReplaceClick={() => handleReplaceClick(date)}></TimelineCard>
                                                </Timeline.Item>
                                            );
                                        })
                                    }
                                </Timeline>
                            }

                        </div>
                }

                <div className={classes.footer}>
                    <div className="row mt-3 justify-content-end">
                        <div className="col-md-4">
                            <button onClick={saveTrip} className='btn btn-main w-100'><Translate id='buttons.saveTrip' /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateTrip;