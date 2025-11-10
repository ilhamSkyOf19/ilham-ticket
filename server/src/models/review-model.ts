import { Review } from "../../generated/prisma";

// create
export type ReviewCreateType = {
    comment: string
    rating: number
    movieId: number
}


// response
export type ReviewResponseType = Omit<ReviewCreateType, 'movieId'> & {
    id: number;
    username: string
    movies: number
};



// to response 
export const toReviewResponse = (review: Omit<Review, 'createdAt' | 'updatedAt' | 'movieId' | 'idUser'> & {
    movieId: number,
    username: string
}): ReviewResponseType => {
    return {
        id: review.id,
        username: review.username,
        comment: review.comment,
        rating: review.rating,
        movies: review.movieId
    }
}