import React, { useEffect, useState } from 'react';
import { getFileVersions } from '../services/api';
import { FileText, Download } from 'lucide-react';

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
        <div className="mt-0">
            {versions.length === 0 ? (
                <div className="p-12 text-center">
                    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium">No files uploaded yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                <th className="px-6 py-4">File Name</th>
                                <th className="px-6 py-4">Size</th>
                                <th className="px-6 py-4">Uploaded</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {versions.map((v) => (
                                <tr key={v.VersionId} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">{v.Key}</div>
                                                <div className="text-xs text-gray-400 font-mono hidden md:block" title={v.VersionId}>
                                                    ID: {v.VersionId.substring(0, 8)}...
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                        {(v.Size / 1024).toFixed(2)} KB
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(v.LastModified).toLocaleDateString()}
                                        <span className="block text-xs text-gray-400">{new Date(v.LastModified).toLocaleTimeString()}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center space-x-1">
                                            <span>Download</span>
                                            <Download size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FileList;
