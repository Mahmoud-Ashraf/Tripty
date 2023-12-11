import { City } from "./City"
import { Place } from "./place"
import { Tag } from "./tag"

export interface Trip {
    id?: number,
    date?: string,
    name?: string,
    start_at?: string,
    end_at?: string,
    family?: boolean,
    adults?: number,
    children?: number,
    budget?: string,
    city_id?: number,
    city?: City,
    tags?: (number | Tag)[]
    places?: any
}
