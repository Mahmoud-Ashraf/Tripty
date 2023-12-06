import Translate from '@/components/helpers/Translate/Translate';
import classes from './404.module.scss';

export default function Custom404() {
    return (
        <div className={classes.container}>
            <h1><Translate id="notFound.404" /></h1>
            <p><Translate id="notFound.sorry" /></p>
            {/* You can add styling, links, or any additional content */}
        </div>
    );
}