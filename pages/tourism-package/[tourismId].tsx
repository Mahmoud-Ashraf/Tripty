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
import { useDispatch } from "react-redux";
import { authActions } from "@/store/Auth/Auth";
import { TourismPackage } from "@/interfaces/tourism-package";
import Loader from "@/components/UI/Loader/Loader";

interface Props {
    serverPlace: TourismPackage,
    notFound: boolean
}

const PlacePage = (props: Props) => {
    const { serverPlace, notFound } = props;
    const { translate } = useTranslate();
    const dispatch = useDispatch();
    const [tourismPackage, setTourismPackage] = useState<TourismPackage>(serverPlace);
    const [showRateModal, setShowRateModal] = useState(false);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const { isLoading, error, sendRequest } = useHTTP();
    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState<boolean>();
    const { data: session }: any = useSession();
    const { tourismId } = router.query;
    // const { locale } = router;
    console.log(serverPlace);
    useEffect(() => {
        if (tourismId) {
            getTourismPackage();
        }
    }, [tourismId]);

    const getTourismPackage = () => {
        console.log(tourismId);
        sendRequest(
            {
                url: `/api/tourism-package?id=${tourismId}`,
                method: 'GET'
            },
            (data: any) => setTourismPackage(data.tourismPackage),
            (err: any) => console.log(err)
        )
    }

    const handleToggleFav = () => {
        if (session?.token) {
            const prevFav = isFavorite;
            setIsFavorite(prev => !prev);
            sendRequest(
                {
                    url: `/api/favs/toggle?prevFav=${prevFav}&placeId=${tourismPackage?.id}`,
                    method: 'GET'
                },
                (data: any) => {
                    setTourismPackage(data);
                },
                (err: any) => console.error(err)
            )
        } else {
            dispatch(authActions.openShowAuthModal());
        }
    }

    useEffect(() => {
        console.log(tourismPackage);
        setIsFavorite(tourismPackage?.is_favoritable);
    }, [tourismPackage])

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
            <Head>
                <title>{`Tripty - ${tourismPackage?.title}`}</title>
            </Head>
            {isLoading && <Loader full />}
            {tourismPackage ?
                <>
                    {
                        showRateModal &&
                        <CustomModal onOutsideClick={() => setShowRateModal(false)}>
                            <RateModal type="tourism-packages" placeId={tourismPackage.id} closeModal={() => setShowRateModal(false)} />
                        </CustomModal>
                    }
                    {
                        showGalleryModal &&
                        <CustomModal onOutsideClick={() => setShowGalleryModal(false)}>
                            <GalleryModal images={tourismPackage.gallery} />
                        </CustomModal>
                    }
                    <div className={classes.container}>
                        <div className={classes.details}>
                            <div className={classes.title}>
                                <div className={classes.naming}>
                                    {/* <div className={classes.logo}>
                                <img src={tourismPackage.logo} alt={`${tourismPackage.name} logo`} />
                            </div> */}
                                    {tourismPackage?.title && <div className={classes.name}>
                                        <h2>{tourismPackage.title}</h2>
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
                                        <ShareButtons url={`/tourism-package/${tourismPackage.id}`} title={tourismPackage.title} />
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="row gx-5">
                                <div className="col-md-6">
                                    {tourismPackage?.tags?.length > 0 && <div className={classes.tags}>
                                        <div className="row">
                                            {
                                                tourismPackage?.tags?.map(tag => {
                                                    return (
                                                        <div key={tag.id} className="col-auto">
                                                            <div className={classes.tag}>{tag.name}</div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>}
                                    <div className={classes.specs}>
                                        <span className={classes.rate}><i className="fa-solid fa-star"></i> {Number(tourismPackage?.rating).toFixed(1)} <span className={classes.addRate} onClick={() => setShowRateModal(true)}><Translate id='buttons.addRate' />..</span></span>
                                        {
                                            tourismPackage?.category?.name || tourismPackage?.sub_cats?.length > 0 ?
                                                <span className={classes.cuisine}> {(tourismPackage?.category?.icon || tourismPackage?.sub_cats[0]?.icon) && <img src={tourismPackage?.sub_cats && tourismPackage?.sub_cats[0]?.icon ? tourismPackage?.sub_cats[0]?.icon : tourismPackage?.category?.icon} />} {tourismPackage?.sub_cats && tourismPackage?.sub_cats[0]?.name ? tourismPackage?.sub_cats[0]?.name : tourismPackage?.category?.name}</span>
                                                :
                                                ''
                                        }
                                    </div>
                                    {tourismPackage?.gallery?.length > 0 && <div className={classes.gallery}>
                                        <div className="row">
                                            {
                                                tourismPackage?.gallery?.map(
                                                    (img: string, i: number) => {
                                                        if (i > 4) return
                                                        if (i === 4) return (
                                                            <div key={i} className="col">
                                                                <div className={classes.img} onClick={() => setShowGalleryModal(true)}>
                                                                    <div className={classes.galleryShowAll}>+{tourismPackage.gallery.length - 4}</div>
                                                                </div>
                                                            </div>
                                                        )
                                                        return (
                                                            <div key={i} className="col">
                                                                <div className={classes.img} onClick={() => setShowGalleryModal(true)}>
                                                                    <Image src={img} alt={`${tourismPackage.title} gallery`} rounded fluid />
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                )
                                            }
                                        </div>
                                    </div>}
                                    {tourismPackage?.about && <div className={classes.about}>
                                        <h3 className={classes.aboutTitle}><Translate id='place.about' /></h3>
                                        <p className={classes.aboutText}>{tourismPackage?.about}</p>
                                    </div>}
                                    {tourismPackage?.program && <div className={`${classes.about} mt-5`}>
                                        <h3 className={classes.aboutTitle}>Travel itinerary</h3>
                                        <div className={classes.program}>
                                            {
                                                Object.keys(tourismPackage?.program).map(key => {
                                                    return (
                                                        <div key={key} className={classes.item}>
                                                            <span>{key}</span>
                                                            <span className={classes.dot}></span>
                                                            <span>{tourismPackage.program[key]}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        {/* <div dangerouslySetInnerHTML={{ __html: tourismPackage?.program }} /> */}
                                    </div>}
                                </div>
                                <div className="col-md-6">
                                    <div className={classes.cover}>
                                        <div className={classes.photo}>
                                            {tourismPackage?.featured_image && <Image alt={`${tourismPackage.title} Cover`} src={tourismPackage?.featured_image} fluid />}
                                            {tourismPackage.discount && <div className={classes.offer}>
                                                <span>{tourismPackage.discount}%</span> <Translate id='place.getDiscount' />
                                            </div>}
                                        </div>
                                        {tourismPackage?.booking_link && <div className="row justify-content-end">
                                            <div className="col-lg-6">
                                                <Link className={`${classes.bookNow} w-100 text-center`} href={tourismPackage?.booking_link} ><Translate id='buttons.bookNow' /></Link>
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                <NoData text={""} />
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
    const { tourismId } = params;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    try {
        const response = await fetch(`${baseUrl}tourism-packages/${tourismId}?change_language=${locale}`);
        if (!response.ok) {
            throw new Error('Fetch Tourism Package Failed')
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


