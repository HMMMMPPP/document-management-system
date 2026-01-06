import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = process.env.API_KEY;

    if (!validApiKey) {
        // Fail open or closed? Closed is safer.
        // But for dev simplicity if not set, maybe warn? 
        // Let's enforce it must be set.
        console.error('API_KEY is not set in environment variables.');
        return res.status(500).json({ error: 'Server misconfigured' });
    }

    if (!apiKey || apiKey !== validApiKey) {
        return res.status(401).json({ error: 'Unauthorized: Invalid or missing API Key' });
    }

    next();
};
