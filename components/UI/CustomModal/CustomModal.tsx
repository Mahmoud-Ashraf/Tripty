import { ReactNode, useRef, MouseEventHandler, useEffect } from "react";
import classes from './custom-modal.module.scss';
import { useDispatch } from "react-redux";
import { tripActions } from "@/store/Trip/Trip";
import ReactDOM from "react-dom";

interface Props {
    children: ReactNode,
    onOutsideClick: () => void,
    onClose?: () => void,
    size?: string
}
const CustomModal = (props: Props) => {
    const { children, size = 'lg' } = props;
    const modalRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const outSideClick = (e: MouseEvent) => {
        if (
            modalRef.current &&
            e.target instanceof Node &&
            !modalRef.current.contains(e.target)
        ) {
            props.onOutsideClick();
        }
    };

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            outSideClick(e);
        };
        // Attach the event listener when the component mounts
        document.addEventListener('mousedown', handleOutsideClick);
        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    return ReactDOM.createPortal(
        <>
            {/* <div className={classes.modalBackdrop}>
            </div> */}
            <div className={`${classes.modalOverlay}`}>
                <div className={`${classes.container}`}>
                    <div ref={modalRef} className={`${classes.content}  ${size === 'sm' ? classes.sm : ''}`}>
                        {props.onClose && <div className={classes.close}>
                            <i onClick={props.onClose} className="fa-solid fa-xmark"></i>
                        </div>}
                        {children}
                    </div>
                </div>
            </div>
        </>,
        document.body
    )
}

export default CustomModal;