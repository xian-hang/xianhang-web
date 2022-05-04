import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "./api";
import { RES_OK } from "./common/statCode";
import Button from "./components/Button";
import FormMessage from "./components/FormMessage";
import LoadingSpinner from "./components/LoadingSpinner";

function ResetPassword() {
    const { token } = useParams()
    const [user, setUser] = useState(null)
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [message, setMessage] = useState(null) 
    const [loading, setLoading] = useState(true)
    const [succ, setSucc] = useState(false)

    const getUser = async () => {
        setLoading(true)
        const res = await api.getUserWithToken(token)

        if (res.status === RES_OK) {
            setUser(res.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        getUser()
    }, [])

    const submitReset = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (password !== confirm) {
            setMessage("Passwords did not match.")
            setLoading(false)
            return
        }

        const res = await api.resetPassword(token, password);
        if (res.status === RES_OK) {
            setSucc(true)
        }
        setLoading(false)
    }

    return (
        <>
            <LoadingSpinner loading={loading} />
            <div className="page-content-div">
                {user && !succ &&
                    <form className="form" onSubmit={submitReset}>
                        <h1>
                                Resent Password for {user.studentId}
                            </h1>
                            <hr />

                        <div className="form-content">
                            <FormMessage message={message} />
                                    
                            <div className="form-label">
                                Enter new password:
                            </div>
                            <input
                                type="password"
                                className="form-field"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                                minLength={8}
                                required />
                                
                            <div className="form-label">
                                Confirm new password :
                            </div>
                            <input
                                type="password"
                                className="form-field"
                                placeholder="Confirm password"
                                onChange={e => setConfirm(e.target.value)}
                                required />
                                
                            <div className="align-center-div">
                                <Button className="form-submit-button" onSubmit={submitReset}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </form>
                }

                {!loading && !user &&
                    <>
                        <h1>Reset Password</h1>
                        <hr/>
                        <h1>Oops... Something went wrong</h1>
                    </>
                }

                {succ &&
                    <>
                    <div className="form">
                        <h1>
                            Reset Password
                        </h1>
                        <hr />
                        <FormMessage message={"Reset password successfully for " + user.studentId} succ={true} />
                    </div>
                    </>
                }
            </div>
        </>
    )
}

export default ResetPassword;