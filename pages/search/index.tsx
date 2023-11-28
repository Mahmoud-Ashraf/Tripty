import PlaceHeader from "@/components/UI/PlaceHeader/PlaceHeader";
import classes from './search.module.scss';
import { useRouter } from "next/router";
import Head from "next/head";
import HomeTabs from "@/components/HomeTabs/HomeTabs";
import { useEffect, useState } from "react";
import { Place } from "@/interfaces/place";

interface CategorizedPlaces {
    [categoryName: string]: Place[]; // Define the structure for categorized places
}

interface Props {
    tabs: [],
    categorizedPlaces: CategorizedPlaces
}

const Search = ({ tabs, categorizedPlaces }: Props) => {
    const router = useRouter();
    const searchText = router.query.text;
    // const { isLoading, error, sendRequest } = useHTTP();
    const [searchValue, setSearchValue] = useState<string>('');
    // const [searchText, setSearchText] = useState(router.query.text);
    // const [searchTabs, setSearchTabs] = useState<any>();
    // const [searchCategorizedPlaces, setSearchCategorizedPlaces] = useState<any>();

    useEffect(() => {
        if (searchText) {
            setSearchValue(Array.isArray(searchText) ? searchText[0] : searchText); // Set searchValue when query changes
        }
    }, [searchText]); // Watch for changes in searchText

    const search = () => {
        router.push(`/search?text=${searchValue}`);
    }

    return (
        <>
            <Head>
                <title>Tripty - Search</title>
            </Head>
            <PlaceHeader>
                <h2>Search</h2>
            </PlaceHeader>
            <div className={classes.container}>
                <div className={classes.search}>
                    <input type='text' placeholder='Search' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
                </div>
                <div className={classes.content}>
                    {
                        tabs && categorizedPlaces &&
                        <HomeTabs tabs={tabs} categorizedPlaces={categorizedPlaces} />
                    }
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context: any) {
    const { query, locale } = context;
    const { text } = query || {};
    try {
        const categoriesReq = await fetch(`http://localhost:3000/api/search?locale=${locale}&text=${text}`);
        const categoriesData = await categoriesReq.json();
        return {
            props: {
                tabs: categoriesData.categories,
                categorizedPlaces: categoriesData.categorizedPlaces
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                tabs: [],
                categorizedPlaces: {} as CategorizedPlaces // Initialize as the defined interface
            }
        };
    }
}

export default Search;