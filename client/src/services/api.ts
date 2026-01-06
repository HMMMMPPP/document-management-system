import axios from 'axios';

const API_URL = 'http://localhost:3000/api/files';
const API_KEY = import.meta.env.VITE_API_KEY || 'secret-api-key-123';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
    }
});

export const getUploadUrl = async (fileName: string, contentType: string) => {
    const response = await apiClient.post('/upload-url', { fileName, contentType });
    return response.data.url;
};

export const getFileVersions = async (prefix?: string) => {
    const response = await apiClient.get('/versions', { params: { prefix } });
    return response.data.versions;
};

export const uploadFileToS3 = async (url: string, file: File) => {
    await axios.put(url, file, {
        headers: {
            'Content-Type': file.type
        }
    });
};
