import { Place } from "@/interfaces/place";
import classes from './place.module.scss';
import Link from "next/link";
import Image from 'react-bootstrap/Image';
import Head from "next/head";
import PlaceHeader from "@/components/UI/PlaceHeader/PlaceHeader";
import NoData from "@/components/layout/NoData/NoData";
import Translate from "@/components/helpers/Translate/Translate";
import CustomModal from "@/components/UI/CustomModal/CustomModal";
import { useState } from "react";
import RateModal from "@/components/RateModal/RateModal";
import PlaceMap from "@/components/UI/PlaceMap/PlaceMap";

interface Props {
    place: Place,
    notFound: boolean
}

const PlacePage = (props: Props) => {
    const { place, notFound } = props;
    const [showRateModal, setShowRateModal] = useState(false);
    if (notFound) {
        return (
            <>
                <Head>
                    <title>Tripty - No Data</title>
                </Head>
                <NoData text="No Place Found" />
            </>
        )
    }
    return (
        place && <>
            <Head>
                <title>{`Tripty - ${place?.name}`}</title>
            </Head>
            {
                showRateModal &&
                <CustomModal onOutsideClick={() => setShowRateModal(false)}>
                    <RateModal placeId={place.id} />
                </CustomModal>
            }
            <PlaceHeader name={place?.name} img={place?.featured_image} logo={place.logo} fav share discount={place.offer} />
            <div className={classes.container}>
                <div className={classes.details}>
                    <div className="row gx-5">
                        <div className="col-md-6">
                            <div className={classes.specs}>
                                <span className={classes.rate}><i className="fa-solid fa-star"></i> {place?.rating?.toFixed(1)} <span className={classes.addRate} onClick={() => setShowRateModal(true)}>Add rate..</span></span>
                                {place?.category?.parent ? <span className={classes.cuisine}><i className="fa-solid fa-utensils"></i> {place?.category?.name}</span> : ''}
                                <span className={classes.distance}>
                                    <svg data-name="Group 274" xmlns="http://www.w3.org/2000/svg" width="25.026" height="32.269" viewBox="0 0 25.026 32.269">
                                        <defs>
                                            <clipPath id="gwf19axr2a">
                                                <path data-name="Rectangle 321" fill="#8b8e98" d="M0 0h25.026v32.269H0z" />
                                            </clipPath>
                                        </defs>
                                        <g data-name="Group 273" clipPath="url(#gwf19axr2a)">
                                            <path data-name="Path 344" d="M12.511 32.269C7.167 27.681 2.263 22.878.447 15.883a12.528 12.528 0 1 1 24.569-4.123 15.262 15.262 0 0 1-1.225 6.653c-2.433 5.654-6.527 9.946-11.28 13.856m0-1.654c4.486-3.952 8.428-8.107 10.444-13.69 2.589-7.173-1.524-14.4-8.736-15.5A11.206 11.206 0 0 0 1.642 15.352c1.611 6.433 6.079 10.884 10.872 15.264" fill="#8b8e98" />
                                            <path data-name="Path 345" d="M21.5 16.071a5.28 5.28 0 1 1-10.558-.019 5.28 5.28 0 0 1 10.558.019m-5.218 4.014a3.958 3.958 0 0 0 3.948-3.969 4.011 4.011 0 0 0-8.022 0 3.969 3.969 0 0 0 4.074 3.967" transform="translate(-3.704 -3.677)" fill="#8b8e98" />
                                        </g>
                                    </svg> {Number(place.distance).toFixed(1)} <Translate id='common.km' />
                                </span>
                            </div>
                            <div className={classes.gallery}>
                                <div className="row">
                                    {
                                        place?.gallery?.map(
                                            (img: string, i: number) => {
                                                if (i > 4) return
                                                if (i === 4) return (
                                                    <div key={i} className="col">
                                                        <div className={classes.img}>
                                                            <div className={classes.galleryShowAll}>+{place.gallery.length - 4}</div>
                                                        </div>
                                                    </div>
                                                )
                                                return (
                                                    <div key={i} className="col">
                                                        <div className={classes.img}>
                                                            <Image src={img} alt={`${place.name} gallery`} rounded fluid />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                </div>

                            </div>
                            <div className={classes.about}>
                                <h3 className={classes.aboutTitle}><Translate id='place.about' /></h3>
                                <p className={classes.aboutText}>{place?.about}</p>
                            </div>
                            <div className={classes.menu}>
                                <h5 className={classes.menuTitle}><Translate id='place.menu' /></h5>
                                <Link href={place?.menu ? place.menu : ''} className={classes.menuLink}><Translate id='buttons.showMenu' /></Link>
                            </div>
                            <div className={classes.menu}>
                                <h5 className={classes.menuTitle}><Translate id='place.location' /></h5>
                                <PlaceMap lat={place.lat} lng={place.long} name={place.name} />
                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className={classes.cover}>
                                {place?.featured_image && <Image alt={`${place.name} Cover`} src={place?.featured_image} fluid />}
                                {place?.booking_link && <Link className={classes.bookNow} href={place?.booking_link} ><Translate id='buttons.bookNow' /></Link>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getStaticPaths() {
    // Fetch the list of place IDs from an API
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const placeIds = await fetch(`${baseUrl}places`).then(data => data.json());
    const paths = placeIds.data.map((place: Place) => ({
        params: { placeId: place.id.toString() },
    }));

    return {
        paths,
        fallback: true, // or true, depending on your requirements
    };
}

export async function getStaticProps(context: any) {
    const { placeId } = context.params;
    const { locale } = context;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    try {
        const response = await fetch(`${baseUrl}places/${placeId}?change_language=${locale}`);
        const data = await response.json();

        return {
            props: {
                place: data?.data || undefined,
                notFound: false
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                place: null,
                notFound: true
            }
            // notFound: true,
        };
    }
}

export default PlacePage;


