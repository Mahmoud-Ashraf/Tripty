import { useEffect } from 'react';
import classes from './menu-modal.module.scss';
// import PdfViewer from '../PDFViewer/PDFViewer';
import dynamic from 'next/dynamic'

const PdfViewer = dynamic(() => import('../PDFViewer/PDFViewer'), {
    ssr: false,
});

const MenuModal = ({ data, type, logo, name }: { data: any, type: string, logo: string, name: string }) => {
    useEffect(() => {
        console.log(data, type);
    }, [data])
    return (
        <div className={classes.container}>
            <div className={classes.logos}>
                <img src='/assets/images/logo.svg' alt='tripty logo' />
                {logo && <img src={logo} alt={`${name} logo`} />}
            </div>
            <div className={classes.content}>
                {
                    type === 'images' ?
                        data?.map((image: string, i: number) => {
                            return (
                                <img key={i} src={image} alt={`${name} menu image ${i + 1}`} />
                            )
                        })
                        :
                        <iframe style={{ height: '70vh' }} src={data} frameBorder={0} width='100%' height='100%' />
                }
            </div>
        </div>
    )
}

export default MenuModal;