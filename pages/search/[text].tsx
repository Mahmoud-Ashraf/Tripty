import PlaceHeader from "@/components/UI/PlaceHeader/PlaceHeader";
import classes from './search.module.scss';
import { useRouter } from "next/router";
import Head from "next/head";
import HomeTabs from "@/components/HomeTabs/HomeTabs";
import { useEffect, useState } from "react";
import { Place } from "@/interfaces/place";
import { Category } from "@/interfaces/category";
import useHTTP from "@/hooks/use-http";

interface CategorizedPlaces {
    [categoryName: string]: Place[]; // Define the structure for categorized places
}

interface Props {
    tabs: Category[] | [],
    categorizedPlaces: CategorizedPlaces
}

const Search = () => {
    const router = useRouter();
    const searchText = router.query.text;
    const { isLoading, error, sendRequest } = useHTTP();
    const [searchValue, setSearchValue] = useState<string>('');
    // const [searchText, setSearchText] = useState(router.query.text);
    const [searchTabs, setSearchTabs] = useState<any>();
    const [searchCategorizedPlaces, setSearchCategorizedPlaces] = useState<any>();

    useEffect(() => {
        if (searchText) {
            setSearchValue(Array.isArray(searchText) ? searchText[0] : searchText); // Set searchValue when query changes
            getSearchData();
        }
    }, [searchText]); // Watch for changes in searchText

    const search = () => {
        router.push(`/search/${searchValue}`);
    }

    const getSearchData = () => {
        console.log(searchText);
        sendRequest(
            {
                url: `/api/search/${searchText}`
            },
            (data: any) => {
                // console.log(data);
                setSearchTabs(data.categories);
                setSearchCategorizedPlaces(data.categorizedPlaces)
            },
            (err: any) => console.log(err)
        )
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
                        searchTabs && searchCategorizedPlaces &&
                        <HomeTabs tabs={searchTabs} categorizedPlaces={searchCategorizedPlaces} />
                    }
                </div>
            </div>
        </>
    )
}

export default Search;