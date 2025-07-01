import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchpapers } from '@/redux/PaperSlice';
import { useSelector } from 'react-redux';
import PaperCard from './PaperCard';
import { useLocation } from 'react-router-dom';

const TrendingPapers = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { loading, error, paper,status } = useSelector((state) => state.Papers);
    useEffect(() => {
        if(location.pathname === "/" && paper?.length === 0 && status === "idle"){
           dispatch(fetchpapers());
        }
    }, [dispatch, location.pathname, paper?.length, status]);


    return (
        <section class="py-16  bg-[#F9FAFB]">
            <div class="max-w-6xl mx-auto px-4">
                <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">📄 Recently Uploaded</h2>
                {
                    loading ? (
                        <div class="grid grid-cols-1 mt-10 p-2 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                            {Array.from({ length: 6 }).map((_, index) => {
                                return (
                                    <div key={index} className="p-4  bg-white rounded-xl shadow animate-pulse">
                                        <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                                        <div className="h-8 bg-gray-300 rounded w-24"></div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : paper?.length > 0 ? (
                        <div class="grid grid-cols-1   p-2 mt-10 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                            {
                                paper?.map((paper) => {
                                    return (
                                        <PaperCard key={paper?._id} title={paper?.title} stream={paper?.stream} year={paper?.year} fileUrl={paper?.fileUrl} university={paper?.university} />
                                    )
                                })
                            }
                        </div>
                    ) : error ? (
                        <p class="text-center text-gray-600">{error}</p>
                    ):(
                        <p class="text-center text-gray-600">No Papers Found</p>
                    )
                }

            </div>
        </section>

    );
}

export default TrendingPapers