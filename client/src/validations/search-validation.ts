import z from "zod";
import type { SearchModel } from "../models/search-model";

export class SearchValidation {
    // search
    static readonly SEARCH = z.object({
        keyword: z.string().nonempty('Search is required')
    }).strict() satisfies z.ZodType<SearchModel>
}