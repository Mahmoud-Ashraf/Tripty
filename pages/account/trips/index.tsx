import AccountLayout from "@/components/layout/AccountLayout/AccountLayout";
import useHTTP from "@/hooks/use-http";
import { useEffect, useState } from "react";
import classes from '../account.module.scss';
import { Trip } from "@/interfaces/trip";
import Head from "next/head";
import { useRouter } from "next/router";
import Loader from "@/components/UI/Loader/Loader";
import NoData from "@/components/layout/NoData/NoData";

const Favorite = () => {
    const { isLoading, error, sendRequest } = useHTTP();
    const [trips, setTrips] = useState<Trip[]>([]);
    const router = useRouter();
    const getTrips = () => {
        sendRequest(
            {
                url: '/api/trip/mytrips',
                method: 'GET'
            },
            (data: any) => {
                console.log(data);
                setTrips(data);
            },
            (err: any) => {
                console.log(err);
            }
        )
    }

    useEffect(() => {
        getTrips();
    }, [])
    return (
        <AccountLayout>
            <Head>
                <title>Tripty - My Trips</title>
            </Head>
            <div className={classes.container}>
                {
                    isLoading ?
                        <Loader />
                        :
                        trips?.length > 0 ?
                            trips?.map(trip => {
                                return (
                                    <div key={trip.id} className={classes.card} onClick={() => router.push(`/trip/${trip?.id}`)}>
                                        <div className={classes.cardCover}>
                                            {
                                                trip?.places[0] ?
                                                    <img className="img-fluid" src={trip?.places[0]?.featured_image} />
                                                    :
                                                    <i className="fa-solid fa-route"></i>
                                            }
                                        </div>
                                        <div className={classes.cardDetails}>
                                            <h2>{trip?.name || `trip ${trip?.date} from ${trip?.start_at} to ${trip?.end_at} @ ${trip?.city?.name}`}</h2>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <NoData text={""} />
                }
            </div>
        </AccountLayout >
    )
}

export default Favorite;