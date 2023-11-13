import PlaceHeader from "@/components/UI/PlaceHeader/PlaceHeader";
import classes from './search.module.scss';
import { useRouter } from "next/router";

const Search = () => {
    const router = useRouter();
    const searchText = router.query.text;

    return (
        <>
            <PlaceHeader>
                <h2>Search</h2>
            </PlaceHeader>
            <div className={classes.container}>
                
            </div>
        </>
    )
}

export default Search;