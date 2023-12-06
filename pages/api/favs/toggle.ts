// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { prevFav, locale, placeId } = req.query;
    const headers = Object.fromEntries(
        Object.entries(req.headers) as [string, string][]
    );
    try {
        let response;
        if (prevFav === "true") {
            response = await fetch(baseUrl + `favorites/remove/places/${placeId}`, { headers });
        } else {
            response = await fetch(baseUrl + `favorites/add/places/${placeId}`, { headers });
        }
        console.log(response);
        if (!response.ok) {
            throw new Error('somthing went wrong');
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        res.status(200).json(data.data);
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
