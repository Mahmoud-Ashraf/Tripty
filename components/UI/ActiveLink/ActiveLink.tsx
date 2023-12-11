import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classes from './active-link.module.scss';

interface ActiveLinkProps {
    href: string;
    children: ReactNode;
}

const ActiveLink = ({ href, children }: ActiveLinkProps) => {
    const router = useRouter();

    const isActive = router.pathname.includes(href);


    return (
        <Link href={href} className={`${classes.link} ${isActive && classes.active}`}>
            {children}
        </Link>
    );
};

export default ActiveLink;
