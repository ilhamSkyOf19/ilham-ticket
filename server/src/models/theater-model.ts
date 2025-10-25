import { Theater } from "../../generated/prisma"

// create 
export type TheaterCreateType = {
    name: string
    city: string
}


// update 
export type TheaterUpdateType = Partial<TheaterCreateType>


// response 
export type TheaterResponseType = TheaterCreateType & {
    id: number;
}

// to response
export const toTheaterResponse = (theater: Theater): TheaterResponseType => {
    return {
        id: theater.id,
        name: theater.name,
        city: theater.city
    }
}
