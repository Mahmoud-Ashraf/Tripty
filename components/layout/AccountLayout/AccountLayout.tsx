import PageHeading from '@/components/UI/PageHeading/PageHeading';
import classes from './account-layout.module.scss';
import Sidebar from '@/components/UI/Sidebar/Sidebar';
import { ReactNode } from 'react';

const AccountLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className={classes.container}>
            <PageHeading title="headings.myAccount" icon={<i className="fa-solid fa-gear"></i>} />
            <div className="row">
                <div className="col-4">
                    <Sidebar />
                </div>
                <div className="col-8">
                    <main className={classes.contentWrapper}>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default AccountLayout;