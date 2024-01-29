import { City } from "./City"
import { Place } from "./place"
import { Tag } from "./tag"

export interface Trip {
    id?: number,
    date: any,
    name: string,
    start_at: number | string,
    end_at: number | string,
    family: number,
    adults: number,
    children: number,
    haveBudget: boolean,
    budget: string,
    city_id?: number,
    city?: City | null,
    tags: Tag[] | [],
    otherTags: [],
    places?: any,
    howsComing: 'solo' | 'family' | 'friends'
}
