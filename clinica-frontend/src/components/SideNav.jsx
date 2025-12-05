import React from 'react'
import NavLinks from './NavLinks'
import { FaPowerOff } from 'react-icons/fa';

export default function SideNav({ onSignOut }) {
  return (
    <div className='flex h-full flex-col px-3 py-3 md:px-2 '>
        <div className='mb-2 flex items-center justify-center rounded-md bg-[#F7F2FA] p-4 md:h-40'>
            <img 
                className='md:w-40'
                src="/logo-mediCloud.png" 
                alt="Logo Clinica" 
                />
        </div>
        <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
            <NavLinks />
            <div className='hidden h-auto w-full grow rounded-md bg-[#F7F2FA] md:block'></div>
            <button onClick={onSignOut} className="flex text-sm transition h-[45px] w-full grow items-center justify-center gap-2 rounded-md bg-[#1d6bac] p-3 font-semibold hover:bg-[#2c88cb] md:flex-none md:justify-start md:p-2 md:px-3">
                <FaPowerOff className="text-[16px]" />
                <p className="hidden md:block">Sign Out</p>
            </button>
        </div>
    </div>
  )
}
