import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { pdfUrl }: any = req.query;

    if (!pdfUrl) {
        res.status(400).json({ error: 'pdfUrl is Required' });
    } else {
        try {
            const pdfResponse = await fetch(pdfUrl);

            if (!pdfResponse.ok) {
                throw new Error('Failed to fetch PDF');
            }

            const pdfBlob = await pdfResponse.blob();

            res.setHeader('Content-Type', 'application/pdf');
            res.status(200).end(pdfBlob, 'binary');
        } catch (error) {
            console.error('Error fetching PDF:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     const { pdfUrl }: any = req.query;

//     fetch(pdfUrl, {
//         method: 'GET',
//     }).then((res) => {
//         const file = new Blob([res.data], { type: 'application/pdf' });
//         const fileURL = URL.createObjectURL(file);
//         return fileURL;
//     });
// }