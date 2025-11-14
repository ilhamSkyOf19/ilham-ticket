import { NextFunction, Request, Response } from "express";
import {
  TheaterCreateType,
  TheaterResponseType,
  TheaterUpdateType,
  TheaterWithMovieResponseType,
} from "../models/theater-model";
import { TheaterService } from "../services/thater.service";
import { ResponseType } from "../types/request-response-type";
import validationService from "../services/validation.service";
import { TheaterValidation } from "../validations/theater-validation";
import { generateUrl } from "../helpers/helper";
import { FileService } from "../services/file.service";

export class TheaterController {
  // create
  static async create(
    req: Request<{}, {}, TheaterCreateType>,
    res: Response<ResponseType<TheaterResponseType | null>>,
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

      // get body
      const body = validationService<TheaterCreateType>(
        TheaterValidation.CREATE,
        req.body
      );

      // base url
      const base = `${req.protocol}://${req.get("host")}`;

      // generate
      const url_img = generateUrl(base, "theaters", req.file?.filename);

      // get service
      const response = await TheaterService.create({
        ...body.data,
        img: req.file?.filename,
        url_img: url_img,
      });

      // return
      return res.status(201).json({
        status: "success",
        message: "berhasil membuat theater",
        data: response,
      });
    } catch (error) {
      // delete file
      if (req.file) {
        await FileService.deleteFileRequest(req.file.path);
      }

      // next error
      next(error);
    }
  }

  // read theater with movie

  // read
  static async read(
    _: Request,
    res: Response<ResponseType<TheaterResponseType[] | null>>,
    next: NextFunction
  ) {
    try {
      // get genre
      const response = await TheaterService.read();

      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil membaca theater",
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
    res: Response<ResponseType<TheaterResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get id params
      const id = req.params.id;

      // get genre
      const response = await TheaterService.readDetail(+id);

      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil membaca theater",
        data: response,
      });
    } catch (error) {
      // next error
      next(error);
    }
  }

  // update
  static async update(
    req: Request<{ id: string }, {}, TheaterUpdateType>,
    res: Response<ResponseType<TheaterResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get params
      const id = req.params.id;

      // get body
      const body = validationService<TheaterUpdateType>(
        TheaterValidation.UPDATE,
        req.body
      );

      // get theater
      const theater = await TheaterService.readDetail(+id);

      // base url
      const baseUrl = `${req.protocol}://${req.get("host")}`;

      // generate
      const url_img = generateUrl(baseUrl, "theaters", req.file?.filename);

      // get service
      const response = await TheaterService.update(+id, {
        ...body.data,
        img: req.file?.filename,
        url_img: req.file ? url_img : undefined,
      });

      // delete file
      if (req.file) {
        await FileService.deleteFIleFormPath("theaters", theater?.img || "");
      }

      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil memperbarui theater",
        data: response,
      });
    } catch (error) {
      // delete file
      if (req.file) {
        await FileService.deleteFileRequest(req.file.path);
      }

      // next error
      next(error);
    }
  }

  // delete
  static async delete(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      // get params
      const id = req.params.id;

      // get service
      await TheaterService.delete(+id);

      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil menghapus theater",
        data: null,
      });
    } catch (error) {
      // next error
      next(error);
    }
  }

  //   read
  static async readTheatersWithMovie(
    req: Request<{ id: string }>,
    res: Response<ResponseType<TheaterWithMovieResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get service
      const response = await TheaterService.readTheatersWithMovie(
        +req.params.id
      );

      //   return
      return res.status(200).json({
        status: "success",
        message: "berhasil membaca theater",
        data: response,
      });
    } catch (error) {
      // next
      next(error);
    }
  }
}
