import React from 'react'
import Calendario from '../components/Calendario'

const Agenda = () => {
  return (
    <div className='flex flex-col h-full px-3 py-3 md:px-2 gap-0.5'>
      <div className='flex-grow rounded-md bg-[#F7F2FA] overflow-auto'>
        <Calendario/>
      </div>
    </div>
  )
}

export default Agenda