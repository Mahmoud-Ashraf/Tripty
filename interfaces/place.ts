import { Url } from 'next/dist/shared/lib/router/router';
import { Category } from './category';
export interface Place {
    id: number,
    name: string,
    about: string,
    min_price: string,
    max_price: string,
    rating: number,
    menu?: string,
    open_at?: string,
    close_at?: string,
    city?: { id: number, name: string, code: string | null }
    lat?: string,
    long?: string,
    logo?: string | null,
    featured_image?: string,
    gallery: string[],
    category: Category
}
