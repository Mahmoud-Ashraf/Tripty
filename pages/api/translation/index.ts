import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { body } = req;
    const apiKey = "trnsl.1.1.20231220T105110Z.bad138e08053e87f.b3d2a9d34d75cb85d41a2fd22985d62aa3b9016f";
    try {
        const translatedValues = await Promise.all(
            Object.keys(body.values).map(async (section) => {
                const translatedSection = await Promise.all(
                    Object.keys(body.values[section]).map(async (key) => {
                        const response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKey}&text=${body.values[section][key]}&lang=en-${body.lang}`, { method: 'GET' });
                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.message);
                        }
                        const translationData = await response.json();
                        return { [key]: translationData.text[0] };
                    })
                );
                return { [section]: Object.assign({}, ...translatedSection) };
            })
        );

        const translatedJson = Object.assign({}, ...translatedValues);
        res.status(201).json(translatedJson);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
