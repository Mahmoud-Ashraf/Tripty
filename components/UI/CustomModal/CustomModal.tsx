import { ReactNode, useRef, MouseEventHandler, useEffect } from "react";
import classes from './custom-modal.module.scss';
import { useDispatch } from "react-redux";
import { tripActions } from "@/store/Trip/Trip";

interface Props {
    children: ReactNode,
    onOutsideClick: any
}
const CustomModal = (props: Props) => {
    const { children } = props;
    const modalRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const closeModal = (e: MouseEvent) => {
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
            closeModal(e);
        };

        // Attach the event listener when the component mounts
        document.addEventListener('mousedown', handleOutsideClick);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    return (
        <>
            <div className={classes.modalBackdrop}>
            </div>
            <div className={classes.modalOverlay}>
                <div ref={modalRef} className={classes.container}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default CustomModal;