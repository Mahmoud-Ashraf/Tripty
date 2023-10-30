import classes from './section-header.module.scss';
import Image from 'next/image';
const SectionHeader = ({ title, icon }: { title: string, icon?: any }) => {
    return (
        <header className={classes.container}>
            <h2 className={classes.header}>{title} {icon && <Image alt={title} src={icon} />}</h2>
        </header>
    )
}

export default SectionHeader;