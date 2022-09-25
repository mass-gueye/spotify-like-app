import React from 'react';
import { MdDangerous, MdLocalFlorist,  } from 'react-icons/md';


const Error = ({ message }) => {
  console.log(message)
  return (
    <div className='w-full  h-screen flex flex-col justify-center items-center'>
      <MdDangerous size={50} className='text-white' />
      <h1 className='font-bold text-2xl text-white mt-2'>{message || "Something went wrong please try again."}</h1>
    </div>
  )
};

export default Error;
