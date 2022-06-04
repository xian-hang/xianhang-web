import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./VerifyEmail.css";
import api from "./api";

import { RES_OK } from "./common/statCode";

function VerifyEmail() {
    const { token } = useParams()
    const [ver, setVer] = useState(0)

    const verifyEmail = async () => {
        const res = await api.verifyEmail(token)

        if (res.status === RES_OK) {
            setVer(1)
        } else {
            setVer(2)
        }
    }

    useEffect(() => {
        verifyEmail()
    },[token]);

    function Status() {
        if (ver === 1) {
            return (
                <>
                    <h2>Thanks for verifying !</h2>
                    <div>
                        You can now join us at our XianHang app ! 
                    </div>
                </>
            )
        } else if (ver === 2) {
            return (
                <>
                    <h2>Oops... Something went wrong</h2>
                    <div>
                        Want to resend verification email ? 
                        <Link to="/resent/email/">
                            Click here
                        </Link>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <h2>Loading....</h2>
                </>
            )
        }
    }

    return (
        <>
            <div className="verifyEmail">
                <h1>Verify Email</h1>
                <hr/>
                    <Status />
            </div>
        </>
    );
}

export default VerifyEmail;