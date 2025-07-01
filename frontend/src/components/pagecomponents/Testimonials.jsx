import React from 'react';



const Usertestimonials = [
      {
    name: "Rohan Mehta",
    university: "Delhi University",
    feedback: "StudyVault helped me clear my backlogs with ease. Amazing resource!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Singh",
    university: "Mumbai University",
    feedback: "The trending papers section is 🔥! Found exactly what I needed.",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Aman Verma",
    university: "Anna University",
    feedback: "Great initiative! It’s like Google Drive but organized and smart.",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
]


const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">What Students Say 💬</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Usertestimonials.map((item, index) => (
        <div key={index} className="p-6 border border-gray-200 rounded-xl shadow-sm bg-[#F9FAFB]">
          <p className="text-gray-700 italic mb-4">“{item.feedback}”</p>
          <div className="flex items-center gap-3">
            <img
              src={item.avatar}
              alt={item.name}
              loading='lazy'
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-gray-500">{item.university}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}

export default Testimonials;
