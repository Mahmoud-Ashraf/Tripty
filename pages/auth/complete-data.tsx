import classes from './auth.module.scss';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Translate from '@/components/helpers/Translate/Translate';
import useTranslate from '@/hooks/use-translate';
import AuthLayout from '@/components/layout/AuthLayout/AuthLayout';
import useHttp from '@/hooks/use-http';
import { City } from '@/interfaces/City';
import { useRouter } from 'next/router';

const CompleteData = (props: any) => {
    const { sliders } = props;
    const { translate } = useTranslate();
    const { isLoading, error, sendRequest } = useHttp();
    const [citeies, setCities] = useState<City[]>([]);
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        getLocations();
    }, []);

    const getLocations = () => {
        sendRequest(
            {
                url: '/api/cities',
                method: 'GET'
            },
            (data: any) => {
                setCities(data);
            },
            (error: any) => {
                console.error(error);
            }
        )
    }

    const updateProfile = () => {
        sendRequest(
            {
                url: '/api/user/update',
                method: 'POST',
                body: JSON.stringify({ gender: gender, city_id: city })
            },
            (data: any) => console.log(data),
            (err: any) => console.log(err)
        )
    }
    return (
        <>
            <Head>
                <title>Tripty - Complete Data</title>
            </Head>
            <AuthLayout sliders={sliders} className={classes.complete}>
                <Form>
                    <h1><Translate id='auth.completeData' /></h1>
                    <select className={classes.input} value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option disabled value={''}><Translate id="placeholder.gender" /></option>
                        <option value={'male'}><Translate id="common.male" /></option>
                        <option value={'female'}><Translate id="common.female" /></option>
                    </select>
                    <select className={classes.input} value={city} onChange={(e) => setCity(e.target.value)}>
                        <option disabled value={''}><Translate id="placeholder.city" /></option>
                        {citeies.map(city => {
                            return (
                                <option value={city.id} key={city.id}>{city.name}</option>
                            )
                        })}
                    </select>
                    <div className={`d-grid gap-2 ${classes.submit}`}>
                        <Button disabled={!city || !gender} variant="main" type="button" onClick={updateProfile}>
                            <Translate id='buttons.update' />
                        </Button>
                    </div>
                </Form>
            </AuthLayout>
        </>
    )
}
export async function getStaticProps() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
        const slidersReq = await fetch(`${baseUrl}sliders`);
        const slidersData = await slidersReq.json();

        return {
            props: {
                sliders: slidersData.data,
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                sliders: [] // Adjust based on the expected sliders data structure
            }
        };
    }
}

export default CompleteData;