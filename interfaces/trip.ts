import { Place } from "./place"
import { Tag } from "./tag"

export interface Trip {
    date?: string,
    name?: string,
    start_at?: string,
    end_at?: string,
    family?: boolean,
    adults?: number,
    children?: number,
    budget?: string,
    city_id?: number,
    tags?: (number | Tag)[]
    places?: Place[]
}
