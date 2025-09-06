'use client'
import React from 'react'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'
import { FaNotesMedical, FaRegCalendar, FaHeartbeat } from 'react-icons/fa'

const links = [
    { name: 'Clínica Dental Ayala', icon: FaHeartbeat },
    { name: 'Agenda', href: 'agenda', icon: FaRegCalendar },
    { name: 'Historiales Clínicos', href: 'clinicalNotes', icon: FaNotesMedical }
]

export default function NavLinks() {
    const { pathname } = useLocation()

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon
                const isAyala = link.name === 'Clínica Dental Ayala'
                const isActive = pathname === link.href

                return (
                    <Link
                        key={link.name}
                        to={link.href}
                        className={clsx(
                            'flex h-[45px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-semibold transition md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                // Estilo permanente para "Clínica Dental Ayala"
                                'bg-[#1D6BAC] text-[#fff]': isAyala,

                                // Estilo para link activo (si no es Ayala)
                                'bg-[#a2ceee] text-[#1D6BAC]': isActive && !isAyala,

                                // Fondo por defecto para otros
                                'bg-[#F7F2FA]': !isActive && !isAyala,

                                // Hover SOLO si NO es Ayala
                                'hover:bg-[#c3def4] hover:text-[#1D6BAC]': !isAyala,
                            }
                        )}
                    >
                        <LinkIcon className="text-[16px]" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                )
            })}
        </>
    )
}
