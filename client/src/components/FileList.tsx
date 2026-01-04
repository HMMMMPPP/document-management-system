import React, { useEffect, useState } from 'react';
import { getFileVersions } from '../services/api';

interface Version {
    Key: string;
    VersionId: string;
    LastModified: string;
    Size: number;
}

interface FileListProps {
    refreshTrigger: number;
}

const FileList: React.FC<FileListProps> = ({ refreshTrigger }) => {
    const [versions, setVersions] = useState<Version[]>([]);

    useEffect(() => {
        const fetchVersions = async () => {
            try {
                const data = await getFileVersions();
                setVersions(data || []);
            } catch (error) {
                console.error('Failed to fetch versions', error);
            }
        };
        fetchVersions();
    }, [refreshTrigger]);

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">File Versions</h2>
            {versions.length === 0 ? (
                <p className="text-gray-500">No files uploaded yet.</p>
            ) : (
                <ul className="space-y-4">
                    {versions.map((v) => (
                        <li key={v.VersionId} className="p-4 bg-white shadow-sm rounded-lg border border-gray-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-semibold text-lg text-gray-900">{v.Key}</div>
                                    <div className="text-xs text-gray-500 mt-1 font-mono">ID: {v.VersionId}</div>
                                </div>
                                <div className="text-right text-sm text-gray-600">
                                    <div>{new Date(v.LastModified).toLocaleString()}</div>
                                    <div>{(v.Size / 1024).toFixed(2)} KB</div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FileList;
