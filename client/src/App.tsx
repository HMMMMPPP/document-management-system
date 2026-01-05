import { useState } from 'react';
import { LayoutDashboard, Settings } from 'lucide-react';
import Upload from './components/Upload';
import FileList from './components/FileList';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center">
      <div className="min-h-screen backdrop-blur-3xl bg-white/60">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <header className="mb-12 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                DocSecure
              </h1>
              <p className="text-gray-600 mt-1 font-medium">Enterprise Document Management</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 shadow-lg flex items-center justify-center text-white">
                <LayoutDashboard size={20} />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 sticky top-8">
                <h2 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
                  Upload File
                </h2>
                <Upload onUploadSuccess={handleUploadSuccess} />
                <div className="mt-6 text-sm text-gray-500 bg-blue-50/50 p-4 rounded-lg border border-blue-100/50">
                  <p>Files are securely stored in S3 with version control enabled.</p>
                </div>
              </div>
            </section>

            <section className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 overflow-hidden min-h-[500px]">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800">Recent Files</h2>
                </div>
                <FileList refreshTrigger={refreshTrigger} />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
