import z from "zod";
import type { SearchModel } from "../models/search-model";

export class SearchValidation {
    // search
    static readonly SEARCH = z.object({
        keyword: z.string().nonempty('Search is required'),
        genre: z.enum(['All', 'Animation', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Thriller'])
    }).strict() satisfies z.ZodType<SearchModel>
}