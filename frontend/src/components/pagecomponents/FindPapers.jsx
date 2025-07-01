import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchpapers } from '@/redux/PaperSlice';
import PaperCard from './PaperCard';


const FindPapers = () => {
    const [search, setSearch] = useState("");
    const [selecteduniversity, setSelectedUniversity] = useState([]);
    const [filterpapers, setFilterPapers] = useState([]);
    const dispatch = useDispatch();
    const { paper, loading, error, status } = useSelector((state) => state.Papers);


    // console.log("paper",paper);
    // trigger fetch papers
    useEffect(() => {
        if (paper?.length === 0 && status !== "succeeded") {
            dispatch(fetchpapers());
        }
    }, [paper?.length, dispatch, status]);
    // 
    useEffect(()=>{
        if(status === "succeeded"){
            setFilterPapers(paper)
        }
    },[status,paper])
    // handle filtering 
    useEffect(()=>{
        let filtered = paper;
        // university filter
        if(selecteduniversity.length > 0){
            filtered = filtered.filter((paper)=> selecteduniversity.includes(paper.university));
        }
        // search filter
        if(search.trim !== ""){
            filtered = filtered.filter((paper)=> paper.title.toLowerCase().includes(search.toLowerCase()));
        }
        setFilterPapers(filtered);
    },[selecteduniversity,search,paper])
    const handlefilterpapers = (e)=>{
        const value = e.target.value;
        setSelectedUniversity((prev)=>{
           return prev.includes(value) ? prev.filter((item)=> item !== value) :[...prev,value]
        })
    }
    return (
        <div>
            <Navbar />
            {/* search bar */}
            <div className='w-full p-2 flex justify-end items-center'>
                <input
                    className="border w-full md:w-[400px] border-neutral-300  p-3 h-full rounded-full px-4 outline-none focus:border-gray-500 dark:bg-neutral-900 dark:border-neutral-500 dark:focus:border-gray-500 dark:text-neutral-300"
                    type="search"
                    placeholder="Search"
                    required
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />

            </div>

            <div className='flex flex-col md:flex-row min-h-screen  gap-1 sm:p-5 p-2 sm:gap-10 '>
                {/* <!-- left side --> */}
                <div className='left md:w-[30%] w-full sm:p-5 p-2' >
                    <p className="font-bold text-[1.4rem]">Filter Papers</p>
                    <hr className="mt-2" />

                    {/* filter papers */}
                    <div className="rounded-md  pl-5 py-3 mt-3 text-black">
                        <p className="mb-3 text-[1.2rem] font-bold">University</p>
                        {["pu", "ptu", "Chandigarh University", "Aktu", "Lovely Professional University"].map((university) => (
                            <p key={university} className="flex gap-2">
                                <input value={university} onChange={handlefilterpapers} type="checkbox" className="mt-1" />
                                <span>{university}</span>
                            </p>
                        ))}
                    </div>
                </div>
                {/* <!-- right side --> */}
                <div className='right md:w-[70%] p-3 w-full '>
                    {
                        loading ? (
                             <div class="grid grid-cols-1 mt-10 p-2 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                                {
                                    Array.from({length:6}).map((_,index)=>{
                                        return (
                                        <div key={index} className="p-4  bg-white rounded-xl shadow animate-pulse">
                                        <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                                        <div className="h-8 bg-gray-300 rounded w-24"></div>
                                        </div>
                                        )
                                    })
                                }
                             </div>
                        ) :filterpapers?.length > 0 ? (
                            <div class="grid grid-cols-1   p-2 mt-10 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                                {
                                    filterpapers?.map((paper) => {
                                        return (
                                            <PaperCard key={paper?._id} title={paper?.title} stream={paper?.stream} year={paper?.year} fileUrl={paper?.fileUrl} university={paper?.university} />
                                        )
                                    })
                                }
                            </div>

                        ) : error ? (
                              <p class="text-center text-gray-600">{error}</p>
                        ):(
                             <div className='flex mx-auto mt-10 justify-center items-center'>
                                <p class="text-center text-gray-600">No Papers Found</p>
                             </div>
                        )
                    }

                </div>
            </div>


        </div>
    )
}

export default FindPapers
