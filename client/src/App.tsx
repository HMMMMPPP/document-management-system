import { useState } from 'react';
import Upload from './components/Upload';
import FileList from './components/FileList';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Document Management</h1>
          <p className="text-gray-600 mt-2">Secure upload and version control</p>
        </header>

        <main className="space-y-8">
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Upload New File</h2>
            <Upload onUploadSuccess={handleUploadSuccess} />
          </section>

          <section>
            <FileList refreshTrigger={refreshTrigger} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
