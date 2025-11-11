// create 
export type TheaterCreateType = {
    name: string;
    city: string;
    img: File
}

// update 
export type TheaterUpdateType = Partial<TheaterCreateType>


// response 
export type TheaterResponseType = {
    id: number;
    name: string;
    city: string;
    img: string;
    url_img: string;
}