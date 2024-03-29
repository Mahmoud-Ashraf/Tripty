import { useSelector } from 'react-redux';
import classes from './timeline-card.module.scss';
import Image from 'next/image';
import { RootState } from '@/store';
import Translate from '@/components/helpers/Translate/Translate';

const TimelineCard = ({ place, showCover = true, date, onReplaceClick }: any) => {
    const currentTrip = useSelector((state: RootState) => state.trip.currentTrip);
    const formatTiming = (timing: string) => {
        const [startTime, endTime] = timing?.split('-');
        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);

        return `${formattedStartTime} - ${formattedEndTime}`;
    }

    const formatTime = (time: string) => {
        const [hours, minutes, seconds] = time?.split(':');
        const formattedTime = `${hours}:${minutes}`;

        return formattedTime;
    }

    const handleReplace = () => {
        onReplaceClick();
    }
    return (
        <div className={classes.container}>
            <div className={classes.inner}>
                <div className={classes.time}>
                    <div className={classes.timing}>
                        <i className="fa-solid fa-clock"></i>
                        <span>{formatTiming(date)}</span>
                    </div>
                    {showCover && onReplaceClick && <button onClick={handleReplace} className='btn btn-main btn-sm'><Translate id='buttons.replace' /></button>}
                </div>
                {showCover && <div className={classes.cover}>
                    <img src={place?.featured_image} alt='card-image' />
                </div>}
                <div className={classes.details}>
                    <h4>{place.name}</h4>
                    <div className={classes.specs}>
                        <span className={classes.rate}><i className="fa-solid fa-star"></i> {place.rating.toFixed(1)}</span>
                        <div className={classes.btns}>
                            {/* <span className={classes.matched}>100% matched</span> */}
                            <button className='btn btn-sm btn-main'>
                                <svg data-name="Group 252" xmlns="http://www.w3.org/2000/svg" width="22" height="19.8" viewBox="0 0 64.924 58.404">
                                    <defs>
                                        <clipPath id="l087ls5f0a">
                                            <path data-name="Rectangle 292" fill="#FFFFFF" d="M0 0h64.924v58.404H0z" />
                                        </clipPath>
                                    </defs>
                                    <g data-name="Group 251" clipPath="url(#l087ls5f0a)">
                                        <path data-name="Path 316" d="M26.106 107.623c.461.785.9 1.528 1.328 2.281a.333.333 0 0 1-.058.3 14.355 14.355 0 0 1-11.132 5.075c-.8 0-1.61-.1-2.415-.132a11.574 11.574 0 0 0-8.311 2.886c-.7.6-1.394 1.22-2.066 1.81l19.122 19.117c.853-.739 1.721-1.539 2.639-2.276a14.1 14.1 0 0 1 10.217-3.179 14.251 14.251 0 0 0 5.47-.4 11.411 11.411 0 0 0 5.123-3.244A14.37 14.37 0 0 1 54.9 125.1c.973-.138 1.968-.131 2.953-.176.788-.037 1.577-.052 2.44-.08-.129-.141-.2-.229-.283-.31q-8.2-8.2-16.4-16.394a.41.41 0 0 1-.091-.6c.418-.7.8-1.428 1.2-2.17.106.1.2.187.294.279q9.694 9.693 19.39 19.383a1.4 1.4 0 0 1-1.008 2.488c-2.431.061-4.865.084-7.292.227a11.185 11.185 0 0 0-7.811 3.733 14.578 14.578 0 0 1-8.919 4.756 20.553 20.553 0 0 1-4.253 0A11.488 11.488 0 0 0 26.733 139c-1.116.935-2.194 1.916-3.3 2.87a1.369 1.369 0 0 1-2.028-.076Q10.949 131.332.49 120.872a1.369 1.369 0 0 1 .059-2.146c1.286-1.126 2.535-2.3 3.884-3.347a14.113 14.113 0 0 1 9.646-2.981 25.236 25.236 0 0 0 3.745.021 11.11 11.11 0 0 0 7.16-3.671c.352-.377.728-.731 1.122-1.124" transform="translate(0 -83.875)" fill="#FFFFFF" />
                                        <path data-name="Path 317" d="M126.081 0a11.447 11.447 0 0 1 11.291 9.776 11.4 11.4 0 0 1-.755 5.623 48.163 48.163 0 0 1-4.025 8.179c-1.714 2.842-3.521 5.629-5.311 8.425a1.376 1.376 0 0 1-2.45 0 110.11 110.11 0 0 1-7.8-13.064 25.207 25.207 0 0 1-2.1-5.441 10.545 10.545 0 0 1 2.091-9.039A11.25 11.25 0 0 1 126.081 0m-.025 28.889c.094-.133.154-.208.2-.289 1.373-2.22 2.78-4.42 4.106-6.667a46.482 46.482 0 0 0 3.646-7.442 8.542 8.542 0 0 0 .62-4.447 8.753 8.753 0 0 0-6.8-7.122 8.61 8.61 0 0 0-8.964 3.678 7.647 7.647 0 0 0-1.021 7.081c.47 1.31.987 2.611 1.585 3.867a92.654 92.654 0 0 0 6.143 10.611c.15.23.3.457.485.731" transform="translate(-91.263)" fill="#FFFFFF" />
                                        <path data-name="Path 318" d="M152.55 27.435a6.21 6.21 0 1 1-6.2-6.187 6.2 6.2 0 0 1 6.2 6.187m-2.745.044a3.465 3.465 0 1 0-6.929-.032 3.465 3.465 0 0 0 6.929.032" transform="translate(-111.549 -16.914)" fill="#FFFFFF" />
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={classes.utils}>
                    <span className={classes.location}><i className="fa-solid fa-location-dot"></i> {place.city.name}</span>
                    {
                        place?.category?.name || place?.sub_cats?.length > 0 ?
                            <span className={classes.cuisine}> {(place?.category?.icon || place?.sub_cats[0]?.icon) && <img src={place?.sub_cats && place?.sub_cats[0]?.icon ? place?.sub_cats[0]?.icon : place?.category?.icon} />} {place?.sub_cats && place?.sub_cats[0]?.name ? place?.sub_cats[0]?.name : place?.category?.name}</span>
                            :
                            ''
                    }
                    <span className={classes.distance}><i className="fa-solid fa-location-dot"></i> {place.distance}</span>
                </div>
            </div>
            <span className={classes.distanceTime}><i className="fa-solid fa-car"></i> 30<Translate id='common.m' /></span>
        </div>
    )
}

export default TimelineCard;