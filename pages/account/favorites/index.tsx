import AccountLayout from "@/components/layout/AccountLayout/AccountLayout";
import useHTTP from "@/hooks/use-http";
import { useEffect, useState } from "react";
import classes from '../account.module.scss';
import { useRouter } from "next/router";
import Head from "next/head";
import Loader from "@/components/UI/Loader/Loader";
import NoData from "@/components/layout/NoData/NoData";

const Favorite = () => {
    const { isLoading, error, sendRequest } = useHTTP();
    const [favorites, setFavorites] = useState<any[]>([]);
    const router = useRouter();
    useEffect(() => {
        getFavs();
    }, [])

    const getFavs = () => {
        sendRequest(
            {
                url: '/api/favs/places',
                method: 'GET'
            },
            (data: any) => {
                setFavorites(data);
            },
            (err: any) => {
                console.error(err);
            }
        )
    }

    return (
        <AccountLayout>
            <Head>
                <title>Tripty - My Favorites</title>
            </Head>
            <div className={classes.container}>
                {
                    isLoading ?
                        <Loader />
                        :
                        favorites?.length > 0 ?
                            favorites?.map(fav => {
                                return (
                                    <div onClick={() => router.push(`/place/${fav.id}`)} key={fav.id} className={classes.card}>
                                        <div className={classes.cardCover}>
                                            <img className="img-fluid" src={fav?.featured_image} />
                                        </div>
                                        <div className={classes.cardDetails}>
                                            <h2>{fav.name}</h2>
                                            <p>{fav.about}</p>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <NoData text={""} />
                }
            </div>
        </AccountLayout>
    )
}

export default Favorite;