import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export function verificarToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({
            message: 'Não há token.',
        });
    };

    try {
        verify(token, process.env.CHAVE_JWT!);

        return next();
    } catch (error: any) {
        return res.status(403).json({
            message: 'Token não é válido.',
        });
    };
};