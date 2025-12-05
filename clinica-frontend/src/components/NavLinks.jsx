'use client'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'
import { FaNotesMedical, FaRegCalendar, FaUserMd } from 'react-icons/fa'

const links = [
    { name: 'Perfil', isProfile: true, icon: FaUserMd }, 
    { name: 'Agenda', href: '/agenda', icon: FaRegCalendar },
    { name: 'Historiales Clínicos', href: '/clinicalNotes', icon: FaNotesMedical }
]

export default function NavLinks() {
    const { pathname } = useLocation()
    const [userName, setUserName] = useState('Doctor'); 

    useEffect(() => {
        const userStr = localStorage.getItem('currentUser');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                setUserName(user.name || 'Bienvenido');
            } catch (e) {
                console.error("Error al leer usuario", e);
            }
        }
    }, []);

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon
                
                const isProfileLink = link.isProfile === true;
                const isActive = link.href ? pathname === link.href : false;

                return (
                    <Link
                        key={link.name}
                        to={link.href || '#'} 
                        className={clsx(
                            'flex h-[45px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-semibold transition md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-[#1D6BAC] text-white cursor-default': isProfileLink,

                                'bg-[#a2ceee] text-[#1D6BAC]': isActive && !isProfileLink,

                                'bg-[#F7F2FA]': !isActive && !isProfileLink,

                                'hover:bg-[#c3def4] hover:text-[#1D6BAC]': !isProfileLink,
                            }
                        )}
                    >
                        <LinkIcon className="text-[16px]" />
                        
                        <p className="hidden md:block">
                            {isProfileLink ? `Dr. ${userName}` : link.name}
                        </p>
                    </Link>
                )
            })}
        </>
    )
}