import React from 'react'
<i class="fa-solid fa-magnifying-glass"></i>
import { FaCaretDown, FaChevronLeft, FaChevronRight, FaGlasses, FaSearch, FaPlus } from 'react-icons/fa'

export default function ClinicalNotes() {
  return (
    <div className='flex flex-col h-full px-3 py-3 md:px-2 gap-0.5'>
          <div className='mb-2 flex h-11 items-center justify-between rounded-md p-3'>
            <h2 className='text-xl font-bold'>Historiales Clínicos</h2>
            <div className='flex gap-4 items-center'>
              <button className="flex transition grow items-center justify-center gap-2 rounded-md border-[2px] p-3 text-md font-semibold hover:bg-[#eeeef1] text-[#BBB8C1] md:flex-none md:justify-start md:p-2 md:px-3">
                <div className="hidden md:block text-sm pr-15">Buscar paciente...</div>
                <FaSearch className="text-md" />
              </button>
              <button className="flex transition grow items-center justify-center gap-3 rounded-md p-3 text-md font-semibold hover:bg-[#49bbc7] bg-[#83D6DD] md:flex-none md:justify-start md:p-2 md:px-3">
                <FaPlus className='text-md' />
                <div className="hidden md:block pr-0.5 text-sm">Crear Paciente</div>
              </button>
            </div>
          </div>
          <div className='flex-grow rounded-md bg-[#F7F2FA] overflow-auto p-3'>
            <p className='bg-amber-300'>Agenda bitches</p>
          </div>
        </div>
  )
}