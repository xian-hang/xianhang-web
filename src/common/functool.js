
import Cookies from 'js-cookie';

function getRole() {
    return Cookies.get('role');
}

export { getRole };