import { ZodType } from "zod";
import { ResponseType } from "../types/request-response-type";

const validationService = <T>(
    schema: ZodType<T>,
    req: T
): ResponseType<T> => {

    // get request data 
    const result = schema.parse(req);


    // return
    return {
        status: "success",
        message: "berhasil memvalidasi data",
        data: result
    }

}


export default validationService;
