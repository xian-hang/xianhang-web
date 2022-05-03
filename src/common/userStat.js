const UNVER = 0
const VER = 1
const DEAC = 2
const RESTRT = 3

function userStatToString(status) {
    if (status === UNVER) {
        return "Unverified"
    } else if (status === VER) {
        return "Verified"
    } else if (status === DEAC) {
        return "Deactivated"
    } else if (status === RESTRT) {
        return "Restricted"
    }
}

export { UNVER, VER, DEAC, RESTRT, userStatToString };