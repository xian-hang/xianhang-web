import "./SignIn.css"
import "./App.css"
import { useState } from "react"
import api from "./api"
import { setUserId } from "./common/functool"
import FormMessage  from "./components/FormMessage"
import { useNavigate } from 'react-router-dom'
import { RES_OK } from "./common/statCode"

function SignIn() {
    let navigate = useNavigate()
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [err, setError] = useState(null)

    const login = async (e) => {
        e.preventDefault()
        setError(null)

        const res = await api.login(id, password)
        console.log(res)
        if (res.status === RES_OK) {
            if (res.data.role === 1) {
                console.log("Succesfull!")
                setUserId(res.data.id)
                window.location.reload(false);
            } else {
                const r = await api.logout()
                setError("User is not an admin.")
            }
        } else {
            setError("Invalid admin Id or password.")
        }

    }

    return (
        <>
            <div className="sign-in-layout">
                <div className="sign-in-col-one">
                    <div className="sign-in-intro">
                        <div className="sign-in-logo">
                            Xian Hang
                        </div>
                        <hr className="sign-in-logo-hr"/>
                        <div className="sign-in-desc">
                            E-Commerce Platform for Student in BeiHang Univeristy
                        </div>
                    </div>
                </div>
                <div className="sign-in-col-two">
                    <form className="form login-form" onSubmit={login}> 
                        <h1>Admin Login</h1>
                        <hr />

                        <div className="form-content">
                            <FormMessage message={err} />

                            <div className="form-label">
                                Admin Id : 
                            </div>
                            <input
                                className="form-field"
                                placeholder="Admin Id"
                                onChange={e => setId(e.target.value)}
                                required/>
                            
                            <div className="form-label">
                                Password : 
                            </div>
                            <input
                                type="password"
                                className="form-field"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                                required />
                            
                            <div className="align-center-div">
                                <button className="form-submit-button" onSubmit={login}>
                                    Submit
                                </button>
                            </div>
                            
                        </div>
                    </form>
                </div>
                
            </div>
        </>
    )
}

export default SignIn