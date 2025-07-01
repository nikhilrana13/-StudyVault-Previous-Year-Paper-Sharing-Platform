import React from 'react';

const PaperCard = ({ title, stream, year, fileUrl,university }) => {
  return (
      <div className="p-4 bg-white rounded-xl shadow hover:shadow-md transition">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-500">{stream} • {year}</p>
      <p className="text-sm text-gray-500">{university}</p>
    <a
      href={fileUrl}
      download
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-block text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
    >
      Download
    </a>
  </div>
  );
}

export default PaperCard;
