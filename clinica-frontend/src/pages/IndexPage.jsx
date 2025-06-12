import React from 'react'
import { FaCaretDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const IndexPage = () => {
  return (
    <div className='flex flex-col h-full px-3 py-3 md:px-2 gap-0.5'>
      <div className='mb-2 flex h-11 items-center justify-between rounded-md p-3'>
        <h2 className='text-xl font-bold'>Agenda</h2>
        <div className='flex gap-4 items-center'>
          <h2 className='font-semibold text-md'>Abril 2025</h2>
          <button className="flex transition grow items-center justify-center gap-2 rounded-md border-[2px] p-3 text-md font-semibold hover:bg-[#DAD9DE] md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block text-sm">Semana</div>
            <FaCaretDown className="text-lg" />
          </button>
          <button className="flex transition grow items-center justify-center gap-3 rounded-md border-[2px] p-3 text-md font-semibold hover:bg-[#DAD9DE] md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block pr-3 pl-3 text-sm">Hoy</div>
          </button>
          <div className='flex items-center'>
            <button className="flex transition grow items-center justify-center rounded-md text-md font-semibold hover:bg-[#DAD9DE] md:flex-none md:justify-start md:p-2 md:px-3">
              <FaChevronLeft className='text-sm'/>
            </button>
            <button className="flex transition grow items-center justify-center rounded-md text-md font-semibold hover:bg-[#DAD9DE] md:flex-none md:justify-start md:p-2 md:px-3">
              <FaChevronRight className='text-sm' />
            </button>
          </div>
        </div>
      </div>
      <div className='flex-grow rounded-md bg-[#F7F2FA] overflow-auto p-3'>
        <p className='bg-amber-300'>Agenda bitches</p>
      </div>
    </div>
  )
}

export default IndexPage