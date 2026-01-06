import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate = (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: 'Validation failed',
                details: (error as z.ZodError).errors
            });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const uploadUrlSchema = z.object({
    body: z.object({
        fileName: z.string().min(1, 'File name is required'),
        contentType: z.string().regex(/^[\w-]+\/[\w-.+]+$/, 'Invalid content type'),
    }),
});

export const listVersionsSchema = z.object({
    query: z.object({
        prefix: z.string().optional(),
    }),
});
