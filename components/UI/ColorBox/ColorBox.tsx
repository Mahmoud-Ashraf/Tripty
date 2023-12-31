import styles from './color-box.module.scss';

const ColorBox = ({ children, background }: any) => {
    return (
        <div className={styles.container} style={{ backgroundColor: background }}>
            {children}
        </div>
    )
}

export default ColorBox;