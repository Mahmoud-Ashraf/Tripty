import { Tab, Tabs } from 'react-bootstrap';
import { useState } from 'react';
import Card from '../UI/Card/Card';
import SectionHeader from '../UI/SectionHeader/SectionHeader';
import { Category } from '@/interfaces/category';
import { Place } from '@/interfaces/place';

interface Props {
    tabs: Category[],
    categorizedPlaces: { [categoryName: string]: Place[] },
}

const HomeTabs = (props: Props) => {
    const [key, setKey] = useState<any>('all');
    const { tabs, categorizedPlaces } = props;
    const allPlaces: Place[] = [];
    Object.values(categorizedPlaces).forEach(categorizedPlace => allPlaces.push(...categorizedPlace));

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
                                        categorizedPlaces[tab.name]?.map(place => {
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
