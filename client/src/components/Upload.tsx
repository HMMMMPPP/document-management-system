import React, { useCallback } from 'react';
import { UploadCloud } from 'lucide-react';
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
        <div className="group relative">
            <input
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                id="file-upload"
            />
            <div className="p-10 border-2 border-dashed border-blue-200 rounded-xl text-center bg-blue-50/30 group-hover:bg-blue-50/80 group-hover:border-blue-400 transition-all duration-300">
                <div className="bg-white p-4 rounded-full shadow-sm w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <UploadCloud className="w-8 h-8 text-blue-500" />
                </div>
                <label htmlFor="file-upload" className="block cursor-pointer">
                    <span className="block text-lg font-semibold text-gray-700 mb-1 group-hover:text-blue-600 transition-colors">Click to upload</span>
                    <span className="block text-sm text-gray-500">or drag and drop</span>
                </label>
            </div>
        </div>
    );
};

export default Upload;
