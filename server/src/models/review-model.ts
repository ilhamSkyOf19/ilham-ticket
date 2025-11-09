import { Review } from "../../generated/prisma";

// create
export type ReviewCreateType = {
    username: string,
    comment: string
    rating: number,
}


// response
export type ReviewResponseType = ReviewCreateType & {
    id: number;
    movies: number[];
};



// to response 
export const toReviewResponse = (review: Omit<Review, 'createdAt' | 'updatedAt' | 'movieId'> & {
    movieId: number[]
}): ReviewResponseType => {
    return {
        id: review.id,
        username: review.username,
        comment: review.comment,
        rating: review.rating,
        movies: review.movieId.map((movieId) => movieId)
    }
}