import React, { useCallback } from 'react';
import { getUploadUrl, uploadFileToS3 } from '../services/api';

interface UploadProps {
    onUploadSuccess: () => void;
}

const Upload: React.FC<UploadProps> = ({ onUploadSuccess }) => {
    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const url = await getUploadUrl(file.name, file.type);
            await uploadFileToS3(url, file);
            alert('Upload successful!');
            onUploadSuccess();
        } catch (error) {
            console.error('Upload failed', error);
            alert('Upload failed');
        }
    }, [onUploadSuccess]);

    return (
        <div className="p-8 border-2 border-dashed border-gray-400 rounded-lg text-center bg-white hover:bg-gray-50 transition-colors">
            <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <span className="text-lg font-medium text-gray-700">Drop files here or click to upload</span>
                <span className="text-sm text-gray-500 mt-2">Supports all file types</span>
            </label>
        </div>
    );
};

export default Upload;
