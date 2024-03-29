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
import { Tag } from '@/interfaces/tag';
import { getSession, useSession } from 'next-auth/react';
import Loader from '@/components/UI/Loader/Loader';

const CompleteData = (props: any) => {
    const { sliders } = props;
    const { translate } = useTranslate();
    const router = useRouter();
    const { isLoading, error, sendRequest } = useHttp();
    const [citeies, setCities] = useState<City[]>([]);
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    // const { data: session }: any = useSession();


    const checkUserSession = async () => {
        const session: any = await getSession();
        if (session?.user) {
            if (session?.user?.gender && session?.user?.city && session.user?.interests) {
                router.push('/home');
            } else {
                getProfile();
            }
        } else {
            router.push('/home');
        }
    }
    useEffect(() => {
        checkUserSession();
        getLocations();
        getTags();
    }, []);

    const getProfile = () => {
        sendRequest(
            {
                url: '/api/user/profile',
                method: 'GET'
            },
            (data: any) => {
                if (data.gender && data.city && data.interests) {
                    router.push('/home');
                } else {
                    setGender(data.gender);
                    setCity(data.city.id);
                    setSelectedTags(data.interests);
                }
            },
            (err: any) => console.error('user Error: ', err)
        )
    }

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
                body: { gender: gender, city_id: city, interests: selectedTags.map(tag => tag.id) }
            },
            (data: any) => {
                router.push('/home')
            },
            (err: any) => console.log(err)
        )
    }

    const getTags = () => {
        sendRequest(
            {
                url: '/api/categories',
                method: 'GET'
            },
            (data: any) => {
                setTags(data);
                // setSelectedTags([]);
            },
            (err: any) => console.log(err)
        );
    }

    const handleSelectTag = (tag: Tag) => {
        const index = selectedTags.findIndex(selectedTag => selectedTag.id === tag.id);
        if (index !== -1) {
            setSelectedTags([
                ...selectedTags.slice(0, index),
                ...selectedTags.slice(index + 1)
            ])
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    }

    useEffect(() => {
        console.log(selectedTags.map(tag => tag.id));
    }, [selectedTags])

    return (
        <>
            <Head>
                <title>Tripty - Complete Data</title>
            </Head>
            <AuthLayout sliders={sliders} className={classes.complete}>
                {isLoading && <Loader full />}
                <Form>
                    <h1><Translate id='auth.completeData' /></h1>
                    <select className={classes.input} value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option disabled value={''}><Translate id="placeholder.gender" /></option>
                        <option value={'male'}><Translate id="common.male" /></option>
                        <option value={'female'}><Translate id="common.female" /></option>
                    </select>
                    <select className={classes.input} value={city} onChange={(e) => setCity(e.target.value)}>
                        <option disabled value={''}><Translate id="placeholder.city" /></option>
                        {citeies?.map(city => {
                            return (
                                <option value={city.id} key={city.id}>{city.name}</option>
                            )
                        })}
                    </select>
                    <div className={classes.multiSelect}>
                        <label><Translate id='placeholder.selectInterests' /></label>
                        <div className="row g-2">
                            {
                                tags?.map(tag => {
                                    return (
                                        <div key={tag.id} className="col-auto">
                                            <div onClick={() => handleSelectTag(tag)} className={`${classes.selection} ${selectedTags?.some(selectedTag => selectedTag.id === tag.id) ? classes.selected : ''}`}>
                                                <span>{tag.name}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={`d-grid gap-2 ${classes.submit}`}>
                        <Button disabled={!city || !gender || selectedTags?.length < 1} variant="main" type="button" onClick={updateProfile}>
                            <Translate id='buttons.update' />
                        </Button>
                    </div>
                </Form>
            </AuthLayout>
        </>
    )
}
export async function getServerSideProps() {
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