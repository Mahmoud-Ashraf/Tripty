import { useRouter } from 'next/router';
import Translate from '../helpers/Translate/Translate';
import Lottie from 'lottie-react';
import loginIcon from '@/public/assets/lottie/goToLogin.json';
import { useDispatch } from 'react-redux';
import { subscriptionActions } from '@/store/Subscription/Subscription';
import { tripActions } from '@/store/Trip/Trip';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import useHTTP from '@/hooks/use-http';

const StartSubscriptionModal = () => {
    const dispatch = useDispatch();
    const [agree, setAgree] = useState(false);
    const { isLoading, error, sendRequest } = useHTTP();

    const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (agree) {
            let subscriptionDetails = null;
            await sendRequest(
                {
                    url: '/api/subscription/subscribe',
                    method: 'POST'
                },
                (data: any) => subscriptionDetails = data,
                (err: any) => console.error(err)
            )
            console.log(subscriptionDetails);
            dispatch(subscriptionActions.closeStartSubscriptionModal());
        }
    }
    return (
        <form onSubmit={handleSubscribe}>
            <div className='row justify-content-center'>
                <div className="d-flex flex-column col-md-8 gap-3">
                    <div className="d-flex justify-content-center mb-4">
                        <img style={{ width: '120px' }} src='/assets/images/logo.svg' alt='Tripty logo' />
                    </div>
                    <div className='d-flex flex-column fs-5 gap-3'>
                        <p className='text-center'><Translate id='subscribe.enjoySubscription' /></p>
                        <div className="d-flex gap-2 align-items-start">
                            <input type='checkbox' className='mt-2' checked={agree} onChange={(e) => setAgree(e.target.checked)} required />
                            <p><Translate id='subscribe.bySubscription' /> <Link href={'/privacypolicy'} target='_blank' className='text-main'><Translate id='sidebar.privacy' /></Link></p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <button
                                className='btn btn-main w-100'
                                disabled={!agree}
                            // onClick={() => { dispatch(subscriptionActions.closeStartSubscriptionModal()); dispatch(tripActions.openShowTripModal()) }}
                            // onClick={handleSubscribe}
                            >
                                <Translate id='subscribe.startFreeSubscription' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default StartSubscriptionModal;