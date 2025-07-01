import React from 'react';

const HowitWorks = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-10">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center">
                        <div className="bg-blue-100 p-4 rounded-full mb-4">
                            <span className="text-blue-600 text-3xl">🔍</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Search</h3>
                        <p className="text-gray-600 text-sm">Find question papers, notes & materials by year, stream, or subject.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-green-100 p-4 rounded-full mb-4">
                            <span className="text-green-600 text-3xl">📥</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Download</h3>
                        <p className="text-gray-600 text-sm">Access materials instantly in PDF format — 100% free & fast.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-yellow-100 p-4 rounded-full mb-4">
                            <span className="text-yellow-600 text-3xl">📤</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Upload</h3>
                        <p className="text-gray-600 text-sm">Contribute your own notes & past papers to help others.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-purple-100 p-4 rounded-full mb-4">
                            <span className="text-purple-600 text-3xl">🔔</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
                        <p className="text-gray-600 text-sm">Get notified when new study material is added to your stream.</p>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default HowitWorks;
