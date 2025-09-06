import React from 'react'
import { FaAt, FaLock } from 'react-icons/fa'

function LogIn() {
  return (
    <div className='flex items-center justify-center h-screen'>
        <div className='w-1/2 h-2/3 flex rounded-lg border-[#F7F2FA] border-2 shadow-2xl'>
            <div className='w-1/2 h-full flex items-center justify-center'>
                <img className='w-3/4'
                    src="/logo-mediCloud.png" alt="Logo MediCloud" 
                />
            </div>
            <div className='bg-[#F7F2FA] w-1/2 h-full flex items-center justify-center'>
                <form className="w-3/4">
                    <h1 className="text-2xl font-bold text-center mb-8">LOG IN</h1>
                    <div className='flex items-center border-[#BBB8C1] border-2 rounded-md h-11 p-3 mb-5'>
                        <FaAt className='mr-3 text-lg text-[#BBB8C1] font-light'/>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="text-[#817b87] focus:outline-none "
                        />
                    </div>
                    <div className='flex items-center border-[#BBB8C1] border-2 rounded-md h-11 p-3 mb-5'>
                        <FaLock className='mr-3 text-lg text-[#BBB8C1]'/>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="text-[#817b87] focus:outline-none "
                        />
                    </div>
                    <button type="submit" className="bg-[#429BDB] font-semibold flex justify-center w-full rounded-md h-11 p-3 mb-5 hover:bg-">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default LogIn