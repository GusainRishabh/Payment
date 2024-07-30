import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './reg.css';
import Otp from './otp';

const Account = () => {
  const [userInfo, setUserInfo] = useState({ Plan: '' });
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();
  const planInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('plan.json')
      .then(response => response.json())
      .then(data => {
        setUserInfo(data[0]);
        setValue('t3', data[0].Plan);
      })
      .catch(error => console.error('Error fetching user info:', error));
  }, [setValue]);

  useEffect(() => {
    if (userInfo.Plan) {
      planInputRef.current.focus();
    }
  }, [userInfo.Plan]);

  const generateOTP = (length) => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  };

  const onSubmit = async (data) => {
    const newOtp = generateOTP(6);
    setOtp(newOtp);
    const dataWithOtp = { ...data, t8: newOtp };

    try {
      const response = await fetch('http://localhost:3000/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithOtp),
      });
      const resText = await response.text();
      console.log(dataWithOtp, resText);
      if (resText === 'success') {
        toast.success('Register Successful!');
        setShowOTP(true);
        navigate('/otp');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="body">
      <ToastContainer />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mb-6 md:grid-cols-2 ml-[65px] mt-[20px] w-[90%]">
            <div>
              <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
              <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Company Name" {...register('t1')} />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
              <input type="number" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" {...register('t2')} />
            </div>
            <div>
              <label htmlFor="plan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Plan</label>
              <input
                type="text"
                id="plan"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Plan"readOnly value={userInfo.Plan} {...register('t3')}ref={planInputRef}
              />
            </div>
            <div>
              <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Website URL</label>
              <input type="text" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Website URL" {...register('t4')} />
            </div>
            <div>
              <label htmlFor="companyId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Id</label>
              <input type="text" id="companyId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Company Id" {...register('t5')} />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
            <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="@company.com" {...register('t6')} />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" {...register('t7')} />
          </div>
          <div className="mb-6">
            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
            <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" />
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
            </div>
            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Account;
