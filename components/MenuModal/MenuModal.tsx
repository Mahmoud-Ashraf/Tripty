import classes from './menu-modal.module.scss';
// import PdfViewer from '../PDFViewer/PDFViewer';
import dynamic from 'next/dynamic'

const PdfViewer = dynamic(() => import('../PDFViewer/PDFViewer'), {
    ssr: false,
});

const MenuModal = ({ link, type }: { link: string, type: string }) => {
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