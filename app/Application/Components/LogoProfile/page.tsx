'use client'
import React from 'react'
import { logout } from '../../../../utils'
import Link from 'next/link'
import './LogoStyles/LogoProfile.css'

export default function LogoProfile() {
    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            await logout()
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <div className="profile-container">
            <div className="dropdown">
                <button className="dropbtn">
                    <div className="profile-icon-wrapper">
                        <i className="fa-solid fa-user profile-icon"></i>
                        <span className="offline-indicator"></span>
                    </div>
                </button>
                <div className="dropdown-content">
                    <Link href="/Application/Components/UserProfile">
                        <i className="fa-solid fa-user"></i>
                        My Profile
                    </Link>
                    <Link href="/Application/Organisms/Pages/Appointment">
                        <i className="fa-solid fa-calendar-check"></i>
                        Appointment's
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button onClick={handleLogout} className="logout-button">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                            />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}
