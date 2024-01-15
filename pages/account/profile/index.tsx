import AccountLayout from "@/components/layout/AccountLayout/AccountLayout";
import Head from "next/head";
import classes from '../account.module.scss';
import useHTTP from "@/hooks/use-http";
import { useEffect, useState } from "react";
import useTranslate from "@/hooks/use-translate";
import Translate from "@/components/helpers/Translate/Translate";
import { useRouter } from "next/router";
import Loader from "@/components/UI/Loader/Loader";

const Favorite = () => {
    const { isLoading, error, sendRequest } = useHTTP();
    const { translate } = useTranslate();
    const [userData, setUserData] = useState<any>();
    const [updateError, setUpdateError] = useState('');
    const getProfile = () => {
        sendRequest(
            {
                url: '/api/user/profile',
                method: 'GET'
            },
            (data: any) => setUserData(data),
            (err: any) => console.error('user Error: ', err)
        )
    }

    const updateProfile = () => {
        const body = {
            name: userData.name,
            mobile: userData.mobile,
            email: userData.email,
            birthdate: userData.birthdate,
            gender: userData.gender
        }
        if (Object.values(body).some(value => value === '' || !value)) {
            setUpdateError('errors.updateError')
        } else {
            setUpdateError('');
            sendRequest(
                {
                    url: '/api/user/update',
                    method: 'POST',
                    body
                },
                (data: any) => {
                    // router.push('/account/profile');
                },
                (err: any) => console.error(err)
            )
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <AccountLayout>
            <Head>
                <title>Tripty - Personal Data</title>
            </Head>
            {isLoading && <Loader full />}
            {
                <div className={classes.profileContainer}>
                    <form>
                        <div className="row">
                            <div className="col-lg-10">
                                <div className="row g-5">
                                    <div className="col-md-6">
                                        <div className={classes.inputGroup}>
                                            <input placeholder={translate('placeholder.name')} value={userData?.name || ''} onChange={(e) => setUserData((prev: any) => { return { ...prev, name: e.target.value } })} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={classes.inputGroup}>
                                            <input placeholder={translate('placeholder.mobile')} value={userData?.mobile || ''} onChange={(e) => setUserData((prev: any) => { return { ...prev, mobile: e.target.value } })} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={classes.inputGroup}>
                                            <input placeholder={translate('placeholder.email')} value={userData?.email || ''} onChange={(e) => setUserData((prev: any) => { return { ...prev, email: e.target.value } })} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={classes.inputGroup}>
                                            <input placeholder={translate('placeholder.birthdate')} value={userData?.birthdate || ''} onChange={(e) => setUserData((prev: any) => { return { ...prev, birthdate: e.target.value } })} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        {/* <div className={classes.inputGroup}> */}
                                        <label className={classes.genderLabel}><Translate id='placeholder.gender' /></label>
                                        <div className={classes.radioSelect}>
                                            <div className="row g-0">
                                                <div className="col-6">
                                                    <div className={`${classes.selection}`}>
                                                        <div className={classes.radioContainer} onClick={() => setUserData((prev: any) => { return { ...prev, gender: 'male' } })}>
                                                            <div className={`${classes.radio} ${userData?.gender === 'male' ? classes.selected : ''}`} />
                                                            <span><Translate id='common.male' /></span>
                                                        </div>
                                                        <div className={classes.seperator} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className={`${classes.selection}`}>
                                                        <div className={classes.radioContainer} onClick={() => setUserData((prev: any) => { return { ...prev, gender: 'female' } })}>
                                                            <div className={`${classes.radio} ${userData?.gender === 'female' ? classes.selected : ''}`} />
                                                            <span><Translate id='common.female' /></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <input placeholder={translate('placeholder.birthdate')} value={userData?.birthdate || ''} onChange={(e) => setUserData((prev: any) => { return { ...prev, birthdate: e.target.value } })} /> */}
                                        {/* </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {updateError && <p className="text-error fs-3 text-center mt-5"><Translate id={updateError} /></p>}
                        <div className="row justify-content-end mt-5">
                            <div className="col-md-4">
                                <button type="button" onClick={updateProfile} className="btn btn-main w-100">Save your data</button>
                            </div>
                        </div>
                    </form>
                </div>
            }
        </AccountLayout>
    )
}

export default Favorite;