import { Link, useNavigate } from "react-router-dom";
import "./Nav.css"
import { getUserId, rmUserId } from '../common/functool';
import api from "../api";
import { RES_OK } from "../common/statCode";
import "../App.css"
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";

function Nav() {
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const goHome = async () => {
        navigate("/")
        window.location.reload(false)
    }

    const logout = async () => {
        setLoading(true)
        const res = await api.logout();
        if (res.status === RES_OK) {
            rmUserId()

            navigate("/")
            window.location.reload(false)
        }
        setLoading(false)
    }

    return (
        <>
            <LoadingSpinner loading={loading} />
            <nav className='navbar'>
                <div className="nav-left-column">
                    <Button className='navbar-logo' onClick={() => goHome()}>
                        XianHang
                    </Button>
                </div>
                <div className="nav-right-column">
                    {getUserId() ?
                        <Button className="button logout-button" onClick={() => logout()}>
                            Logout
                        </Button>
                        : <></>}
                </div>
            </nav>
        </>
    )
}

export default Nav;