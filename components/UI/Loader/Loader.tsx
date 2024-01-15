import classes from './loader.module.scss';

interface Props {
    full?: boolean
}
const Loader = ({ full = false }: Props) => {
    return (
        <div className={`${classes.container} ${full ? classes.full : ''}`}>
            <i className="fa-solid fa-spinner fa-spin-pulse fa-3x"></i>
        </div>
    )
}

export default Loader;