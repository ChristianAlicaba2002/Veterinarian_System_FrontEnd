'use client'
import React, { useState } from 'react'
import "./RegisterStyles/register.css"

type RegisterProps = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone_number: string;
    address: string;
    notes?: string;
}

function Register() {
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (confirm_password !== password) {
            setErrorMessage("Passwords do not match")
            return
        }

        if (!first_name || !last_name || !phone_number || !address || !email || !password) {
            setErrorMessage("All fields are required")
            return
        }

        const registerData: RegisterProps = {
            first_name,
            last_name,
            email,
            password,
            phone_number,
            address,
            notes: 'New client registration' 
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(registerData),
            })

            const data = await response.json()

            if (!response.ok) {
                
                if (data.errors) {
                    const errorMessages = Object.values(data.errors).flat().join('\n')
                    setErrorMessage(errorMessages)
                } else {
                    setErrorMessage(data.message || 'Registration failed. Please try again.')
                }
                return
            }

            // Store the token in localStorage
            if (data.token) {
                localStorage.setItem('token', data.token)
            }

            console.log("Registration success:", data)
            alert("Registration successful!")
            window.location.href = '/Application/Organisms/Auth/LoginPage'
        } catch (error) {
            console.error("Error during registration:", error)
            setErrorMessage("An error occurred. Please try again later.")
        }
    }

    return (
        <div>
            <h1>Register page</h1>
            <form onSubmit={handleSubmit}>
                <div className="container-form">
                    <label htmlFor="first_name">First name</label>
                    <input
                        id="first_name"
                        type="text"
                        placeholder="Enter First Name"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label htmlFor="last_name">Last name</label>
                    <input
                        id="last_name"
                        type="text"
                        placeholder="Enter Last Name"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <label htmlFor="phone_number">Phone Number</label>
                    <input
                        id="phone_number"
                        type="text"
                        placeholder="Enter Phone Number"
                        maxLength={11}
                        value={phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <label htmlFor="address">Address</label>
                    <input
                        id="address"
                        type="text"
                        placeholder="Enter Address"
                        list="addressList"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <datalist id="addressList">
                        <option value="Alcantara, Cebu">Alcantara, Cebu</option>
                        <option value="Alcoy, Cebu">Alcoy, Cebu</option>
                        <option value="Alegria, Cebu">Alegria, Cebu</option>
                        {/* other address options */}
                    </datalist>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input
                        id="confirm_password"
                        type="password"
                        placeholder="Enter Confirmation Password"
                        value={confirm_password}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <div>
                        <label>
                            <a href="/Application/Organisms/Auth/LoginPage">Already have an account? Login here</a>
                        </label>
                    </div>
                    <div>
                        <button type="submit">Register</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register
