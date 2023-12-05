import { useRouter } from 'next/router';
import classes from './login-modal.module.scss';

const LoginModal = () => {
    const router = useRouter();

    return (
        <div className={classes.container}>
            <p className='mb-4 fs-2 text-center'>Please, Login to continue</p>
            <div className="row justify-content-center">
                <div className="col-4"><button className='btn btn-main w-100' onClick={() => router.push('/auth/login')}>Login</button></div>
            </div>
        </div>
    )
}

export default LoginModal;