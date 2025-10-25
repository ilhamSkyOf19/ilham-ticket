import { NextFunction, Request, Response } from "express";
import { ResponseType } from "../types/request-response-type";
import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";
import multer from "multer";
import { ZodError } from "zod";


const errorHandler = (
    err: unknown | any,
    _req: Request,
    res: Response<ResponseType<null>>,
    _next: NextFunction
) => {
    // cek console
    console.log('error', err);


    // mapping error prisma
    if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                return res.status(400).json({
                    status: "failed",
                    message: "data sudah ada",
                    data: null
                });
            case "P2025":
                return res.status(400).json({
                    status: "failed",
                    message: "data tidak ditemukan",
                    data: null
                });
            default:
                return res.status(500).json({
                    status: "failed",
                    message: "internal server error",
                    data: null
                });
        }
    }


    // error multer 
    if (err instanceof multer.MulterError) {
        switch (err.code) {
            case 'LIMIT_FILE_SIZE':
                return res.status(400).json({
                    status: "failed",
                    message: "file terlalu besar",
                    data: null
                });

            case 'LIMIT_FILE_COUNT':
                return res.status(400).json({
                    status: "failed",
                    message: "file terlalu banyak",
                    data: null
                });
            case 'MISSING_FIELD_NAME':
                return res.status(400).json({
                    status: "failed",
                    message: "field name tidak ditemukan",
                    data: null
                })
            default:
                return res.status(500).json({
                    status: "failed",
                    message: "internal server error",
                    data: null
                });
        }
    }


    // error zod 
    if (err instanceof ZodError) {

        // err message
        const errMessages = err.issues.map((err) => err.message)[0];

        // return error
        return res.status(400).json({
            status: "failed",
            message: errMessages,
            data: null
        });
    }




    // return 
    return res.status(500).json({
        status: "failed",
        message: "internal server error",
        data: null
    });
}


export default errorHandler;