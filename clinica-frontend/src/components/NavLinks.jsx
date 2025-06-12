'use client'
import React from 'react'
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom'
import { FaNotesMedical, FaRegCalendar } from 'react-icons/fa';

const links = [
    { name: 'Agenda', href: '/', icon: FaRegCalendar },
    { name: 'Historiales Clínicos', href: '/clinicalNotes', icon: FaNotesMedical }
]

export default function NavLinks() {
    const {pathname} = useLocation()
  return (
    <>
        {links.map((link) => {
            const LinkIcon = link.icon;
            return(
                <Link
                    key={link.name}
                    to={link.href}
                    className={clsx(
                        'flex h-[45px] grow items-center justify-center gap-2 rounded-md bg-[#F7F2FA] p-3 text-sm font-semibold hover:bg-[#D8F3F5] transition hover:text-[#298191] md:flex-none md:justify-start md:p-2 md:px-3',
                        {
                            'bg-[#b6e7eb] text-[#298191]': pathname === link.href,
                        }
                    )}
                >
                    <LinkIcon className='text-[16px]' />
                    <p className="hidden md:block">{link.name}</p>
                </Link>
            )
        })}
    </>
  )
}
