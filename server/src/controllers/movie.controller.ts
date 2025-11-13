import { NextFunction, Request, Response } from "express";
import {
  MovieCreateType,
  MovieResponseType,
  MovieUpdateType,
} from "../models/movie-model";
import validationService from "../services/validation.service";
import { MovieValidation } from "../validations/movie-validation";
import { FileService } from "../services/file.service";
import { generateUrl } from "../helpers/helper";
import { MovieService } from "../services/movie.service";
import { ResponseType } from "../types/request-response-type";
import { BookedResponseType } from "../models/booked-model";

export class MovieController {
  // create
  static async create(
    req: Request<{}, {}, MovieCreateType>,
    res: Response<ResponseType<MovieResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // cek file
      if (!req.file) {
        return res.status(400).json({
          status: "failed",
          message: "file not found",
          data: null,
        });
      }

      // get body & cek body
      const body = validationService<Omit<MovieCreateType, "thumbnail">>(
        MovieValidation.CREATE,
        {
          ...req.body,
          price: Number(req.body.price),
          available: Boolean(req.body.available),
          genreId: Number(req.body.genreId),
          seats: Number(req.body.seats),
        }
      );

      // base url
      const baseUrl = `${req.protocol}://${req.get("host")}`;

      // generate
      const url_thumbnail = generateUrl(
        baseUrl,
        "thumbnails",
        req.file?.filename
      );

      // get service
      const response = await MovieService.create({
        ...body.data,
        thumbnail: req.file?.filename ?? "",
        url_thumbnail: url_thumbnail,
      });

      // return
      return res.status(201).json({
        status: "success",
        message: "berhasil membuat movie",
        data: response,
      });
    } catch (error) {
      // delete file request
      if (req.file) {
        await FileService.deleteFileRequest(req.file.path);
      }

      // next error
      next(error);
    }
  }

  // read
  static async read(
    _req: Request,
    res: Response<ResponseType<MovieResponseType[] | null>>,
    next: NextFunction
  ) {
    try {
      // get service
      const response = await MovieService.read();

      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil membaca movie",
        data: response,
      });
    } catch (error) {
      // next error
      next(error);
    }
  }

  // read detail
  static async readDetail(
    req: Request<{ id: string }>,
    res: Response<ResponseType<MovieResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get params id
      const id = req.params.id;

      // get service
      const response = await MovieService.readDetail(+id);

      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil membaca movie",
        data: response,
      });
    } catch (error) {
      // next error
      next(error);
    }
  }

  // update
  static async update(
    req: Request<{ id: string }, {}, MovieUpdateType>,
    res: Response<ResponseType<MovieResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get params
      const id = req.params.id;

      // cek body
      const body = validationService<Omit<MovieUpdateType, "thumbnail">>(
        MovieValidation.UPDATE,
        {
          ...req.body,
          price: req.body.price ? Number(req.body.price) : undefined,
          available: req.body.available
            ? Boolean(req.body.available)
            : undefined,
          genreId: req.body.genreId ? Number(req.body.genreId) : undefined,
          seats: req.body.seats ? Number(req.body.seats) : undefined,
        }
      );

      // base url
      const baseUrl = `${req.protocol}://${req.get("host")}`;

      // generate
      const url_thumbnail = req.file
        ? generateUrl(baseUrl, "thumbnails", req.file?.filename)
        : undefined;

      // get service
      const response = await MovieService.update(+id, {
        ...body.data,
        thumbnail: req.file?.filename,
        url_thumbnail: url_thumbnail,
      });

      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil update movie",
        data: response,
      });
    } catch (error) {
      // delete file request
      if (req.file) {
        await FileService.deleteFileRequest(req.file.path);
      }

      // next error
      next(error);
    }
  }

  // update seats booked
  static async updateSeatsBooked(
    req: Request<{ id: string }, {}, { seatsBooked: number[]; times: string }>,
    res: Response<ResponseType<MovieResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get request
      const seatsBooked = req.body.seatsBooked;

      // get booked
      const booked = await MovieService.checkBookedWithMovieId(
        +req.params.id,
        req.body.times
      );

      // get movie
      const movie = await MovieService.readDetail(+req.params.id);

      // cek movie
      if (!movie) {
        return res.status(404).json({
          status: "failed",
          message: "movie not found",
          data: null,
        });
      }

      // cek booked
      if (!booked) {
        return res.status(404).json({
          status: "failed",
          message: "booked not found",
          data: null,
        });
      }

      // cek isi seats
      for (const seat of seatsBooked) {
        if (seat > movie.seats) {
          return res.status(400).json({
            status: "failed",
            message: "seat tidak valid",
            data: null,
          });
        }
      }

      // cek ketersediaan seat
      if (booked.seatsBooked.length >= movie.seats) {
        return res.status(400).json({
          status: "failed",
          message: "seat sudah penuh",
          data: null,
        });
      }

      // console
      console.log(booked.seatsBooked);

      // cek seats
      for (const seat of seatsBooked) {
        if (booked.seatsBooked.includes(seat)) {
          return res.status(400).json({
            status: "failed",
            message: "seat already booked",
            data: null,
          });
        }
      }

      // get service
      const response = await MovieService.seatBooked(+req.params.id, {
        seatsBooked: [...movie.seatsBooked.flat(), ...seatsBooked],
        times: req.body.times,
      });

      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil update movie",
        data: response,
      });
    } catch (error) {
      // next error
      next(error);
    }
  }

  // check booked
  static async checkBooked(
    _req: Request,
    res: Response<ResponseType<BookedResponseType[] | null>>,
    next: NextFunction
  ) {
    try {
      // get service
      const response = await MovieService.checkBooked();

      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil membaca movie",
        data: response,
      });
    } catch (error) {
      // next error
      next(error);
    }
  }

  // // delete
  static async delete(
    req: Request<{ id: string }>,
    res: Response<ResponseType<MovieResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get id
      const id = req.params.id;

      // get service
      const response = await MovieService.delete(+id);

      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil menghapus movie",
        data: response,
      });
    } catch (error) {
      // next error
      next(error);
    }
  }
}
