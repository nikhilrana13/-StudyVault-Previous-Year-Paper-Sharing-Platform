import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, DeleteIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { fetchpapers } from '@/redux/PaperSlice';


const PendingPapers = () => {
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false)
    const [pendingpapers, setpendingpapers] = useState([]);


    useEffect(() => {
        const fetchpapers = async () => {
            try {
                setloading(true)
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/papers/getallpapers`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`

                    }, withCredentials: true
                });
                if (response.data) {
                    setpendingpapers(response.data.paper)
                }
            } catch (error) {
                console.log("failed to fetch papers", error);

            } finally {
                setTimeout(() => {
                    setloading(false)
                }, 2000);
            }
        }
        fetchpapers();
    }, [])

    const HandleUpdateStatus = async(id,status)=>{
         try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/papers/approvepaper/${id}`,
                {
                    updatestatus:status
                },{
                headers:{
                    authorization:`Bearer ${localStorage.getItem("token")}`

                },withCredentials:true,
              
            });
            if(response.data){
                toast.success(response?.data?.message || "Status updated successfully")
                dispatch(fetchpapers());
                const updatedpapers = pendingpapers.map((paperItem)=>paperItem._id === id ? {...paperItem,status:status}:paperItem);
                setpendingpapers(updatedpapers);
            }
         } catch (error) {
            console.log("failed to update status",error);
            toast.error(error?.response?.data?.message || "failed to update status");
         }

    }
    return (
        <div class="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 class="text-2xl font-semibold mt-5 mb-6">Pending papers</h2>
            {loading ? (
                <Loader2 className="dark:text-neutral-400 cursor-pointer mx-auto animate-spin hover:bg-[#F2F2F2]  rounded-md" />
            ) : pendingpapers?.length > 0 ? (
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200 text-sm">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="px-4 py-2 text-left font-medium text-gray-700">Sr. No</th>
                                <th class="px-4 py-2 text-left font-medium text-gray-700">Title</th>
                                <th class="px-4 py-2 text-left font-medium text-gray-700">Upload Date</th>
                                <th class="px-4 py-2 text-left font-medium text-gray-700">Update Status</th>
                                <th class="px-4 py-2 text-left font-medium text-gray-700">Download</th>

                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            {pendingpapers?.map((paper, index) => {
                                return (
                                    <tr key={paper._id}>
                                        <td class="px-4 py-2">{index + 1}</td>
                                        <td class="px-4 py-2">{paper.title}</td>
                                        <td class="px-4 py-2">{new Date(paper.createdAt).toLocaleDateString("en-GB")}</td>
                                        <td class="px-4 py-2">
                                            <select  className='px-4 py-2' value={paper.status}  onChange={(e)=>HandleUpdateStatus(paper._id,e.target.value)} >
                                                <option value="pending" className="text-[#7E7E81]" selected={paper.status === "pending"}>Pending</option>
                                                <option value="approved" className="text-green-600" selected={paper.status === "approved"}>Approved</option>
                                                <option value="rejected" className="text-red-600" selected={paper.status === "rejected"}>Rejected</option>
                                            </select>
                                        </td>
                                        <td class="px-4 py-2">
                                            {paper.fileUrl && <a href={paper.fileUrl.replace("/upload/", `/upload/fl_attachment:${paper.title}`)} target='_blank' rel="noopener noreferrer" download className=' p-2 rounded-md bg-black text-white hover:bg-[#F2F2F2] hover:text-black'>Download</a>}
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            ) : (
                <p className='text-center mt-10 text-[#7E7E81] text-[1.2rem]'>No papers found</p>
            )
            }

        </div>
    );
}

export default PendingPapers;
