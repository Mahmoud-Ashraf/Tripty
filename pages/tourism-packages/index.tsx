import Card from "@/components/UI/Card/Card";
import ColorBox from "@/components/UI/ColorBox/ColorBox";
import PageHeading from "@/components/UI/PageHeading/PageHeading";
import useHTTP from "@/hooks/use-http";
import Head from "next/head";
import { useEffect, useState } from "react";

const TourismPackages = () => {
    const { isLoading, error, sendRequest } = useHTTP();
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
            <Head>
                <title>{`Tripty - Places`}</title>
            </Head>
            <div>
                <PageHeading title="headings.tourismPackages" />
                <ColorBox>
                    <div className="row">
                        {
                            tourismPackages?.map((tourismPackage, i) => {
                                return (
                                    <div key={i} className="col-md-4">
                                        <Card isTourism={true} place={tourismPackage} />
                                        {/* {tourismPackage} */}
                                    </div>
                                )
                            })
                        }
                    </div>
                </ColorBox>
            </div>
        </>
    )
}

export default TourismPackages;