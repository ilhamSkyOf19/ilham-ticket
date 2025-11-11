
// create 
export type BonusCreateType = {
    name: string;
    size: string;
    img: File;

}


// update 
export type BonusUpdateType = Partial<BonusCreateType>


// response 
export type BonusResponseType = BonusCreateType & {
    id: number;
    url_img: string;
}