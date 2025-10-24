import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/", (_: Request, res: Response) => {
    res.send("Express berhasil diinstall 🚀");
});

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server berjalan di http://localhost:${process.env.PORT || 3001}`);
});
