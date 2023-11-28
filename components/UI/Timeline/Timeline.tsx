import classes from './timeline.module.scss';

const Timeline = ({ children }: any) => {
    return (
        <div className={classes.container}>
            {children}
        </div>
    )
}

Timeline.Item = ({ children }: any) => {
    return (
        <div className={classes.item}>
            {children}
        </div>
    );
};

Timeline.Point = ({ number }: { number: number }) => {
    return (
        <div className={classes.point}>
            <div className={classes.title}>
                {number}
            </div>
            <div className={classes.line} />
            <div className={classes.titleEmpty}>
                
            </div>
        </div>
    )
};

export default Timeline;