/* eslint-disable no-empty */
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Notiflix from "notiflix";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirect, setRedirect] = useState('');
  

  async function registerUser(ev){
    ev.preventDefault();

    if (password !== confirmPassword) {
      Notiflix.Notify.warning("Passwords do not match");
      //alert('Passwords do not match');
      return;
    }

    try{
      await axios.post('/register', {
        name,
        email,
        password,
        
      });
      Notiflix.Notify.success('User is Registered successfully');
      //alert('Registration Successful')
      setRedirect(true)
    }catch(e){
      Notiflix.Notify.failure("User registration failed");
      //alert('Registration failed')
    }
  }

  if (redirect){
    return <Navigate to={'/login'} />
  }

  return (
    
    <div className ="flex w-full h-full lg:-ml-24 px-10 py-10 justify-between place-items-center mt-12">
      <div className= "hidden lg:flex flex-col right-box ">
        <div className="flex flex-col gap-3">
        <div className="text-3xl font-black">Welcome to</div>

          <div>
            <img src="../src/assets/logo.png" alt="" className="w-48"/>
          </div>  
        </div>

        <div className="ml-48 w-80 mt-6">
        <img src="../src/assets/signuppic.svg" alt="" className='w-full'/>
        </div>   
      
    </div>
    {/* card */}
    <div className="bg-white w-full sm:w-full md:w-1/2 lg:w-1/3 px-7 py-7 rounded-xl shadow-2xl shadow-blue-500 flex justify-center items-center">
    <form className="flex flex-col w-full items-center space-y-6" onSubmit={registerUser}>
        <h1 className="font-extrabold mb-5 text-primarydark text-3xl">Sign Up</h1>

        <div className="flex items-center w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-50 space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-500">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
            </svg>
            <input type="text" placeholder="Name" className="w-full bg-transparent outline-none" value={name} onChange={ev => setName(ev.target.value)} />
        </div>

        <div className="flex items-center w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-50 space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
                <path fillRule="evenodd" d="M17.834 6.166a8.25 8.25 0 100 11.668.75.75 0 011.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0121.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 11-.82-6.26V8.25a.75.75 0 011.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 00-2.416-5.834zM15.75 12a3.75 3.75 0 10-7.5 0 3.75 3.75 0 007.5 0z" clipRule="evenodd" />
            </svg>
            <input type="email" placeholder="Email" className="w-full bg-transparent outline-none" value={email} onChange={ev => setEmail(ev.target.value)} />
        </div>

        <div className="flex items-center w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-50 space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
                <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z" clipRule="evenodd" />
            </svg>
            <input type="password" placeholder="Password" className="w-full bg-transparent outline-none" value={password} onChange={ev => setPassword(ev.target.value)} />
        </div>

        <div className="flex items-center w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-50 space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
                <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z" clipRule="evenodd" />
            </svg>
            <input type="password" placeholder="Confirm password" className="w-full bg-transparent outline-none" value={confirmPassword} onChange={ev => setConfirmPassword(ev.target.value)} />
        </div>

        <div className="w-full py-4">
            <button type="submit" className="primary w-full py-2 rounded-lg text-white font-bold bg-primary hover:bg-primarydark transition duration-300">Create Account</button>
        </div>

        <div className="flex justify-between w-full space-x-2">
            <Link to={'/login'} className="w-full">
                <button className="w-full py-2 text-white bg-black rounded-lg font-bold hover:bg-gray-200 hover:text-black transition duration-300">Sign In</button>
            </Link>
            <Link to={'/register'} className="w-full">
                <button className="w-full py-2 text-white bg-primary rounded-lg font-bold hover:bg-primarydark transition duration-300">Sign Up</button>
            </Link>
        </div>

        <Link to={'/'} className="mt-4">
            <button className="secondary flex items-center justify-center w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2 text-gray-500">
                    <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                </svg>
                Back
            </button>
        </Link>
    </form>
</div>


    
  </div>
  )
}
