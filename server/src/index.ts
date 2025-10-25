import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { corsMiddleware } from "./middlewares/cors";
import errorHandler from "./middlewares/error-handler";
import genreRoute from "./routes/genre.route";
import theaterRoute from "./routes/theater.route";

// initialize express
const app = express();

// body parser 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parse 
app.use(cookieParser());

// cors 
app.use(corsMiddleware);

app.get("/", (_: Request, res: Response) => {
    res.send("Express berhasil diinstall 🚀");
});

// api genre
app.use('/api/genre', genreRoute);


// api theater
app.use('/api/theater', theaterRoute);


// next handler error 
app.use(errorHandler);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server berjalan di http://localhost:${process.env.PORT || 3001}`);
});
