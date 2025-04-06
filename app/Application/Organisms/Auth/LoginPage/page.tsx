'use client'
import React, { useEffect, useState } from 'react'
import "./LoginStyles/Login.css"
import { useRouter } from 'next/navigation'

type LoginProps = {
    email: string;
    password: string;
}

function Login() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            router.push('/Application/Organisms/Layouts')
            router.refresh() // Force a refresh of the navigation
        }
    }, [router])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!email || !password) {
            setErrorMessage("All fields are required")
            return
        }

        const loginData: LoginProps = {
            email,
            password
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(loginData),
            })

            const data = await response.json()

            //Check the RESPONSE if is not OK
            if (!response.ok) {
                if (data.errors) {
                    const errorMessages = Object.values(data.errors).join('\n')
                    setErrorMessage(errorMessages)
                } else {
                    setErrorMessage(data.message || 'Login failed. Please check your credentials.')
                }
                return
            }

            if (data.token) {
                // Set the User token in the localStorage and cookie
                localStorage.setItem('token', data.token)
                document.cookie = `token=${data.token}; path=/; max-age=86400; secure; samesite=strict`
                
                // The Data of the user also pass in the localStorage
                localStorage.setItem('user', JSON.stringify(data.data))
                
                // Replace the current history entry and redirect
                router.replace('/Application/Organisms/Layouts')
                router.refresh() // Force a refresh of the navigation
            }

            console.log("Login success:", data)
          
        } catch (error) {
            console.error("Error during login:", error)
            setErrorMessage("An error occurred. Please try again later.")
        }
    }

    return (
        <div className="">
            <div className="">
                <div>
                    <h1 className="">Login to Your Account</h1>
                </div>
                <form onSubmit={handleSubmit} className="">
                    <div className="">
                        <div>
                            <label htmlFor="email" className="">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className=""
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                className=""
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {errorMessage && (
                        <div className="text-red-500 text-sm">
                            {errorMessage}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className=""
                        >
                            Sign in
                        </button>
                    </div>

                    <div className="">
                        <a 
                            href="/Application/Organisms/Auth/RegisterPage" 
                            className=""
                        >
                            Don't have an account? Register here
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
