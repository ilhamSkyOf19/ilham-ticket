import cors from "cors";

export const corsMiddleware = cors({
    origin: "http://localhost:5173", // ganti dengan frontend mu
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
});
