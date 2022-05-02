const ALL = null
const PEN = 0
const APP = 1
const REJ = 2

function statusToString(status) {
    if (status === PEN) {
        return "Pending"
    }
    if (status === APP) {
        return "Approved"
    }
    if (status === REJ) {
        return "Rejected"
    }
}

export { ALL, PEN, APP, REJ, statusToString };