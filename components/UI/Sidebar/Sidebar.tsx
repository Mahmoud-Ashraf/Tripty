import Translate from "@/components/helpers/Translate/Translate";
import ActiveLink from "../ActiveLink/ActiveLink";
import classes from './sidebar.module.scss';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/router";

const Sidebar = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const handleLogout = async () => {
        await signOut().then(() => {
            router.push('/auth/login');
        });
    }

    return (
        <div className={classes.sidebar}>
            <div className={classes.details}>
                <div className={classes.data}>
                    <img src={session?.user?.image || ''} alt="user avatar" />
                    <h3>{session?.user?.name}</h3>
                </div>
                <div className={classes.logout} onClick={handleLogout}>
                    <span><Translate id="sidebar.logout" /></span>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </div>
            </div>
            <div className={classes.links}>
                <div className={classes.item}>
                    {/* <i className="fa-regular fa-circle-user"></i> */}
                    <ActiveLink href="profile" ><Translate id="sidebar.personalData" /></ActiveLink>
                </div>
                <div className={classes.item}>
                    {/* <i className="fa-regular fa-heart"></i> */}
                    <ActiveLink href="favorites" ><Translate id="sidebar.favorite" /></ActiveLink>
                </div>
                <div className={classes.item}>
                    {/* <i className="fa-solid fa-route"></i> */}
                    <ActiveLink href="trips" ><Translate id="sidebar.trips" /></ActiveLink>
                </div>
                <div className={classes.item}>
                    {/* <i className="fa-regular fa-bell"></i> */}
                    <ActiveLink href="notifications" ><Translate id="sidebar.notifications" /></ActiveLink>
                </div>
                <div className={classes.item}>
                    {/* <i className="fa-solid fa-file-signature"></i> */}
                    <ActiveLink href="terms-and-conditions" ><Translate id="sidebar.terms" /></ActiveLink>
                </div>
                <div className={classes.item}>
                    {/* <i className="fa-solid fa-shield-halved"></i> */}
                    <ActiveLink href="privacy-policy" ><Translate id="sidebar.privacy" /></ActiveLink>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;