import { Router } from 'express';
import { generateUploadUrl, listFileVersions } from '../services/s3';

const router = Router();

router.post('/upload-url', async (req, res) => {
    try {
        const { fileName, contentType } = req.body;
        if (!fileName || !contentType) {
            return res.status(400).json({ error: 'Missing fileName or contentType' });
        }
        const url = await generateUploadUrl(fileName, contentType);
        res.json({ url });
    } catch (error) {
        console.error('Error generating upload URL:', error);
        res.status(500).json({ error: 'Failed to generate upload URL' });
    }
});

router.get('/versions', async (req, res) => {
    try {
        const { prefix } = req.query;
        const versions = await listFileVersions(prefix as string);
        res.json({ versions });
    } catch (error) {
        console.error('Error listing versions:', error);
        res.status(500).json({ error: 'Failed to list versions' });
    }
});

export default router;
