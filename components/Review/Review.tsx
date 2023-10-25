import Image from 'next/image';
import classes from './review.module.scss';
import avatar from '@/public/assets/images/logo.svg';
const Review = (props: { review: string, user: { name: string, title: string, avatar: string } }) => {
    return (
        <div className={classes.container}>
            <p className={classes.text}>{props.review}</p>
            <div className={classes.user}>
                <Image className={classes.userAvatar} alt='user avatar' src={avatar} />
                <div className={classes.userData}>
                    <h4 className={classes.userName}>{props.user.name}</h4>
                    <h5 className={classes.userTitle}>{props.user.title}</h5>
                </div>
            </div>
        </div>
    )
}

export default Review;