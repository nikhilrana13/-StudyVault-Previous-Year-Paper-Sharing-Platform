import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft,DeleteIcon } from 'lucide-react';
import { toast } from 'sonner';


const Useruploadpapers = () => {
    const [loading,setloading] = useState(false)
    const [Papers,setPapers] = useState([]);
     useEffect(()=>{
          const fetchPapers = async()=>{
            try {
                setloading(true)
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/papers/userpapers`,{headers:{
                    authorization:`Bearer ${localStorage.getItem("token")}`
                },withCredentials:true});
                if(response.data){
                     console.log(response.data);
                    setPapers(response.data.paper);
                   
                }
            } catch (error) {
                console.log("failed to fetch papers",error);
            }finally{
                setTimeout(() => {
                    setloading(false)
                }, 2000);
            }
          }
          fetchPapers();
     },[])
    //  handle delete papers function
    const deletepaper=async(id)=>{
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/papers/deletepaper/${id}`,{headers:{
                authorization:`Bearer ${localStorage.getItem("token")}`
            },withCredentials:true});
            if(response.data){
                toast.success(response?.data?.message || "Paper deleted successfully");
               const filteredPapers = Papers.filter((prevpaper)=>prevpaper._id !== id);
               setPapers(filteredPapers);
            }
        } catch (error) {
            console.log("failed to delete paper",error);
            toast.error(error?.response?.data?.message || "failed to delete paper");
        }
    }
  return (
    <div class="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
    <NavLink to="/">
    <ArrowLeft className="dark:text-neutral-400 hover:bg-[#F2F2F2]  rounded-md" />
    </NavLink>
  <h2 class="text-2xl font-semibold mt-5 mb-6">Your Uploaded papers</h2>
     {loading ? (
          <Loader2 className="dark:text-neutral-400 cursor-pointer mx-auto animate-spin hover:bg-[#F2F2F2]  rounded-md" />
     ):Papers?.length > 0 ? (
         <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left font-medium text-gray-700">Sr. No</th>
          <th class="px-4 py-2 text-left font-medium text-gray-700">Title</th>
          <th class="px-4 py-2 text-left font-medium text-gray-700">Upload Date</th>
          <th class="px-4 py-2 text-left font-medium text-gray-700">Status</th>
          <th class="px-4 py-2 text-left font-medium text-gray-700">Action</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
    {Papers?.map((paper,index)=>{
        return(
        <tr key={paper._id}>
        <td class="px-4 py-2">{index + 1}</td>
        <td class="px-4 py-2">{paper.title}</td>
        <td class="px-4 py-2">{new Date(paper.createdAt).toLocaleDateString("en-GB")}</td>
        {
            paper.status === "pending" ? (
                <td class="px-4 py-2 text-red-600">{paper.status}</td>
            ):paper.status === "approved" ? (
                <td class="px-4 py-2 text-green-600">{paper.status}</td>
            ):(
                <td class="px-4 py-2 text-yellow-600">{paper.status}</td>
            )
        }
        <td class="px-4 py-2">
            <button onClick={()=>deletepaper(paper._id)} class="dark:text-neutral-400 hover:bg-[#F2F2F2]  rounded-md">
                <DeleteIcon />
            </button>
        </td>
        </tr>
            )
        })}
       
      </tbody>
    </table>
   </div>
):(
        <p className='text-center mt-10 text-[#7E7E81] text-[1.2rem]'>No papers found</p>
     )
     }
     
</div>
  
  )
}

export default Useruploadpapers;
