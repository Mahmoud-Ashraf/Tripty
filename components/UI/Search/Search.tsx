import useTranslate from '@/hooks/use-translate';
import classes from './search.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Search = ({ from = 'header' }: { from?: string }) => {
    const { translate } = useTranslate();
    const router = useRouter();
    const [searchText, setSearchText] = useState('');

    return (
        <div className={`${classes.search} ${classes[from]}`}>
            <input type='text' placeholder={translate('searchBar.placeholder')} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <i className="fa-solid fa-magnifying-glass" onClick={() => router.push(`/search?text=${searchText}`)}></i>
        </div>
    )
}

export default Search;