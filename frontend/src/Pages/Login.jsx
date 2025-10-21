
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser,clearError } from "../utilis/authSlice";


const loginschema = z.object({
  emailId: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});


const Login = () => {
  const dispatch = useDispatch();
  const { isauthenticated, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ 
    resolver: zodResolver(loginschema),
    mode: 'onBlur' 
  });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);
  
  useEffect(() => {
    if (isauthenticated) {
      navigate('/');
    }
  }, [isauthenticated, navigate]);


  const onsubmit = (data) => {
    dispatch(loginUser(data));
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <style>
        {`
          /* Fix autofill background color */
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 1000px white inset !important;
            -webkit-text-fill-color: #000000 !important;
            transition: background-color 5000s ease-in-out 0s;
          }
        `}
      </style>

      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-black">Welcome Back</h2>
          
        
          {error && (
            <div className="flex items-center gap-2 p-3 text-sm bg-red-50 border border-red-200 rounded-md">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800">{error}</span>
            </div>
          )}


          <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">
        
            <div>
              <label htmlFor="emailId" className="block text-sm font-medium text-gray-900 mb-1.5">
                Email
              </label>
              <input
                id="emailId"
                type="email"
                {...register("emailId")}
                placeholder="name@example.com"
                aria-invalid={errors.emailId ? "true" : "false"}
                className={`w-full px-4 py-2.5 bg-white text-black border rounded-md focus:outline-none ${
                  errors.emailId 
                    ? "border-red-500 focus:ring-red-200 focus:border-red-500" 
                    : "border-gray-300"
                }`}
              />
              {errors.emailId && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-600">{errors.emailId.message}</p>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
              
              </div>
              <input
                id="password"
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                aria-invalid={errors.password ? "true" : "false"}
                className={`w-full px-4 py-2.5 bg-white text-black border rounded-md focus:outline-none ${
                  errors.password 
                    ? "border-red-500 focus:ring-red-200 focus:border-red-500" 
                    : "border-gray-300"
                }`}
              />
              {errors.password && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className="w-full px-4 py-2.5 mt-2 font-semibold text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Log In'
              )}
            </button>
          </form>


          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to='/signup' className="font-semibold text-black hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};


export default Login;
