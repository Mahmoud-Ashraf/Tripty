import { Url } from 'next/dist/shared/lib/router/router';
import { Category } from './category';
export interface Offer {
    id: number,
    type: string,
    amount: string,
    code: string,
    conditions: string,
    image: string
}
