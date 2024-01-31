import { Place } from "@/interfaces/place";
import classes from './place.module.scss';
import Link from "next/link";
import Image from 'react-bootstrap/Image';
import Head from "next/head";
import PlaceHeader from "@/components/UI/PlaceHeader/PlaceHeader";
import NoData from "@/components/layout/NoData/NoData";
import Translate from "@/components/helpers/Translate/Translate";
import CustomModal from "@/components/UI/CustomModal/CustomModal";
import { useEffect, useState } from "react";
import RateModal from "@/components/RateModal/RateModal";
import PlaceMap from "@/components/UI/PlaceMap/PlaceMap";
import useHTTP from "@/hooks/use-http";
import { useRouter } from "next/router";
import GalleryModal from "@/components/GalleryModal/GalleryModal";
import useTranslate from "@/hooks/use-translate";
import { Dropdown } from "react-bootstrap";
import ShareButtons from "@/components/UI/ShareButtons/ShareButtons";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/store/Auth/Auth";
import { RootState } from "@/store";
import MenuModal from "@/components/MenuModal/MenuModal";
import OfferModal from "@/components/OfferModal/OfferModal";
import Loader from "@/components/UI/Loader/Loader";

interface Props {
    serverPlace: Place,
    notFound: boolean
}

const PlacePage = (props: Props) => {
    const { serverPlace, notFound } = props;
    const { translate } = useTranslate();
    const dispatch = useDispatch();
    const [place, setPlace] = useState<Place>(serverPlace);
    const [showRateModal, setShowRateModal] = useState(false);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [showMenuModal, setShowMenuModal] = useState(false);
    const [showOfferModal, setShowOfferModal] = useState(false);
    const { isLoading, error, sendRequest } = useHTTP();
    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState<boolean>();
    const { data: session }: any = useSession();
    const { placeId } = router.query;
    const coords = useSelector((state: RootState) => state.auth.userCoords);
    // const { locale } = router;
    // console.log(serverPlace);
    useEffect(() => {
        if (placeId) {
            getPlace();
        }
    }, [placeId, coords]);

    const getPlace = () => {
        sendRequest(
            {
                url: `/api/place?id=${placeId}${coords ? `&long=${coords?.longitude}&lat=${coords?.latitude}` : ''}`,
                method: 'GET'
            },
            (data: any) => setPlace(data.place),
            (err: any) => console.log(err)
        )
    }

    const handleToggleFav = () => {
        if (session?.token) {
            const prevFav = isFavorite;
            setIsFavorite(prev => !prev);
            sendRequest(
                {
                    url: `/api/favs/toggle?prevFav=${prevFav}&placeId=${place.id}`,
                    method: 'GET'
                },
                (data: any) => {
                    setPlace(data);
                },
                (err: any) => console.error(err)
            )
        } else {
            dispatch(authActions.openShowAuthModal());
        }
    }

    useEffect(() => {
        // console.log(place);
        setIsFavorite(place?.is_favoritable);
    }, [place])

    if (notFound) {
        return (
            <>
                <Head>
                    <title>Tripty - No Data</title>
                </Head>
                <NoData showHomeBtn text={translate('noData.noPlace')} />
            </>
        )
    }
    return (
        <>
            {isLoading && <Loader full />}
            {
                place && <>
                    <Head>
                        <title>{`Tripty - ${place?.name}`}</title>
                    </Head>
                    {
                        showRateModal &&
                        <CustomModal onOutsideClick={() => setShowRateModal(false)}>
                            <RateModal type="places" placeId={place.id} closeModal={() => setShowRateModal(false)} />
                        </CustomModal>
                    }
                    {
                        showGalleryModal &&
                        <CustomModal onOutsideClick={() => setShowGalleryModal(false)}>
                            <GalleryModal images={[...place.gallery, ...place.videos]} />
                        </CustomModal>
                    }
                    {
                        showMenuModal &&
                        <CustomModal onOutsideClick={() => setShowMenuModal(false)} onClose={() => setShowMenuModal(false)}>
                            <MenuModal data={place?.menu_images?.length > 0 ? place?.menu_images : place?.menu && place?.menu} type={place?.menu_images.length > 0 ? 'images' : 'link'} logo={place.logo} name={place.name} />
                        </CustomModal>
                    }
                    {
                        showOfferModal &&
                        <CustomModal size='sm' onOutsideClick={() => setShowOfferModal(false)} onClose={() => setShowOfferModal(false)}>
                            <OfferModal offer={place?.offer} />
                        </CustomModal>
                    }
                    {/* <PlaceHeader name={place?.name} id={place?.id} img={place?.featured_image} logo={place.logo} fav isFav={place.is_favoritable} share discount={place.offer} /> */}
                    <div className={classes.container}>
                        <div className={classes.details}>
                            <div className={classes.title}>
                                <div className={classes.naming}>
                                    {place?.logo && <div className={classes.logo}>
                                        <img src={place.logo} alt={`${place.name} logo`} />
                                    </div>}
                                    {place?.name && <div className={classes.name}>
                                        <h2>{place.name}</h2>
                                    </div>}
                                </div>
                                <div className={classes.actions}>
                                    <button onClick={handleToggleFav} className={classes.fav}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
                                            <g transform="translate(.327 -.31)">
                                                <rect width="56" height="56" rx="4" transform="translate(-.327 .31)" fill="#f8f8f8" />
                                                <path data-name="Icon" d="m15 28-.5-.469C3.075 17.617 0 14.134 0 8.44A8.194 8.194 0 0 1 7.908 0c3.64 0 5.711 2.211 7.092 3.885C16.381 2.211 18.452 0 22.092 0A8.2 8.2 0 0 1 30 8.44c0 5.694-3.075 9.177-14.5 19.091L15 28z" transform="translate(12.673 14.31)" fill={isFavorite ? '#dc3545' : '#cbcfe9'} />
                                            </g>
                                        </svg>
                                    </button>
                                    <Dropdown>
                                        <Dropdown.Toggle className='text-white' variant="transperent" id="share-dropdown">
                                            <span className={classes.shareBtn}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24.089" height="28.587" viewBox="0 0 24.089 28.587">
                                                    <path d="M0 0v10.795a2.757 2.757 0 0 0 2.811 2.7h16.867a2.757 2.757 0 0 0 2.811-2.7V0" transform="translate(.8 14.294)" fill="none" stroke="#6c3d8e" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.6px" />
                                                    <path data-name="Path" d="M11.245 5.4 5.622 0 0 5.4" transform="translate(6.422 .8)" fill="none" stroke="#6c3d8e" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.6px" />
                                                    <path data-name="Path" d="M.469 0v17.542" transform="translate(11.576 .8)" fill="none" stroke="#6c3d8e" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.6px" />
                                                </svg>
                                            </span>
                                        </Dropdown.Toggle>
                                        <ShareButtons url={`/place/${place.id}`} title={place.name} />
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="row gx-5">
                                <div className="col-md-6">
                                    {(place.tags.length > 0 || place.sub_cats.length > 0) && <div className={classes.tags}>
                                        <div className="row g-2">
                                            {
                                                [...place?.sub_cats, ...place?.tags].map((tag, i) => {
                                                    return (
                                                        <div key={i} className="col-auto">
                                                            <div className={classes.tag}>{tag.name}</div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>}
                                    <div className={classes.specs}>
                                        {place?.rating && <span className={classes.rate}><i className="fa-solid fa-star"></i> {place?.rating?.toFixed(1)} <span className={classes.addRate} onClick={() => setShowRateModal(true)}><Translate id='buttons.addRate' />..</span></span>}
                                        {
                                            place?.category?.name || place?.sub_cats?.length > 0 ?
                                                <span className={classes.cuisine}> {(place?.category?.icon || place?.sub_cats[0]?.icon) && <img src={place?.sub_cats && place?.sub_cats[0]?.icon ? place?.sub_cats[0]?.icon : place?.category?.icon} />} {place?.sub_cats && place?.sub_cats[0]?.name ? place?.sub_cats[0]?.name : place?.category?.name}</span>
                                                :
                                                ''
                                        }
                                        {place?.distance && <span className={classes.distance}>
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
                                            </svg> {place.distance}
                                            {/* <Translate id='common.km' /> */}
                                        </span>}
                                    </div>
                                    {(place.gallery?.length > 0 || place?.videos?.length > 0) && <div className={classes.gallery}>
                                        <div className="row">
                                            {
                                                [...place?.gallery, ...place.videos].map(
                                                    (img: any, i: number) => {
                                                        if (i > 4) return
                                                        if (i === 4) return (
                                                            <div key={i} className="col">
                                                                <div className={classes.img} onClick={() => setShowGalleryModal(true)}>
                                                                    <div className={classes.galleryShowAll}>+{[...place?.gallery, ...place.videos].length - 4}</div>
                                                                </div>
                                                            </div>
                                                        )
                                                        return (
                                                            <div key={i} className="col">
                                                                <div className={classes.img} onClick={() => setShowGalleryModal(true)}>
                                                                    {
                                                                        img.thumb ?
                                                                            <div className={classes.videoThumb}>
                                                                                <div className={classes.icon}>
                                                                                    <i className="fa-solid fa-play"></i>
                                                                                </div>
                                                                                <Image src={img.thumb} alt={`${place.name} gallery`} rounded fluid />
                                                                            </div>
                                                                            :
                                                                            <Image src={img} alt={`${place.name} gallery`} rounded fluid />
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                )
                                            }
                                        </div>

                                    </div>}
                                    {place?.about && <div className={classes.about}>
                                        <h3 className={classes.aboutTitle}><Translate id='place.about' /></h3>
                                        <p className={classes.aboutText}>{place?.about}</p>
                                    </div>}
                                    {(place?.menu || place?.menu_images.length > 0) && <div className={classes.menu}>
                                        <h5 className={classes.menuTitle}><Translate id='place.menu' /></h5>
                                        <button onClick={() => setShowMenuModal(true)} className={classes.menuLink}><Translate id='buttons.showMenu' /></button>
                                    </div>}
                                    {place?.tel && <div className={classes.contact}>
                                        <h5 className={classes.menuTitle}><Translate id='place.contact' /></h5>
                                        <p>{place?.tel}</p>
                                    </div>}
                                    {place?.lat && place.long && <div className={classes.menu}>
                                        <h5 className={classes.menuTitle}><Translate id='place.location' /></h5>
                                        <PlaceMap lat={place.lat} lng={place.long} name={place.name} />
                                    </div>}

                                </div>
                                <div className="col-md-6">
                                    <div className={classes.cover}>
                                        <div className={classes.photo}>
                                            {place?.featured_image && <Image alt={`${place.name} Cover`} src={place?.featured_image} fluid />}
                                            {place?.offer && <div className={classes.offer} onClick={() => setShowOfferModal(true)}>
                                                <span>{place.offer.amount}{place.offer.type === "percentage" && '%'}</span> <Translate id='place.getDiscount' />
                                            </div>}
                                            <div className={classes.placeStatus}>
                                                {
                                                    place?.is_open ?
                                                        <span style={{ color: '#1fa200' }}><Translate id='common.open' /></span>
                                                        :
                                                        <span className='text-error' style={{ color: '#1fa200' }}><Translate id='common.openAt' /> {place?.open_at?.slice(0, 5)}</span>
                                                }
                                            </div>
                                        </div>
                                        {place?.booking_link && <div className="row justify-content-end">
                                            <div className="col-lg-6">
                                                <Link className={`${classes.bookNow} w-100 text-center`} href={place?.booking_link} ><Translate id='buttons.bookNow' /></Link>
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

// export async function getStaticPaths() {
//     // Fetch the list of place IDs from an API
//     const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//     const placeIds = await fetch(`${baseUrl}places`).then(data => data.json());
//     const paths = placeIds.data.map((place: Place) => ({
//         params: { placeId: place.id.toString() },
//     }));

//     return {
//         paths,
//         fallback: true, // or true, depending on your requirements
//     };
// }

export async function getServerSideProps({ locale, params }: any) {
    const { placeId } = params;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    try {
        const response = await fetch(`${baseUrl}places/${placeId}?change_language=${locale}`);
        if (!response.ok) {
            throw new Error('Fetch Place Failed')
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return {
            props: {
                serverPlace: data?.data || undefined,
                notFound: false
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                serverPlace: null,
                notFound: true
            }
            // notFound: true,
        };
    }
}

export default PlacePage;


