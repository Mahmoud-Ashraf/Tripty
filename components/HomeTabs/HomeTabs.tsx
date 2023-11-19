import { Tab, Tabs } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Card from '../UI/Card/Card';
import SectionHeader from '../UI/SectionHeader/SectionHeader';
import { Category } from '@/interfaces/category';
import { Place } from '@/interfaces/place';
import explore from '@/public/assets/images/explore.svg';
interface Props {
    tabs: Category[],
    categorizedPlaces: { [categoryName: string]: Place[] },
    showTitle?: boolean
}

const HomeTabs = (props: Props) => {
    const [key, setKey] = useState<any>('all');
    const { tabs, categorizedPlaces, showTitle } = props;
    // const allPlaces: Place[] = [];
    // Object.values(categorizedPlaces).forEach(categorizedPlace => allPlaces.push(...categorizedPlace));
    useEffect(() => {
        setKey(tabs[0]?.name);
    }, [tabs])
    return (
        <>
            {showTitle && <SectionHeader title="Explore best places near you" icon={explore} />}
            <div className={`home-tabs mt-5`}>
                <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
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
