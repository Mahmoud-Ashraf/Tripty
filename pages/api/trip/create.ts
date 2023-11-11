// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    fetch(baseUrl + 'trips',
        {
            method: 'POST',
            body: req.body,
            headers: {
                'Authorization': 'Bearer 25|C2HIokiAYxGSZFWCYl7IWC4ielpX9DBg4PRvMSkob2c78ec2',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data, req.body)
            if (data.error) res.status(400).json({ error: data.message, reqBody: req.body });
            res.status(201).json(data.data);
        }).catch(error => console.log(error));
}
