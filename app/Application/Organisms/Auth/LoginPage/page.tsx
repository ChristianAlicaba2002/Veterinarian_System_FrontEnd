'use client'
import React, { useEffect, useState } from 'react'
import "./LoginStyles/Login.css"
import { useRouter } from 'next/navigation'
import { TLoginProps } from '@/app/Application/Types/AllTypes'

function Login() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoggedIn , setIsLoggedIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
        setIsLoggedIn(true)
          
            router.push('/Application/Organisms/Layouts')
            router.refresh()
        }
    }, [router])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoggedIn(false)

        if (!email || !password) {
            setErrorMessage("All fields are required")
            return
        }

        const loginData: TLoginProps = {
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
                router.push('/Application/Organisms/Layouts')
                router.refresh() // Force a refresh of the navigation
            }


            console.log("Login success:", data)
          
        } catch (error) {
            console.error("Error during login:", error)
            setErrorMessage("An error occurred. Please try again later.")
        }
    }

    return (
<div className="login-container">
      <div className="login-card">
        <div className="login-image-container">
          <img src="/img/runningcorgi.gif" alt="Running Corgi" className="login-image" />
        </div>
        <div className="login-form-container">
          <div>
            <h1 className="login-title">Welcome Back!</h1>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div>
              <button type="submit" className="login-button">
                Sign in
              </button>
            </div>

            <div className="register-link-container">
              <a href="/Application/Organisms/Auth/RegisterPage" className="register-link">
                Don't have an account? Register here
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login
