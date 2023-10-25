import { Tab, Tabs } from 'react-bootstrap';
import classes from './home-tabs.module.scss';
import { useEffect, useState } from 'react';
import Card from '../UI/Card/Card';
import SectionHeader from '../UI/SectionHeader/SectionHeader';
import useHTTP from '../../hooks/use-http';
import { Category } from '@/interfaces/category';

const HomeTabs = () => {
    const [key, setKey] = useState<any>('all');
    const { isLoading, error, sendRequest } = useHTTP();
    const [tabs, setTabs] = useState<Category[]>([]);
    const getSections = () => {
        sendRequest(
            {
                url: 'categories',
                method: 'GET'
            },
            (data: { data: Category[], error: boolean, message: string }) => {
                setTabs(data.data);
                data.data.forEach(tab => {

                });
            },
            (error: any) => {
                // console.log(error);
            }
        )
    }

    useEffect(() => {
        getSections();
    }, []);
    return (
        <>
            <SectionHeader title="Explore best places near you" />
            <div className={`home-tabs`}>
                <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                    <Tab eventKey="all" title="All">
                        <div className="row g-5">
                            <div className="col-4">
                                <Card />
                            </div>
                            <div className="col-4">
                                <Card />
                            </div>
                            <div className="col-4">
                                <Card />
                            </div>
                            <div className="col-4">
                                <Card />
                            </div>
                            <div className="col-4">
                                <Card />
                            </div>
                            <div className="col-4">
                                <Card />
                            </div>
                        </div>
                    </Tab>
                    {
                        tabs.map(tab => {
                            return <Tab key={tab.id} eventKey={tab.name} title={tab.name}>
                                <div className="row g-5">
                                    <div className="col-4">
                                        <Card />
                                    </div>
                                    <div className="col-4">
                                        <Card />
                                    </div>
                                    <div className="col-4">
                                        <Card />
                                    </div>
                                    <div className="col-4">
                                        <Card />
                                    </div>
                                    <div className="col-4">
                                        <Card />
                                    </div>
                                    <div className="col-4">
                                        <Card />
                                    </div>
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
