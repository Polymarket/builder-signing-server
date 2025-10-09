import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { BuilderSigner } from '@polymarket/builder-signing-sdk';

import { SignRequest } from "./types";


export function createApp(signer: BuilderSigner, authorizationToken?: string): Express {
    const app = express();

    // Middleware
    app.use(helmet({crossOriginResourcePolicy: { policy: 'cross-origin' }}));
    app.use(cors());
    app.use(express.json({ limit: '1mb' }));

    // Authentication middleware
    app.use((req: Request, res: Response, next: NextFunction) => {
        // If app doesn not have an authorization token, skip
        if (!authorizationToken) {
            return next();
        }

        // If app has authorization token, validate request token
        const requestToken = req.headers.authorization;
        
        if (!requestToken) {
            return res.status(401).json({ error: 'Authorization token required' });
        }

        // Remove 'Bearer ' prefix if present
        const token = requestToken.startsWith('Bearer ') 
            ? requestToken.slice(7) 
            : requestToken;

        if (token !== authorizationToken) {
            return res.status(401).json({ error: 'Invalid authorization token' });
        }

        next();
    });

    // Routes
    /**
     * Health endpoint
     */
    app.get('/', (_req: Request, res: Response) => {
        res.status(200).json({"data": 'OK'});
    });

    /**
    * POST /sign
    * Request body JSON: { path: string, method: string, body: string }
    */
    app.post('/sign', (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = SignRequest.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ error: 'Invalid request', details: parsed.error });
            }
            const { path, method, body } = parsed.data;
            
            const payload = signer.createBuilderHeaderPayload(method, path, body);

            return res.status(200).json(payload);
        } catch (err) {
            next(err);
        }
    });

    // Not found
    app.use((req: Request, res: Response) => {
        res.status(404).json({ error: 'Not Found', path: req.path });
    });


    // Error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        const status = err?.status || err?.statusCode || 500;
        res.status(status).json({ error: 'Internal Server Error'});
    });

    return app;
}