'use client'
import React, { useEffect, useState } from 'react'
import "./RegisterStyles/register.css"
import { TRegisterProps } from '@/app/Application/Types/AllTypes'
import { useRouter } from 'next/navigation'



function Register() {
  const routeTo = useRouter()
    const [submitForm , setSubmitForm] = useState<TRegisterProps>({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone_number: '',
        address: ''
    })
    const [ isSubmiting , setIsSubmiting ] = useState(false)

    const [confirm_password, setConfirmPassword] = useState<string>('')
    const [errorPassword, setErrorPassword] = useState<string>('')
    const [errorEmail, setErrorEmail] = useState<string>('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setErrorPassword("")
        setErrorEmail("")
        setIsSubmiting(true)

        await new Promise(resolve => setTimeout(resolve, 1000))

        const hasUppercase = /[A-Z]/.test(submitForm.password);
        const hasLowercase = /[a-z]/.test(submitForm.password);
        const hasNumber = /[0-9]/.test(submitForm.password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(submitForm.password);
      
        if (!hasUppercase) {
          setIsSubmiting(false)
          setErrorPassword( "Password must include at least one uppercase letter.");
          return
        }
        if (!hasLowercase) {
          setIsSubmiting(false)
          setErrorPassword( "Password must include at least one lowercase letter.");
          return
        }
        if (!hasNumber) {
          setIsSubmiting(false)
          setErrorPassword( "Password must include at least one number.");
          return
        }
        if (!hasSpecialChar) {
          setIsSubmiting(false)
          setErrorPassword( "Password must include at least one special character.");
          return
        }

        const registerData: TRegisterProps = {
            first_name: submitForm.first_name,
            last_name: submitForm.last_name,
            email: submitForm.email,
            password: submitForm.password,
            phone_number: submitForm.phone_number,
            address: submitForm.address,
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
                    setErrorEmail(errorMessages)
                }
                return
            }
        
            // Store the token in localStorage
            if (data.token) {
                localStorage.setItem('token', data.token)
            }
            alert("Registration successful!")
            routeTo.push('/Application/Organisms/Auth/LoginPage')
        } catch (error) {
            console.error("Error during registration:", error)
            alert("An error occurred. Please try again later.")
        }
        finally {
            await new Promise(resolve => setTimeout(resolve, 500))
            setIsSubmiting(false)
        }
    }

    return (
        <div className="register-container-landscape">
        <div className="register-card-landscape">
          <div className="register-image-container-landscape">
            <img src="/img/cutepuppy.gif" alt="Running Corgi" className="register-image-landscape" />
          </div>
          <div className="register-form-container-landscape">
            <h1 className="register-title-landscape">Create your account</h1>
            <form onSubmit={handleSubmit} className="register-form-landscape">
              <div className="form-grid-landscape">
                <div className="form-group-landscape">
                  <label htmlFor="first_name" className="form-label-landscape">First name</label>
                  <input id="first_name" type="text" placeholder="Enter First Name" value={submitForm.first_name} onChange={(e) => setSubmitForm((prev) => 
                  ({...prev , first_name: e.target.value}))} className="form-input-landscape" required />
                </div>
                <div className="form-group-landscape">
                  <label htmlFor="last_name" className="form-label-landscape">Last name</label>
                  <input id="last_name" type="text" placeholder="Enter Last Name" value={submitForm.last_name} onChange={(e) => setSubmitForm((prev) => 
                  ({...prev , last_name: e.target.value}))} className="form-input-landscape" required />
                </div>
                <div className="form-group-landscape">
                  <label htmlFor="phone_number" className="form-label-landscape">Phone Number</label>
                  <input id="phone_number" type="text" placeholder="Enter Phone Number" maxLength={11} value={submitForm.phone_number} onChange={(e) => setSubmitForm((prev) => 
                  ({...prev, phone_number: e.target.value}))} className="form-input-landscape" required />
                </div>
                <div className="form-group-landscape">
                  <label htmlFor="address" className="form-label-landscape">Address</label>
                  <input id="address" type="text" placeholder="Enter Address" list="addressList" value={submitForm.address} onChange={(e) => setSubmitForm((prev) => 
                  ({...prev, address: e.target.value}))} className="form-input-landscape" required />
                  <datalist id="addressList">
                    <option value="Alcantara, Cebu">Alcantara, Cebu</option>
                            <option value="Alcoy, Cebu">Alcoy, Cebu</option>
                            <option value="Alegria, Cebu">Alegria, Cebu</option>
                            <option value="Argao, Cebu">Argao, Cebu</option>
                            <option value="Asturias, Cebu">Asturias, Cebu</option>
                            <option value="Badian, Cebu">Badian, Cebu</option>
                            <option value="Balamban, Cebu">Balamban, Cebu</option>
                            <option value="Bantayan, Cebu">Bantayan, Cebu</option>
                            <option value="Barili, Cebu">Barili, Cebu</option>
                            <option value="Bogo, Cebu">Bogo, Cebu</option>
                            <option value="Boljoon, Cebu">Boljoon, Cebu</option>
                            <option value="Borbon, Cebu">Borbon, Cebu</option>
                            <option value="Carcar, Cebu">Carcar, Cebu</option>
                            <option value="Carmen, Cebu">Carmen, Cebu</option>
                            <option value="Catmon, Cebu">Catmon, Cebu</option>
                            <option value="Cebu City, Cebu">Cebu City, Cebu</option>
                            <option value="Compostela, Cebu">Compostela, Cebu</option>
                            <option value="Consolacion, Cebu">Consolacion, Cebu</option>
                            <option value="Cordova, Cebu">Cordova, Cebu</option>
                            <option value="Dalaguete, Cebu">Dalaguete, Cebu</option>
                            <option value="Danao, Cebu">Danao, Cebu</option>
                            <option value="Dumanjug, Cebu">Dumanjug, Cebu</option>
                            <option value="Ginatilan, Cebu">Ginatilan, Cebu</option>
                            <option value="Liloan, Cebu">Liloan, Cebu</option>
                            <option value="Lapu-Lapu, City">Lapu-Lapu, City</option>
                            <option value="Madridejos, Cebu">Madridejos, Cebu</option>
                            <option value="Mandaue, Cebu City">Mandaue, Cebu City</option>
                            <option value="Minglanilla, Cebu">Minglanilla, Cebu</option>
                            <option value="Moalboal, Cebu">Moalboal, Cebu</option>
                            <option value="Oslob, Cebu">Oslob, Cebu</option>
                            <option value="Pilar, Cebu">Pilar, Cebu</option>
                            <option value="Pinamungahan, Cebu">Pinamungahan, Cebu</option>
                            <option value="Poro, Cebu">Poro, Cebu</option>
                            <option value="Ronda, Cebu">Ronda, Cebu</option>
                            <option value="San Fernando, Cebu">San Fernando, Cebu</option>
                            <option value="San Francisco, Cebu">San Francisco, Cebu</option>
                            <option value="San Remigio, Cebu">San Remigio, Cebu</option>
                            <option value="Santa Fe, Cebu">Santa Fe, Cebu</option>
                            <option value="Santander, Cebu">Santander, Cebu</option>
                            <option value="Sibonga, Cebu">Sibonga, Cebu</option>
                            <option value="Sogod, Cebu">Sogod, Cebu</option>
                            <option value="Tabogon, Cebu">Tabogon, Cebu</option>
                            <option value="Tabuelan, Cebu">Tabuelan, Cebu</option>
                            <option value="Talisay, Cebu">Talisay, Cebu</option>
                            <option value="Toledo, Cebu">Toledo, Cebu</option>
                            <option value="Tuburan, Cebu">Tuburan, Cebu</option>
                            <option value="Tudela, Cebu">Tudela, Cebu</option>
                            <option value="Tugbong, Cebu">Tugbong, Cebu</option>
                            <option value="Ulat, Cebu">Ulat, Cebu</option>
                            <option value="Umas, Cebu">Umas, Cebu</option>
                            <option value="Ubay, Cebu">Ubay, Cebu</option>
                            <option value="Valencia, Cebu">Valencia, Cebu</option>
                            <option value="Valladolid, Cebu">Valladolid, Cebu</option>
                            <option value="Zambujal, Cebu">Zambujal, Cebu</option>
                  </datalist>
                </div>
                <div className="form-group-landscape email-group">
                  <label htmlFor="email" className="form-label-landscape">Email</label>
                  <input id="email" type="email" placeholder="Enter your Email" value={submitForm.email} onChange={(e) => setSubmitForm((prev) => 
                  ({...prev, email: e.target.value}))} className="form-input-landscape" required />
                {errorEmail && <p className="error-message-landscape">{errorEmail}</p>}
                </div>
                <div className="form-group-landscape">
                  <label htmlFor="password" className="form-label-landscape">Password</label>
                  <input id="password" type="password" placeholder="Enter your Password" value={submitForm.password} onChange={(e) => setSubmitForm((prev) => 
                  ({...prev, password: e.target.value}))} className="form-input-landscape" required />
                  {errorPassword && <p className="error-message-landscape">{errorPassword}</p>}
                </div>
                {/* <div className="form-group-landscape">
                  <label htmlFor="confirm_password" className="form-label-landscape">Confirm Password</label>
                  <input id="confirm_password" type="password" placeholder="Enter Confirmation Password" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} className="form-input-landscape" />
                </div> */}
              </div>
              {/* {errorPassword && <p className="error-message-landscape">{errorPassword}</p>} */}
              <div><button type="submit" className="register-button-landscape">
                  {isSubmiting ?  <span className="loader"></span>  :"Register" }
              </button></div>
              <div className="login-link-container-landscape">
                <label><a href="/Application/Organisms/Auth/LoginPage" className="login-link-landscape">Already have an account? Login here</a></label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

export default Register
