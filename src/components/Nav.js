import { Link, useNavigate } from "react-router-dom";
import "./Nav.css"
import { getUserId, rmUserId } from '../common/functool';
import api from "../api";
import { RES_OK } from "../common/statCode";
import "../App.css"

function Nav() {
    let navigate = useNavigate()

    const goHome = async () => {
        navigate("/")
        window.location.reload(false)
    }

    const logout = async () => {
        const res = await api.logout();
        if (res.status === RES_OK) {
            rmUserId()

            navigate("/")
            window.location.reload(false)
        }
    }

    return (
        <>
            <nav className='navbar'>
                <div className="nav-left-column">
                    <button className='navbar-logo' onClick={() => goHome()}>
                        XianHang
                    </button>
                </div>
                <div className="nav-right-column">
                    {getUserId() ?
                        <button className="button logout-button" onClick={() => logout()}>
                            Logout
                        </button>
                        : <></>}
                </div>
            </nav>
        </>
    )
}

export default Nav;