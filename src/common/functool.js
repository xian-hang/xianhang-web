
import Cookies from 'js-cookie';

function setUserId(id) {
    Cookies.set("userId", id)
}

function rmUserId() {
    Cookies.remove("userId")
}

function getUserId() {
    return Cookies.get("userId")
}

export { setUserId, rmUserId, getUserId };