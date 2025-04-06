'use client'
import React, { useEffect, useState } from 'react'
import "./MainStyles/main.css"
import { logout, getUser } from '../../../../../utils'
import LogoProfile from '@/app/Application/Components/LogoProfile/page'


type UserData = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    contact_number: string;
    address: string;
    created_at: string;
    updated_at: string;
}

export default function Main() {
    const [userData, setUserData] = useState<UserData | null>(null)
     const [changeColor, setChangeColor] = useState(() => {
        return localStorage.getItem('profileHeaderColor') || '#3b82f6';
      });

     useEffect(() => {
            const user = getUser()
            if (user) {
                setUserData(user)
            }
        }, [])

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
         <div className="body">
            <header className="header" style={{ backgroundColor: changeColor }}>
                <div className="header-container">
                    <div>
                        <h1 className="title">PawfectCare</h1>
                        {userData && (
                            <p className="welcome-text">
                                Welcome, {userData.first_name} {userData.last_name}
                            </p>
                        )}
                    </div>
                    <LogoProfile />
                </div>
            </header>
            <main>
                <div className="main-content">
                    <div className="content-card">
                    
                    </div>
                </div>
            </main>
        </div>
        </>
    )
}