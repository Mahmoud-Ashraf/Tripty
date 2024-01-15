import PlaceHeader from "@/components/UI/PlaceHeader/PlaceHeader";
import classes from './search.module.scss';
import { useRouter } from "next/router";
import Head from "next/head";
import HomeTabs from "@/components/HomeTabs/HomeTabs";
import { useEffect, useState } from "react";
import { Place } from "@/interfaces/place";
import { Category } from "@/interfaces/category";
import useHTTP from "@/hooks/use-http";
import useTranslate from "@/hooks/use-translate";
import PageHeading from "@/components/UI/PageHeading/PageHeading";

interface CategorizedPlaces {
    [categoryName: string]: Place[]; // Define the structure for categorized places
}

interface Props {
    tabs: Category[] | [],
    categorizedPlaces: CategorizedPlaces
}

const Search = () => {
    const router = useRouter();
    const { translate } = useTranslate();
    const searchText = router.query.text;
    // const { isLoading, error, sendRequest } = useHTTP();
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchInput, setSearchInput] = useState<string>('');
    // const [searchText, setSearchText] = useState(router.query.text);
    // const [searchTabs, setSearchTabs] = useState<any>();
    // const [searchCategorizedPlaces, setSearchCategorizedPlaces] = useState<any>();

    useEffect(() => {
        if (searchText) {
            setSearchValue(Array.isArray(searchText) ? searchText[0] : searchText); // Set searchValue when query changes
            setSearchInput(Array.isArray(searchText) ? searchText[0] : searchText);
            // getSearchData();
        }
    }, [searchText, router.locale]); // Watch for changes in searchText

    const search = () => {
        router.push(`/search?text=${searchInput}`);
    }

    // const getSearchData = () => {
    //     sendRequest(
    //         {
    //             url: `/api/places?text=${searchText}`,
    //             method: 'GET'
    //         },
    //         (data: any) => {
    //             // setSearchTabs(data.categories);
    //             setSearchCategorizedPlaces(data.categorizedPlaces)
    //         },
    //         (err: any) => console.log(err)
    //     )
    // }

    return (
        <>
            <Head>
                <title>Tripty - Search</title>
            </Head>
            {/* <PlaceHeader>
                <h2>Search</h2>
            </PlaceHeader> */}
            <PageHeading title='headings.search' />
            <div className={classes.container}>
                <div className={classes.searchInput}>
                    <div className={classes.search}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type='text' placeholder={translate('searchBar.placeholder')} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                    </div>
                    <button onClick={search} className="btn btn-main">Search</button>
                </div>
                <div className={classes.content}>
                    {
                        // searchTabs && searchCategorizedPlaces &&
                        <HomeTabs searchText={searchValue} />
                    }
                </div>
            </div>
        </>
    )
}

export default Search;