import { useRouter } from 'next/router';
import classes from './login-modal.module.scss';
import Translate from '../helpers/Translate/Translate';
import Lottie from 'lottie-react';
import loginIcon from '@/public/assets/lottie/goToLogin.json';

const LoginModal = () => {
    const router = useRouter();

    return (
        <div className={classes.container}>
            {/* <p className='mb-4 fs-2 text-center'><Translate id='headings.loginToContinue' /></p> */}
            <div className="d-flex justify-content-center">
                <Lottie
                    animationData={loginIcon}
                    loop={true}
                    autoplay={true}
                    style={{ width: '300px', height: '300px' }} // Adjust the size as needed
                />
            </div>
            <div className="row justify-content-center">
                <div className="col-4"><button className='btn btn-main w-100' onClick={() => router.push('/auth/login')}><Translate id='buttons.login' /></button></div>
            </div>
        </div>
    )
}

export default LoginModal;