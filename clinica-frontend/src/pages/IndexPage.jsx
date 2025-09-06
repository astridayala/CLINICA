import React from 'react'
import { FaCaretDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Calendar from '../components/Calendar'

const IndexPage = () => {
  return (
    <div className='flex flex-col h-full px-3 py-3 md:px-2 gap-0.5'>
      <div className='flex-grow rounded-md bg-[#F7F2FA] overflow-auto'>
        <Calendar/>
      </div>
    </div>
  )
}

export default IndexPage