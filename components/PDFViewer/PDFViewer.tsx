import useHTTP from '@/hooks/use-http';
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Loader from '../UI/Loader/Loader';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.js',
//     import.meta.url,
// ).toString();

const PdfViewer = ({ pdfUrl }: any) => {
    const [numPages, setNumPages] = useState<number>(0);
    const { isLoading, error, sendRequest } = useHTTP();
    const [pdfContent, setPdfContent] = useState<string | null>(null); // Add state to store PDF content

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
        setNumPages(numPages);
    };

    const getPdfUrl = () => {
        sendRequest(
            {
                url: `/api/get-pdf?pdfUrl=${pdfUrl}`,
                method: 'GET',
                responseType: 'blob'
            },
            (data: any) => {
                const objectURL = URL.createObjectURL(data);
                console.log(objectURL)
            },
            (err: any) => console.error(err)
        )
    }

    useEffect(() => {
        if (pdfUrl) {
            getPdfUrl();
        }
    }, [pdfUrl])

    return (
        <div>
            {
                isLoading ?
                    <Loader />
                    :
                    <Document file={pdfContent} onLoadSuccess={onDocumentLoadSuccess}>
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                        ))}
                    </Document>
            }
        </div>
    );
};

export default PdfViewer;