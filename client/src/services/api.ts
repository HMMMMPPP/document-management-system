import axios from 'axios';

const API_URL = 'http://localhost:3000/api/files';

export const getUploadUrl = async (fileName: string, contentType: string) => {
    const response = await axios.post(`${API_URL}/upload-url`, { fileName, contentType });
    return response.data.url;
};

export const getFileVersions = async (prefix?: string) => {
    const response = await axios.get(`${API_URL}/versions`, { params: { prefix } });
    return response.data.versions;
};

export const uploadFileToS3 = async (url: string, file: File) => {
    await axios.put(url, file, {
        headers: {
            'Content-Type': file.type
        }
    });
};
