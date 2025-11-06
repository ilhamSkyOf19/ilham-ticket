import { Request } from "express";
import { Payload } from "./payload";

export interface AuthRequest<
    params =
    {},
    _ = {},
    body = {},
    query = {}> extends Request<params, _, body, query> {
    data?: Payload
}