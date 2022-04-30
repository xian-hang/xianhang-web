import axios from "axios";
import { RES_NOT_FOUND } from "./common/statCode";

class Api {
    async get(path) {
        try {
            const res  = await axios.get(path)
            return res
        } catch(err) {
            return null;
        }
    }

    async post(path, data) {
        try {
            const res = await axios.post(path, data)
            res.status = res.data.code
            return res
        } catch (err) {
            if (err.message.search("404")) {
                return {status : RES_NOT_FOUND}
            }
            return null;
        }
    }

    async verifyEmail(token) {
        const res = await this.get(`/user/${token}/verify/`)
        return res
    }

    async resentEmail(studentId) {
        const res = await this.post(`/user/resent/`, {studentId})
        return res
    }
}

const api = new Api()
export default api;