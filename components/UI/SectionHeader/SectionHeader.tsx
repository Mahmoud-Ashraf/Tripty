import classes from './section-header.module.scss';

const SectionHeader = ({ title }: { title: string }) => {
    return (
        <header className={classes.container}>
            <h2 className={classes.header}>{title}</h2>
        </header>
    )
}

export default SectionHeader;