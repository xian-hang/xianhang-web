import "./ResentEmail.css"
import "./App.css"
import { useState } from "react"
import api from "./api"
import { RES_BAD_REQUEST, RES_NOT_FOUND, RES_OK } from "./common/statCode"

function ResentEmail() {
    const [studentId, setStudentId] = useState("")
    const [err, setError] = useState(null)
    const [sent,setSent] = useState(false)

    const resentEmail = async (e) => {
        e.preventDefault()
        setError(null)
        setSent(false)
        console.log(studentId.length)

        if (studentId.length === 0) {
            setError("Please enter your student Id.")
            return
        }

        const res = await api.resentEmail(studentId)
        if (res.status === RES_NOT_FOUND) {
            console.log("Not found")
            setError("Student Id is not registered yet !")
        } else if (res.status === RES_BAD_REQUEST) {
            console.log("Bad Request")
            setError("Email is verified !")
        } else if (res.status === RES_OK) {
            console.log("Okok")
            setSent(true)
        }
    }

    function Message() {
        if (err) {
            return (
                <>
                    <div className="form-err">
                        {err}
                    </div>
                </>
            )
        }

        if (sent) {
            return (
                <>
                    <div className="form-succ">
                        Email Sent ! Please check your email !
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <div>
                <form className="form" onSubmit={resentEmail}>
                    <h1>Resent Verification Email</h1>
                    <hr />
                    <div className="form-content">
                        <Message />

                        <div className="form-label">
                            Enter your student Id :
                        </div>
                        <input
                            className="form-field"
                            placeholder="student Id"
                            onChange={event => setStudentId(event.target.value)}
                            required />
                            
                        <div className="align-center-div">
                            <button onSubmit={resentEmail} type='submit' className='form-submit-button'>Submit</button>
                            </div>
                    </div>
                </form>
            </div>
            
        </>
    )
}

export default ResentEmail;