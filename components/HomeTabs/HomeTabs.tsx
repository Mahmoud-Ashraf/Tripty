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
    const [key, setKey] = useState<any>(0);
    const { tabs, categorizedPlaces, showTitle } = props;

    useEffect(() => {
        if (tabs?.length > 0) {
            setKey(tabs[0]?.id);
        }
    }, [tabs])
    return (
        <>
            {showTitle && <SectionHeader title="headings.explorePlacesNearYou" icon={explore} />}
            <div className={`home-tabs mt-5`}>
                {
                    tabs?.length > 0 &&
                    <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                        {
                            tabs?.map(tab => {
                                return <Tab key={tab.id} eventKey={tab.id} title={tab.name}>
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
                }
            </div>
        </>
    )
}

export default HomeTabs;
