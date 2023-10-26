import { Tab, Tabs } from 'react-bootstrap';
import classes from './home-tabs.module.scss';
import { useEffect, useState } from 'react';
import Card from '../UI/Card/Card';
import SectionHeader from '../UI/SectionHeader/SectionHeader';
import useHTTP from '../../hooks/use-http';
import { Category } from '@/interfaces/category';
import { Place } from '@/interfaces/place';

const HomeTabs = () => {
    const [key, setKey] = useState<any>('all');
    const { isLoading, error, sendRequest } = useHTTP();
    const [tabs, setTabs] = useState<Category[]>([]);
    const [allPlaces, setAllPlaces] = useState<Place[]>([]);
    const getSections = () => {
        sendRequest(
            {
                url: 'categories',
                method: 'GET'
            },
            (data: { data: Category[], error: boolean, message: string }) => {
                data.data.forEach(tab => {
                    getCategoryPlaces(tab);
                });
            },
            (error: any) => {
                // console.log(error);
            }
        )
    }

    const getCategoryPlaces = (category: Category) => {
        sendRequest(
            {
                url: `places?category_id=${category.id}`,
                method: 'GET'
            },
            (places: { data: Place[], error: boolean, message: string }) => {
                setTabs(
                    prev => {
                        if (prev.some(tab => category.id === tab.id)) return prev;
                        return [...prev, { ...category, places: places.data }];
                    }
                );
            },
            (error: any) => {
                // console.log(error);
            }
        )
    }

    useEffect(() => {
        getSections();
    }, []);
    useEffect(() => {
        setAll();
    }, [tabs]);

    const setAll = () => {
        let all: Place[] = [];
        tabs.map(tab => {
            if (tab.places) {
                all.push(...tab.places);
            }
        });
        setAllPlaces(all);
    }
    
    return (
        <>
            <SectionHeader title="Explore best places near you" />
            <div className={`home-tabs`}>
                <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                    <Tab eventKey="all" title="All">
                        <div className="row g-5">
                            {
                                allPlaces.map(place => {
                                    return (
                                        <div key={place.id} className="col-4">
                                            <Card place={place} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Tab>
                    {
                        tabs.map(tab => {
                            return <Tab key={tab.id} eventKey={tab.name} title={tab.name}>
                                <div className="row g-5">
                                    {
                                        tab.places?.map(place => {
                                            return (
                                                <div key={place?.id} className="col-4">
                                                    <Card place={place} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Tab>
                        })
                    }
                </Tabs>
            </div>
        </>
    )
}

export default HomeTabs;
