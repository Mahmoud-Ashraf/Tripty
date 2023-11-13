// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    fetch(baseUrl + 'tags',
        {
            method: 'POST',
            body: req.body,
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => {
            res.status(201).json(data.data);
        }).catch(error => console.log(error));
}
