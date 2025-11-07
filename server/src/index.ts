import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { corsMiddleware } from "./middlewares/cors";
import errorHandler from "./middlewares/error-handler";
import genreRoute from "./routes/genre.route";
import theaterRoute from "./routes/theater.route";
import movieRoute from "./routes/movie.route";
import path from "path";
import userRoute from "./routes/user.route";
import authRouter from "./routes/auth.route";

// initialize express
const app = express();

// body parser 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parse 
app.use(cookieParser());

// cors 
app.use(corsMiddleware);

// folder static 
const publicPath = path.join(__dirname, "../public");

// Middleware static
app.use("/uploads", express.static(path.join(publicPath, "uploads")));

app.get("/", (_: Request, res: Response) => {
    res.send("Express berhasil diinstall 🚀");
});

// login 
app.use('/api/auth', authRouter);


// api genre
app.use('/api/genre', genreRoute);


// api theater
app.use('/api/theater', theaterRoute);


// api movie
app.use('/api/movie', movieRoute);


// api user 
app.use('/api/user', userRoute);

// next handler error 
app.use(errorHandler);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server berjalan di http://localhost:${process.env.PORT || 3001}`);
});
