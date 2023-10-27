import { Place } from "@/interfaces/place";
import classes from './place.module.scss';
import Link from "next/link";
import Image from 'react-bootstrap/Image';
import Head from "next/head";
import PlaceHeader from "@/components/UI/PlaceHeader/PlaceHeader";
import NoData from "@/components/layout/NoData/NoData";

interface Props {
    place: Place,
    notFound: boolean
}

const PlacePage = (props: Props) => {
    const { place, notFound } = props;

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
                <title>Tripty - {place?.name}</title>
            </Head>
            <PlaceHeader name={place?.name} img={place?.featured_image} />
            <div className={classes.container}>
                <div className={classes.details}>
                    <div className="row gx-5">
                        <div className="col-md-6">
                            <div className={classes.specs}>
                                <span className={classes.rate}><i className="fa-solid fa-star"></i> {place?.rating?.toFixed(1)}</span>
                                {place?.category?.parent ? <span className={classes.cuisine}><i className="fa-solid fa-utensils"></i> {place?.category?.name}</span> : ''}
                                <span className={classes.distance}>4.5 Km</span>
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
            </div>
        </>
    );
}

export async function getStaticPaths() {
    // Fetch the list of place IDs from an API or database
    const placeIds = await fetch('http://18.133.139.168/api/v1/front/places').then(data => data.json());
    const paths = placeIds.data.map((place: Place) => ({
        params: { placeId: place.id.toString() },
    }));

    // const paths = [
    //     {
    //         params: { placeId: '1' }
    //     }
    // ]

    return {
        paths,
        fallback: true, // or true, depending on your requirements
    };
}

export async function getStaticProps(context: any) {
    const { placeId } = context.params;
    try {
        const response = await fetch(`http://18.133.139.168/api/v1/front/places/${placeId}`);
        const data = await response.json();

        return {
            props: {
                place: data?.data || undefined,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                notFound: true
            }
            // notFound: true,
        };
    }
}

export default PlacePage;


