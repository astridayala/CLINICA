'use client'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'
import { FaHeartbeat } from 'react-icons/fa'

const links = [
    { name: 'MediCloud', icon: FaHeartbeat, href: '/admin', isProfile: true },
]

export default function NavLinksAdmin() {
    const { pathname } = useLocation()
    const [adminName, setAdminName] = useState('Admin');

    useEffect(() => {
        const userStr = localStorage.getItem('currentUser');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                setAdminName(user.name || 'Admin');
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
                const isActive = pathname === link.href

                return (
                    <Link
                        key={link.name}
                        to={link.href}
                        className={clsx(
                            'flex h-[45px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-semibold transition md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-[#1D6BAC] text-white': isActive,
                                'bg-gray-50 hover:bg-sky-100 hover:text-[#1D6BAC]': !isActive,
                            }
                        )}
                    >
                        <LinkIcon className="text-[16px]" />
                        
                        <p className="hidden md:block">
                            {isProfileLink ? `Admin. ${adminName}` : link.name}
                        </p>
                    </Link>
                )
            })}
        </>
    )
}