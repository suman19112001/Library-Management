import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import FastRewindIcon from "@mui/icons-material/FastRewind";
import HomeIcon from "@mui/icons-material/Home";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import NewspaperIcon from "@mui/icons-material/Newspaper";

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [open, setOpen] = useState(true);
  return (
    <div
    className={`${open ? "w-72" : "w-20"
      } duration-300 h-full  bg-[#342112] relative p-5 pt-8 font-serif`}
  >
    <FastRewindIcon
      onClick={() => setOpen(!open)}
      className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-[#342112] bg-white text-[#342112] ${!open && "rotate-180"
        } `}
    />
    <Link to={"/"}>
      <div className="flex gap-x-4 items-center">
        
        <h1
          className={`text-white font-medium text-3xl origin-left duration-200 ${!open && "scale-0"
            }`}
        >
         BookHub
        </h1>
      </div>
    </Link>
    <ul className="pt-6 ">
      <Link to={"/"}>
        <li
          className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-100 text-xl font-medium items-center gap-3 hover:bg-purple-700 hover:duration-300`}
        >
          <HomeIcon />
          <h1 className={`${!open && "hidden"}`}>Home</h1>
        </li>
      </Link>
      <Link to={"/Books"}>

        <li
          className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-100 text-xl font-medium items-center gap-3 hover:bg-purple-700 hover:duration-300`}
        >
          <CurrencyBitcoinIcon />
          <h1 className={`${!open && "hidden"}`}>Books</h1>
        </li>
      </Link>
      <Link to={"/About"}>
        <li
          className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-100 text-xl font-medium items-center gap-3 hover:bg-purple-700 hover:duration-300`}
        >
          <NewspaperIcon />
          <h1 className={`${!open && "hidden"}`}>About</h1>
        </li>
      </Link>
      
    </ul>
  
        <div className='flex justify-center items-center text-center m-4  text-black  p-2'>

          <ul className='flex justify-center items-center text-center'>
            <li>{isAuthenticated && (
              <div className='flex justify-center items-center gap-4'>
                <img className='w-[30%] h-[30%] rounded-[50%]' src={user.picture} alt={user.name} />
                {/* <h2 className='text-sm'>{user.name}</h2> */}

              </div>
            )} </li>
            {isAuthenticated ? (

              <li> <button className='bg-[#F5F3EF] text-black font-semibold font-mono p-2 rounded-md shadow-xl'   onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
              </button></li>
            ) : (
              <li><button className='bg-[#F5F3EF] text-black font-semibold font-mono p-2 rounded-md shadow-xl' onClick={() => loginWithRedirect()}>Log In</button></li>
            )}
          </ul>
        </div>
      </div>

  
  )
}

export default Navbar