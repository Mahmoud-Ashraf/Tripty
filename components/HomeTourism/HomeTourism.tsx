import TourismCard from "../TourismCard/TourismCard";
import SectionHeader from "../UI/SectionHeader/SectionHeader";
import { useEffect, useState } from "react";
import useHTTP from "@/hooks/use-http";
import Translate from "../helpers/Translate/Translate";
import { useRouter } from "next/router";
const HomeTourism = () => {
    const { isLoading, error, sendRequest } = useHTTP();
    const router = useRouter();
    const [tourismPackages, setTourismPackages] = useState<any[]>([]);

    const fetchPlaces = () => {
        sendRequest(
            {
                url: '/api/tourism-packages',
                method: 'GET'
            },
            (data: any) => {
                console.log(data);
                setTourismPackages(data);
            },
            (err: any) => {
                // setNewTabs([]);
                // setNewPlaces({});
            }
        )
    }

    useEffect(() => {
        fetchPlaces();
    }, [])
    return (
        <>
            <SectionHeader title="entries.tourism" />
            <div className="row mb-5">
                <div className="col-md-7">
                    {
                        tourismPackages[0] &&
                        <TourismCard
                            onClick={() => router.push(`/tourism-package/${tourismPackages[0].id}`)}
                            img={tourismPackages[0]?.featured_image}
                            big>
                            <h2>{tourismPackages[0].title}</h2>
                            <h3>{parseInt(tourismPackages[0].price)} <Translate id="currencies.sar" /></h3>
                        </TourismCard>
                    }
                </div>
                <div className="col-md-5">
                    <div className="row">
                        {
                            tourismPackages[1] &&
                            <div className="col-12">
                                <TourismCard
                                    onClick={() => router.push(`/tourism-package/${tourismPackages[1].id}`)}
                                    img={tourismPackages[1]?.featured_image}>
                                    <h2>{tourismPackages[1].title}</h2>
                                    <h3>{parseInt(tourismPackages[1].price)} <Translate id="currencies.sar" /></h3>
                                </TourismCard>
                            </div>
                        }
                        {
                            tourismPackages[2] &&
                            <div className="col-12">
                                <TourismCard
                                    onClick={() => router.push(`/tourism-package/${tourismPackages[2].id}`)}
                                    img={tourismPackages[2]?.featured_image}>
                                    <h2>{tourismPackages[2].title}</h2>
                                    <h3>{parseInt(tourismPackages[2].price)} <Translate id="currencies.sar" /></h3>
                                </TourismCard>
                            </div>
                        }
                    </div>
                    {/* <div className={classes.stacked_images}>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default HomeTourism;