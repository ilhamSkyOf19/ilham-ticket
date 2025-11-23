// create
export type ReviewCreateType = {
  comment: string;
  rating: number;
  movieId: number;
};

// update
// export type ReviewUpdateType = Partial<Omit<ReviewCreateType, "movieId">>;

// response
export type ReviewResponseType = Omit<ReviewCreateType, "movieId"> & {
  id: number;
  username: string;
  movies: number;
};

// to response
export const toReviewResponse = (
  review: ReviewResponseType & {
    movieId: number;
  }
): ReviewResponseType => {
  return {
    id: review.id,
    username: review.username,
    comment: review.comment,
    rating: review.rating,
    movies: review.movieId,
  };
};
