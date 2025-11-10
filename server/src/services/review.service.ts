import { prisma } from "../lib/prisma";
import { ReviewCreateType, ReviewResponseType, toReviewResponse } from "../models/review-model";

export class ReviewService {

    // create 
    static async create(req: ReviewCreateType & { userId: number }): Promise<ReviewResponseType | null> {

        // create review
        const response = await prisma.review.create({
            data: {
                ...req,
                movieId: +req.movieId,
                idUser: req.userId
            },
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }

        });


        // return review
        return toReviewResponse({
            ...response,
            username: response.user.name
        });

    }

    // read where movie
    static async readWhereMovie(movieId: number): Promise<ReviewResponseType[] | null> {

        // get review
        const response = await prisma.review.findMany({
            where: {
                movieId
            },
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });


        // return review
        return response.map((res) => toReviewResponse({
            ...res,
            username: res.user.name
        }));
    }


    // delete 
    static async delete(id: number): Promise<ReviewResponseType | null> {

        // delete review 
        const response = await prisma.review.delete({
            where: {
                id
            },
            include: {
                movie: {
                    select: {
                        id: true
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });


        // return review
        return toReviewResponse({
            ...response,
            username: response.user.name
        });
    }

}