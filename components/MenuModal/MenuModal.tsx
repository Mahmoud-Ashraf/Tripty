import useHTTP from '@/hooks/use-http';
import classes from './menu-modal.module.scss';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
// import PdfViewer from '../PDFViewer/PDFViewer';
import dynamic from 'next/dynamic'

const PdfViewer = dynamic(() => import('../PDFViewer/PDFViewer'), {
    ssr: false,
});

function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <i onClick={onClick} className="fa-solid fa-play custom-next"></i>
    );
}

function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <i onClick={onClick} className="fa-solid fa-play custom-prev"></i>
    );
}

const MenuModal = ({ link, type }: { link: string, type: string }) => {
    const { isLoading, error, sendRequest } = useHTTP();
    const [menu, setMenu] = useState();
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div className={classes.container}>
            {
                type === 'pdf' ?
                    <PdfViewer pdfUrl={link} />
                    :
                    <iframe style={{height: '70vh', marginTop: '3rem'}} src={link} frameBorder={0} width='100%' height='100%' />
            }
        </div>
    )
}

export default MenuModal;