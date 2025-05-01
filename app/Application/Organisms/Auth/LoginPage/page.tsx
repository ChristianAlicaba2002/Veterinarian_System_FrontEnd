"use client";
import React, { useEffect, useState } from "react";
import "./LoginStyles/Login.css";
import { useRouter } from "next/navigation";
import { TLoginProps } from "@/app/Application/Types/AllTypes";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [buttonSubmit, setButtonSubmit] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const routeTo = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      routeTo.push("/Application/Organisms/Layouts");
      routeTo.refresh();
      setAccessToken(token);
    }
  }, [routeTo]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setErrorEmail("");
    setErrorPassword("");
    setButtonSubmit(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if(email == "" && password == "")
    {
      setErrorMessage('All fields are required')
      setButtonSubmit(false);
      return;
    }
    if (email == "") {
      setErrorEmail("Username is required");
      setButtonSubmit(false);
      return;
    }
    if (password == "") {
      setErrorPassword("Password is required");
      setButtonSubmit(false);
      return;
    }

    const loginData: TLoginProps = {
      email,
      password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      //Check the RESPONSE if is not OK
      if (!response.ok) {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).join("\n");
          setErrorMessage(errorMessages);
        } else {
          setErrorMessage(
            data.message || "Login failed. Please check your credentials."
          );
        }
        setButtonSubmit(false);
      }

      if (data.token) {
        // Set the User token in the localStorage and cookie
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        document.cookie = `token=${data.token}; path=/; max-age=86400; secure; samesite=strict`;

        // Replace the current history entry and redirect
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setButtonSubmit(false);
        routeTo.push("/Application/Organisms/Layouts");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-image-container">
          <img
            src="/img/runningcorgi.gif"
            alt="Running Corgi"
            className="login-image"
          />
        </div>
        <div className="login-form-container">
          <div>
            <h1 className="login-title">Welcome Back!</h1>
            {errorMessage && (
              <div className="error-message text-center">{errorMessage}</div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
              {errorEmail && (
                <div className="error-message">{errorEmail}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
              {errorPassword && (
                <div className="error-message">{errorPassword}</div>
              )}
            </div>

            <div>
              <button type="submit" className="login-button">
                {buttonSubmit ? <span className="loader"></span> : "Login"}
              </button>
            </div>

            <div className="register-link-container">
              <a
                href="/Application/Organisms/Auth/RegisterPage"
                className="register-link"
              >
                Don't have an account? Register here
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
