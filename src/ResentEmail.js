import "./ResentEmail.css"
import "./App.css"
import { useState } from "react"
import api from "./api"
import { RES_BAD_REQUEST, RES_NOT_FOUND, RES_OK } from "./common/statCode"
import FormMessage from "./components/FormMessage"

function ResentEmail() {
    const [studentId, setStudentId] = useState("")
    const [message, setMessage] = useState(null)
    const [sent,setSent] = useState(false)

    const resentEmail = async (e) => {
        e.preventDefault()
        setMessage(null)
        setSent(false)
        console.log(studentId.length)

        if (studentId.length === 0) {
            setMessage("Please enter your student Id.")
            return
        }

        const res = await api.resentEmail(studentId)
        if (res.status === RES_NOT_FOUND) {
            console.log("Not found")
            setMessage("Student Id is not registered yet !")
        } else if (res.status === RES_BAD_REQUEST) {
            console.log("Bad Request")
            setMessage("Email is verified !")
        } else if (res.status === RES_OK) {
            setMessage("Email sent.")
            setSent(true)
        } else {
            setMessage("Oops, something went wrong...")
        }
    }

    return (
        <>
            <div>
                <form className="form" onSubmit={resentEmail}>
                    <h1>Resent Verification Email</h1>
                    <hr />
                    <div className="form-content">
                        <FormMessage message={message} succ={sent} />

                        <div className="form-label">
                            Enter your student Id :
                        </div>
                        <input
                            className="form-field"
                            placeholder="student Id"
                            onChange={e => setStudentId(e.target.value)}
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