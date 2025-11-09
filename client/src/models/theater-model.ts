// create 
export type TheaterCreateType = {
    name: string;
    city: string;
}

// update 
export type TheaterUpdateType = Partial<TheaterCreateType>


// response 
export type TheaterResponseType = {
    id: number;
    name: string;
    city: string;
}