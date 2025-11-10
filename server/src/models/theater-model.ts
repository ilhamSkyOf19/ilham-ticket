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
    img: string;
    url_img: string;
}

// to response
export const toTheaterResponse = (theater: Theater): TheaterResponseType => {
    return {
        id: theater.id,
        img: theater.img,
        url_img: theater.url_img,
        name: theater.name,
        city: theater.city
    }
}
