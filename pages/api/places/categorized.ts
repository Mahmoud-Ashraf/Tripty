// Next.js API route for place search: pages/api/places/search.js
import { Place } from '@/interfaces/place';
import type { NextApiRequest, NextApiResponse } from 'next';
interface CategorizedPlaces {
    [categoryName: string]: Place[]; // Define the structure for categorized places
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { locale, trendNow, long, lat } = req.query;
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        const categoriesReq = await fetch(`${baseUrl}categories?change_language=${locale}`);
        if (!categoriesReq.ok) {
            throw new Error('error fetching categories');
        }
        const categories = await categoriesReq?.json();
        categories?.data?.unshift({ name: locale === 'ar' ? 'الكل' : 'all', id: 0, icon: '' });

        const categorizedPlaces: CategorizedPlaces = {}; // Initialize as the defined interface

        await Promise.all(categories?.data?.map(async (category: any) => {
            try {
                const categoryPlacesReq = await fetch(`${baseUrl}places?change_language=${locale}${long ? `&long=${long}` : ''}${lat ? `&lat=${lat}` : ''}&category_id=${category.id}${trendNow ? '&trend_now=1' : ''}`);
                if (!categoryPlacesReq.ok) {
                    throw new Error(`error fetching category ${category.name}`);
                }
                const categoryPlacesData = await categoryPlacesReq.json();
                categorizedPlaces[category.name] = categoryPlacesData.data;
            } catch (error) {
                console.error(`Error fetching places for category ${category.name}:`, error);
                categorizedPlaces[category.name] = []; // Assign an empty array or handle as needed
            }
        }));
        res.status(200).json({ categorizedPlaces, categories: categories.data });

        // const response = await fetch(`${baseUrl}places?change_language=${locale}${trendNow ? '&trend_now=1' : ''}`);

        // if (!response.ok) {
        //     throw new Error('Error Fetching Data');
        // }

        // const data = await response.json();
        // if (data.error) {
        //     throw new Error('Error Fetching Data');
        // }
        // // Search for places based on the provided text
        // const places = data.data;
        // const categories: any[] = [];

        // // Restructure the places based on categories
        // const categorizedPlaces: any = {};
        // places.forEach((place: Place) => {
        //     const categoryName: string = place?.category?.name;
        //     if (!categorizedPlaces[categoryName]) {
        //         categorizedPlaces[categoryName] = [];
        //         categories.push(place.category);
        //     }
        //     categorizedPlaces[categoryName].push(place);
        // });
        // categories.unshift({ name: locale === 'ar' ? 'الكل' : 'all', id: 0, icon: '' });
        // categorizedPlaces[categories[0].name] = places;
        // res.status(200).json({ categorizedPlaces, categories });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
