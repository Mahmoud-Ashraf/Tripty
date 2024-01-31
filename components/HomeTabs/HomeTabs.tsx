import { Tab, Tabs } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Card from '../UI/Card/Card';
import SectionHeader from '../UI/SectionHeader/SectionHeader';
import { Category } from '@/interfaces/category';
import { Place } from '@/interfaces/place';
import NoData from '../layout/NoData/NoData';
import useTranslate from '@/hooks/use-translate';
import useHTTP from '@/hooks/use-http';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Loader from '../UI/Loader/Loader';
interface Props {
    // tabs: Category[],
    trend?: boolean,
    discount?: boolean,
    searchText?: string
    // categorizedPlaces: { [categoryName: string]: Place[] },
    // showTitle?: boolean
}

const HomeTabs = (props: Props) => {
    const { translate } = useTranslate();
    const { isLoading: isPlacesLoading, error: placesError, sendRequest: fetchPlaces } = useHTTP();
    const { isLoading: isTabsLoading, error: tabsError, sendRequest: fetchTabs } = useHTTP();
    const coords = useSelector((state: RootState) => state.auth.userCoords);
    const [key, setKey] = useState<any>(0);
    const {
        // tabs,
        discount,
        trend,
        searchText = false
    } = props;
    const [tabPlaces, setTabPlaces] = useState<Place[]>([]);
    const [newTabs, setNewTabs] = useState<Category[]>([]);

    useEffect(() => {
        if (newTabs?.length > 0) {
            setKey(newTabs[0]?.id);
        }
    }, [newTabs]);

    const getTabs = () => {
        fetchTabs(
            {
                url: `/api/categories`,
                method: 'GET'
            },
            (data: Category[]) => setNewTabs([{ name: translate('common.all'), id: 0, icon: '' }, ...data]),
            (err: any) => console.error(err)
        )
    }

    const getTabPlaces = () => {
        fetchPlaces(
            {
                url: `/api/places/tabplaces?categoryId=${key}${trend ? '&trendNow=1' : ''}${!!searchText ? `&text=${searchText}` : ''}${coords ? `&long=${coords?.longitude}&lat=${coords?.latitude}` : ''}${discount ? '&with_discounts=1' : ''}`,
                method: 'GET'
            },
            (data: any) => setTabPlaces(data.places),
            (err: any) => setTabPlaces([])
        )
    }

    useEffect(() => {
        getTabs();
    }, [])

    useEffect(() => {
        getTabPlaces();
    }, [key, searchText])
    return (
        <>
            <div className={`home-tabs mt-5`}>
                {
                    !isTabsLoading && newTabs?.length > 0 &&
                    <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                        {
                            newTabs?.map(tab => {
                                return <Tab key={tab.id} eventKey={tab.id} title={tab.name}>
                                    <div className="row g-4">
                                        {
                                            isPlacesLoading ?
                                                <Loader />
                                                :
                                                tabPlaces?.length > 0 ?
                                                    tabPlaces?.map(place => {
                                                        return (
                                                            <div key={place?.id} className="col-sm-6 col-lg-4">
                                                                <Card place={place} />
                                                            </div>
                                                        )
                                                    })
                                                    :
                                                    <NoData text={translate('noData.noPlaces')} />
                                        }
                                    </div>
                                </Tab>
                            })
                        }
                    </Tabs>
                }
            </div>
        </>
    )
}

export default HomeTabs;
