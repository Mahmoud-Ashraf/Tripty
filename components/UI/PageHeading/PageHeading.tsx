import Translate from '@/components/helpers/Translate/Translate';
import classes from './page-heading.module.scss';

const PageHeading = ({ title }: any) => {
    return (
        <div className={classes.container}>
            <h2 className={classes.title}><Translate id={title} /></h2>
        </div>
    )
}

export default PageHeading;
