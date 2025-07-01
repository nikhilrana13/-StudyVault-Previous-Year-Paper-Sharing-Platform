import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Uploadpaper = () => {
    const [loading,setloading] = useState(false);
    const {register,handleSubmit,reset,formState:{errors}}=useForm()

    const onSubmit = async(data)=>{
        const formdata = new FormData();
        formdata.append("title",data.title);
        formdata.append("subject",data.subject);
        formdata.append("university",data.university);
        formdata.append("stream",data.stream);
        formdata.append("year",data.year);
        formdata.append("paper",data.paper[0]);

        try {
            setloading(true)
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/papers/uploadpaper`,formdata,{
                headers:{
                    authorization:`Bearer ${localStorage.getItem("token")}`,
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            })
            if(response.data){
                toast.success(response?.data?.message || "Paper uploaded successfully")
                reset();
            }
        } catch (error) {
            console.log("failed to upload paper",error);
            toast.error(error?.response?.data?.message || "failed to upload paper");
        }finally{
            setTimeout(() => {
                setloading(false)
            }, 1000);
        }
    }
  return (    
  <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
     <NavLink to="/"><button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">Back</button></NavLink>
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Paper</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Paper Title */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Paper Title</label>
          <input
            type="text"
            placeholder="Enter paper title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title",{required:true})}
          />
        </div>
        {errors.title && <span className="text-red-500">Title is required</span>}

        {/* Subject */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Subject</label>
          <input
            type="text"
            placeholder="Enter subject"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("subject",{required:true})}
          />
        </div>
        {errors.subject && <span className="text-red-500">Subject is required</span>}
          {/* University */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">University</label>
          <input
            type="text"
            placeholder="Enter university name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("university",{required:true})}
          />
        </div>
        {errors.university && <span className="text-red-500">University is required</span>}
         {/* Stream */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Stream</label>
          <input
            type="text"
            placeholder="Enter stream name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("stream",{required:true})}
          />
        </div>
        {errors.stream && <span className="text-red-500">Stream is required</span>}

        {/* Year */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Year</label>
          <input
            type="number"
            placeholder="e.g. 2024"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("year",{required:true})}
          />
        </div>
        {errors.year && <span className="text-red-500">Year is required</span>}

        {/* File Upload */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Upload PDF</label>
          <input
            type="file"
            accept=".pdf"
            className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            {...register("paper",{required:true})}
          />
        </div>
        {errors.paper && <span className="text-red-500">Paper is required</span>}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Uploading..." : "Upload Paper"}
          </button>
        </div>
      </form>
    </div>
  );
}


export default Uploadpaper;


