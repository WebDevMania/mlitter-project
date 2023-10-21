"use client"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { signIn } from 'next-auth/react'
import classes from './login.module.css'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleLogin = async () => {
        if (password === "" || email === "") {
            toast.error("Fill all fields!")
            return
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long!")
            return
        }

        try {
            const res = await signIn("credentials", { email, password, redirect: false })
            console.log(res)
            if (res?.error == null) {
                router.push('/')
            } else {
                toast.error("Error occured while logging in")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.top}>
                    <h3>Login</h3>
                </div>
                <div className={classes.inputs}>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleLogin} className={classes.loginButton}>
                    Login
                </button>
            </div>
            <ToastContainer />
            <span className={classes.registerMessage}>
                Don&apos;t have an account?
                <Link href='/register' className={classes.register}>
                    Register
                </Link>
            </span>
        </div>
    )
}

export default Login