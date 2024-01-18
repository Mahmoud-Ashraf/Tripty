import { Category } from './category';
import { Offer } from './offer';
import { Tag } from './tag';
export interface Place {
    id: number,
    name: string,
    title?: string,
    about: string,
    tel: string,
    min_price?: string,
    max_price?: string,
    price?: string,
    rating: number,
    menu: string,
    is_open: boolean,
    open_at?: string,
    close_at?: string,
    city?: { id: number, name: string, code: string | null }
    lat?: string,
    long?: string,
    logo?: string,
    booking_link?: string,
    featured_image: string,
    is_favoritable: boolean,
    gallery: string[],
    tags: Tag[],
    category: Category,
    is_recommended: boolean,
    offer: Offer,
    distance: string,
    videos: any[] 
    sub_cats: any[],
    menu_pdf: string
}
