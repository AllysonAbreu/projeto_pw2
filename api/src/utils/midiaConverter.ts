import sharp from "sharp";
import { Readable, Writable } from "stream";
import ffmpeg from 'fluent-ffmpeg';

export class MidiaConverter {
    static async convertImageToBuffer(file: Express.Multer.File): Promise<Buffer> {
        const { buffer } = file;
        const resizeBuffer = await sharp(buffer)
            .resize({ width: 800 })
            .toBuffer();
        return resizeBuffer;
    };

    static async convertVideoToBuffer(file: Express.Multer.File): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const { buffer } = file;
            const readableStream = new Readable();
            readableStream.push(buffer);
            readableStream.push(null);

            const writableStream = new Writable();
            const buffers: Buffer[] = [];

            writableStream._write = (chunk, encoding, next) => {
                buffers.push(chunk);
                next();
            };

            writableStream.on('finish', () => {
                const convertedBuffer = Buffer.concat(buffers);
                resolve(convertedBuffer);
            });

            ffmpeg(readableStream)
            .outputFormat('mp4')
            .outputOptions('-preset veryfast')
            .on('error', (error) => reject(error))
            .pipe(writableStream);
        });
    };

    static convertBufferToImage(buffer: Buffer): string {
        // Converte o buffer em uma representação adequada para enviar ao frontend (por exemplo, base64)
        const base64String = buffer.toString('base64');
        return `data:image/jpeg;base64,${base64String}`;
    };

    static convertBufferToVideo(buffer: Buffer): string {
        // Converte o buffer em uma representação adequada para enviar ao frontend (por exemplo, base64)
        const base64String = buffer.toString('base64');
        return `data:video/mp4;base64,${base64String}`;
    };
};
