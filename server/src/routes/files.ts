import { Router } from 'express';
import { generateUploadUrl, listFileVersions } from '../services/s3';
import { authenticate } from '../middleware/auth';
import { validate, uploadUrlSchema, listVersionsSchema } from '../middleware/validation';

const router = Router();

// Apply authentication to all routes
router.use(authenticate);

router.post('/upload-url', validate(uploadUrlSchema), async (req, res) => {
    try {
        const { fileName, contentType } = req.body;
        // Validation handled by middleware, so we can assume valid input here or just keep it robust
        const url = await generateUploadUrl(fileName, contentType);
        res.json({ url });
    } catch (error) {
        console.error('Error generating upload URL:', error);
        res.status(500).json({ error: 'Failed to generate upload URL' });
    }
});

router.get('/versions', validate(listVersionsSchema), async (req, res) => {
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
