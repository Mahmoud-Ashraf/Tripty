import classes from './no-data.module.scss';

interface Props {
    text: string
}
const NoData = (props: Props) => {
    const { text } = props;
    return (
        <div className={classes.noData}>
            <p>Sorry, {text}</p>
            <button className='btn btn-main'>Go To Home</button>
        </div>
    )
}

export default NoData;
