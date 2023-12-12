import Translate from '@/components/helpers/Translate/Translate';
import classes from './section-header.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
const SectionHeader = ({ title, icon, onIconClick }: { title: string, icon?: any, onIconClick: string }) => {
    const router = useRouter();
    return (
        <header className={classes.container}>
            <h2 className={classes.header}><Translate id={title} /> {icon && <Image onClick={() => router.push(onIconClick)} alt={title} src={icon} />}</h2>
        </header>
    )
}

export default SectionHeader;