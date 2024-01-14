import { Category } from './category';
import { Offer } from './offer';
import { Tag } from './tag';
export interface TourismPackage {
    id: number,
    title: string,
    about: string,
    price?: string,
    rating: number,
    city?: { id: number, name: string, code: string | null },
    logo?: string,
    booking_link?: string,
    featured_image: string,
    is_favoritable: boolean,
    gallery: string[],
    tags: Tag[],
    category: Category,
    is_recommended: boolean,
    // offer: Offer,
    discount: number,
    program: string,
    sub_cats: any[]
}
