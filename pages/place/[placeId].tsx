import useHTTP from "@/hooks/use-http";
import { Place } from "@/interfaces/place";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import classes from './place.module.scss';
import Link from "next/link";
import Image from 'react-bootstrap/Image';
import { Context } from "vm";
import Head from "next/head";
import PlaceHeader from "@/components/UI/PlaceHeader/PlaceHeader";
const Place = (props: any) => {
    const router = useRouter();
    const [place, setPlace] = useState<Place>();
    const { isLoading, error, sendRequest } = useHTTP();
    const placeId = router.query.placeId;

    useEffect(() => {
        getPlace();
    }, [placeId]);

    const getPlace = () => {
        console.log(placeId);
        sendRequest(
            {
                url: `places/${placeId}`,
                method: 'GET'
            },
            (place: { data: Place, error: boolean, message: string }) => {
                setPlace(place.data);
            },
            (error: any) => {
                console.log(error);
            }
        )
    }
    return (
        <>
            <Head>
                <title>Tripty - {place?.name}</title>
            </Head>
            <PlaceHeader name={place?.name} img={place?.featured_image} />
            {place && <div className={classes.container}>
                <div className={classes.details}>
                    <div className="row gx-5">
                        <div className="col-md-6">
                            <div className={classes.specs}>
                                <span className={classes.rate}><i className="fa-solid fa-star"></i> {place?.rating.toFixed(1)}</span>
                                {place?.category?.parent ? <span className={classes.cuisine}><i className="fa-solid fa-utensils"></i> {place?.category?.name}</span> : ''}
                                <span className={classes.distance}>4.5 Km</span>
                            </div>
                            <div className={classes.gallery}>
                                <div className="row">
                                    {
                                        place?.gallery.map(
                                            (img, i) => {
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
                                    {/* <div className="col">
                                    <div className={classes.img}>

                                    </div>
                                </div>
                                <div className="col">
                                    <div className={classes.img}>

                                    </div>
                                </div>
                                <div className="col">
                                    <div className={classes.img}>

                                    </div>
                                </div>
                                <div className="col">
                                    <div className={classes.img}>

                                    </div>
                                </div> */}
                                </div>

                            </div>
                            <div className={classes.about}>
                                <h3 className={classes.aboutTitle}>About</h3>
                                <p className={classes.aboutText}>{place?.about}</p>
                            </div>
                            <div className={classes.menu}>
                                <h5 className={classes.menuTitle}>Menu</h5>
                                <Link href={place?.menu ? place.menu : ''} className={classes.aboutText}>This is a link will go to Menu</Link>
                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className={classes.cover}>
                                {place?.featured_image && <Image alt={`${place.name} Cover`} src={place?.featured_image} fluid />}
                                <button className={classes.bookNow}>Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
}

// export async function getStaticPaths() {

//     return {
//         fallback: true,
//         paths: [
//             {
//                 params: {
//                     placeId: '1'
//                 }
//             },
//             {
//                 params: {
//                     placeId: '2'
//                 }
//             },
//             {
//                 params: {
//                     placeId: '3'
//                 }
//             },
//         ]

//     }
// }

// export async function getStaticProps(context: Context) {
//     const placeId = context.params.placeId;
//     // const { isLoading, error, sendRequest } = useHTTP();
//     let data;
//     await fetch(`http://18.133.139.168/api/v1/front/places/${placeId}`).then(data => data.json()).then(result => data = result.data);
//     return {
//         props: {
//             place: data
//         }
//     }
// }

export default Place;


