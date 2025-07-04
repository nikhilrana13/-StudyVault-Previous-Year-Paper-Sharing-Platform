import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { SetUser } from '@/redux/UserSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate()
  const [loading,setloading] = useState(false)
  const {register,handleSubmit,formState:{errors}}=useForm()
  const dispatch = useDispatch();

  const onSubmit = async(data)=>{
         const formdata = {
           email:data.email,
           password:data.password
         }
         try {
          setloading(true)
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,formdata);
          if(response.data){
            if(response.data.user.role === "admin"){
              toast.success(response?.data?.message || "Login successfully")
              localStorage.setItem("token",response?.data?.token);
              dispatch(SetUser(response?.data?.user));
              navigate("/admin")
            }else{
              toast.success(response?.data?.message || "Login successfully")
              localStorage.setItem("token",response?.data?.token);
              dispatch(SetUser(response?.data?.user));
              navigate("/")
            }
          }
         } catch (error) {
          // console.log("failed to login",error);
          toast.error(error?.response?.data?.message || "failed to login");
          setloading(false)
         }
  }
  return (
       <div className='h-screen flex justify-center items-center'>
        <div className='border-2 rounded-md shadow-md w-full sm:max-w-[400px] p-4'>
            <h3>Welcome Back! <br />  
                 <span className="text-gray-500">Please login to your account</span>
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}  action="" className='flex flex-col gap-2 w-full   mt-4'>
                <label className='text-black-500'>Email</label>
                <input type="email" placeholder="Enter your email" className="py-2 px-1 rounded-md border " {...register("email", { required: true })} />
                {errors.email && <div className="text-red-500">This field is required</div>}
                <label className='text-black-500'>Password</label>
                <input type="password" placeholder="Enter your password" className="py-2 px-1 rounded-md  border" {...register("password", { required: true })} />
                {errors.password && <div className="text-red-500">This field is required</div>}
                <div className='flex justify-between mt-2'>
                   <p className='text-gray-500'>Don't have an account?</p>
                   <NavLink to="/signup" className="text-black-500">Sign Up</NavLink>
                </div>
                <button type='submit' className="bg-black hover:bg-gray-700 text-white font-bold py-3 px-4 rounded">
                  {loading ? <Loader2 className="animate-spin mx-auto w-5 h-5 " /> : "Login"}
                </button>
            </form>
        </div>
      
    </div>
  );
}

export default Login;
