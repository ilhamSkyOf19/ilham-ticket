import { Request, RequestHandler } from "express";
import { existsSync, mkdirSync } from "fs";
import { access, unlink } from "fs/promises";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { ResponseType } from "../types/request-response-type";

export class FileService {
    // upload 
    static upload(pathName: string, name: string): RequestHandler {
        const storage = multer.diskStorage({

            // destination
            destination: function (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {

                // initialize folder uploads
                const upload: string = path.join(__dirname, `../../public/uploads/${pathName}`);


                // cek exists folder
                if (!existsSync(upload)) {
                    // create folder 
                    mkdirSync(upload, {
                        recursive: true
                    })
                }

                // cb
                cb(null, upload);

            },


            // filename
            filename: function (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {

                // generate uniq namepath
                const uniqSuffix: string = `-${Date.now()}-${Math.round(Math.random() * 1E9)}`;

                // callback
                cb(null, file.fieldname + uniqSuffix + path.extname(file.originalname));
            }

        })


        // file filter 
        const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {

            // allow ext
            const allowMimeType: string[] = ['image/jpg', 'image/png', 'image/jpeg'];

            // cek 
            if (allowMimeType.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('Invalid file type'));
            }
        }


        // upload 
        const upload = multer({
            storage,
            fileFilter,
            limits: {
                fileSize: 1024 * 1024 * 2
            }
        }).single(name)


        return upload
    }

    // delete file request 
    static async deleteFileRequest(path: string): Promise<void> {

        try {
            // cek file 
            await access(path);

            // delete
            await unlink(path);
            console.log('file deleted successfully');
        } catch (error) {
            // file not found
            console.log(error);
            console.warn('file not found');
        }
    }


    // delete form path 
    static async deleteFIleFormPath(filePath: string, filename: string): Promise<ResponseType<null>> {
        try {

            // file full path 
            const filePathFull = path.join(__dirname, `../../public/uploads/${filePath}/${filename}`)


            // delete file 
            await this.deleteFileRequest(filePathFull);

            // return 
            return {
                status: 'success',
                message: 'File deleted successfully',
                data: null
            }


        } catch (error) {
            console.log(error)
            return {
                status: 'failed',
                message: 'File not exist',
                data: null
            }

        }
    }

}

