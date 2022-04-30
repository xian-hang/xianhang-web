import { Link } from "react-router-dom";
import "./Nav.css"

function Nav() {
    return (
        <>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo'>
                    XianHang
                </Link>
            </nav>
        </>
    )
}

export default Nav;