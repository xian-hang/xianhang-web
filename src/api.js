import axios from "axios";
import { RES_NOT_FOUND } from "./common/statCode";

const proxy = ""
const entry = window.location.protocol + '//' + window.location.hostname + ':81'

const options = {
    headers: {"content-type": "application/x-www-form-urlencoded"}
}

class Api {
    async get(path) {
        try {
            const res = await axios.get(entry + path, options)
            res.status = res.data.code
            return res
        } catch (err) {
            if (err.message.search("404")) {
                return {status : RES_NOT_FOUND}
            }
            return null;
        }
    }

    async post(path, data) {
        try {
            const res = await axios.post(entry + path, data, options)
            res.status = res.data.code

            console.log(res)
            return res
        } catch (err) {
            if (err.message.search("404")) {
                return {status : RES_NOT_FOUND}
            }
            return null;
        }
    }

    // email api
    async verifyEmail(token) {
        const res = await this.get(`/user/${token}/verify/`)
        return res
    }

    async resentEmail(studentId) {
        const res = await this.post(`/user/resent/`, {studentId})
        return res
    }

    // user api
    async login(studentId, password) {
        const res = await this.post(`/user/login/`, { studentId, password })
        return res
    }

    async logout() {
        const res = await this.post(`/user/logout/`,)
        return res
    }

    async getUser(id) {
        const res = await this.get(`/user/${id}/`)
        return res
    }

    async getUserWithToken(token) {
        const res = await this.get(`/user/token/${token}/`)
        return res
    }

    async editUserStatus(id, status) {
        const res = await this.post(`/user/${id}/edit/status/`, {status})
        return res
    }

    async editUserRating(id, rating) {
        const res = await this.post(`/user/${id}/edit/rating/`, {rating})
        return res
    }

    async resetPassword(key, newPassword) {
        const res = await api.post(`/user/${key}/reset/password/`, { newPassword })
        return res
    }

    // report api
    async getReportList(status=null) {
        if (status !== null) {
            const res = await this.post(`/report/list/`,{status})
            return res
        } else {
            const res = await this.post(`/report/list/`)
            return res
        }
    }

    async getReport(id) {
        const res = await this.get(`/report/${id}/`)
        return res
    }

    async editReportStatus(id,status) {
        const res = await this.post(`/report/${id}/edit/`, { status })
        return res
    }

    // report image api
    async getReportImageUrl(id) {
        const res = await this.get(`/report/image/${id}/url/`)
        return res
    }

    // report notice api
    async createReportNotice(reportId, content) {
        const res = await this.post(`/report/notice/create/`, { reportId, content })
        return res
    }
}

const api = new Api()
export default api;