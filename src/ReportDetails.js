import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "./api";
import { RES_OK } from "./common/statCode";
import LoadingSpinner from "./components/LoadingSpinner";
import "./ReportDetails.css"
import Dialog from "./components/Dialog";
import Button from "./components/Button";
import { APP, PEN, REJ, statusToString } from "./common/reportStat";
import { DEAC, RESTRT, userStatToString, VER } from "./common/userStat";
import FormMessage from "./components/FormMessage";

function ReportDetails() {
    const { id } = useParams()
    const [report, setReport] = useState(null)
    const [reporting, setReporting] = useState(null)
    const [reportedBy, setReportedBy] = useState(null)
    const [images, setImages] = useState(null)
    const [approve, setApprove] = useState(false)
    const [reject, setReject] = useState(false)
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState(null)
    const [deduct, setDeduct] = useState(null)
    const [err, setErr] = useState(null)
    const [clickImage, setClickImage] = useState(false)
    var notice = ""

    const getReport = async () => {
        console.log(id)
        const res = await api.getReport(id);
        if (res.status === RES_OK) {
            setReport(res.data.report)
            setReporting(res.data.reporting)
            setReportedBy(res.data.user)
            // setImages(res.data.image)

            if (res.data.image.length) {
                const r = await api.getReportImageUrl(res.data.image[0])
                setImages(r.data.url)
            }
        } else {
            window.location.reload(false)
        }
        setLoading(false)
    }

    useEffect(() => {
        getReport()
    }, []);

    const clickApprove = () => {
        setApprove(true)
        setReject(false)
    }

    const clickReject = () => {
        setReject(true) 
        setApprove(false)
    }

    const selectDeduction = (e) => {
        setDeduct(e.target.value)
    }

    const selectStatus = (e) => {
        setStatus(e.target.value)
    }

    const submitApprove = async () => {
        setLoading(true)
        setErr(null)

        if (!parseInt(deduct) && !parseInt(status)) {
            setErr("At least select a penalty on rating or status.")
            setApprove(true)
            setLoading(false)
            return
        }
        
        if (parseInt(deduct)) {
            const res = await api.editUserRating(reporting.id, reporting.rating-deduct)
            notice += `User's rating is deducted by ${deduct}.`
        }
        if (parseInt(status)) {
            const res = await api.editUserStatus(reporting.id, parseInt(status))
            notice += `User is ${userStatToString(parseInt(status)).toLowerCase()}.`
            console.log(2)
        }

        const r3 = await api.createReportNotice(report.id, notice)
        const res = await api.editReportStatus(report.id, APP)
        // console.log(res)
        
        setLoading(false)
        window.location.reload(false)
    }

    const submitReject = async () => {
        setLoading(true)
        const res = await api.editReportStatus(report.id, REJ)
        console.log(res)

        const res1 = await api.createReportNotice(report.id, notice)
        console.log(res1)
        setLoading(false)
        window.location.reload(false)
    }

    const UserDetail = ({ user }) => {
        if (user) {
            return (
                <>
                    <h3>Username : </h3> {user.username}
                    <h3>Student Id : </h3> {user.studentId}
                    <h3>Rating : </h3> {user.rating}
                    <h3>Status : </h3> {userStatToString(user.status)}
                </>
            )
        } else if (!loading) {
            return (
                <>
                    <h3>USER NOT FOUND.</h3> 
                </>
            )
        }
    }

    const ReportDetail = () => {
        if (report) {
            return (
                <>
                    <div className="report-detail-left-col" >
                        <div className="report-image-div" onClick={() => setClickImage(true)}>
                            {!loading && <img src={images} className="report-img" />}
                        </div>
                    </div>
                    <div className="report-detail-right-col" >
                        <div className="report-detail-box">
                            <h1>Reporting : </h1>
                            <UserDetail user={reporting}/>
                        </div>
                        <hr size="400" className="report-detail-hr"/>
                        <div className="report-detail-box">
                            <h1>Reported by : </h1>
                            <UserDetail user={reportedBy}/>
                        </div>
                    </div>
                </>
            )
        }
    }

    const ReportDesc = () => {
        if (report) {
            return (
                <>
                    <div className="report-description">
                        <h1>Description</h1>
                        <div className="report-description-text">
                            {report.description}
                        </div>
                    </div>
                </>
            )
        }
    }

    const ReportButton = () => {
        if (report && report.status === PEN) {
            return (
                <>
                    <div className="report-button-container">
                        {reporting &&
                            <div className="report-button-col">
                                <Button className="report-button report-approve-button" onClick={() => clickApprove()}>
                                    Approve
                                </Button>
                            </div>
                        }
                        
                        <div className="report-button-col">
                        <Button className="report-button report-reject-button" onClick={() => clickReject()}>
                            Reject
                        </Button>
                        </div>
                    </div>
                </>
            )
        }
    }

    const ReportStatus = () => {
        if (report && (report.status === APP || report.status === REJ)) {
            return (
                <>
                    <div className={report.status === APP ? "report-detail-status report-app" : "report-detail-status report-rej"}>
                        {statusToString(report.status)} 
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <LoadingSpinner loading={loading} />

            <Dialog show={approve} setShow={setApprove} confirm={() => submitApprove()} >
                <FormMessage message={err}/>
                Please select a penalty : <br />
                    <div className="penalty-radio-selection">
                        <input
                            type="radio"
                            value={0}
                            name="deduct"
                            checked={parseInt(deduct) === 0}
                            onChange={selectDeduction}
                            required />
                        0 marks
                    </div>
                {reporting && reporting.rating >= 5 ?
                    <div className="penalty-radio-selection">
                        <input
                            type="radio"
                            value={5}
                            name="deduct"
                            checked={parseInt(deduct) === 5}
                            onChange={selectDeduction}
                            required />
                        5 marks
                    </div>
                : <></>}
                {reporting && reporting.rating >= 10 ?
                <div className="penalty-radio-selection">
                    <input
                        type="radio"
                        value={10}
                        name="deduct"
                        checked={parseInt(deduct) === 10}
                        onChange={selectDeduction}
                        required />
                    10 marks
                </div>
                : <></>}
                {reporting && reporting.rating >= 20 ?
                <div className="penalty-radio-selection">
                    <input
                        type="radio"
                        value={20}
                        name="deduct"
                        checked={parseInt(deduct) === 20}
                        onChange={selectDeduction}
                        required />
                    20 marks
                </div>
                : <></>}
                {reporting && reporting.rating >= 50 ?
                <div className="penalty-radio-selection">
                    <input
                        type="radio"
                        value={50}
                        name="deduct"
                        checked={parseInt(deduct) === 50}
                        onChange={selectDeduction}
                        required />
                    50 marks
                </div>
                    : <></>}
                
                <br /><br />

                Please select a penalty on user status : <br />
                    <div className="penalty-radio-selection">
                        <input
                            type="radio"
                            value=""
                            name="status"
                            checked={status === ""}
                            onChange={selectStatus}
                            required />
                        None.
                    </div>
                {reporting && reporting.status === VER ?
                    <div className="penalty-radio-selection">
                        <input
                            type="radio"
                            value={RESTRT}
                            name="status"
                            checked={parseInt(status) === RESTRT}
                            onChange={selectStatus}
                            required />
                        Restrict user from selling product.
                    </div>
                : <></>}
                {reporting && reporting.status !== DEAC ?
                    <div className="penalty-radio-selection">
                        <input
                            type="radio"
                            value={DEAC}
                            name="status"
                            checked={parseInt(status) === DEAC}
                            onChange={selectStatus}
                            required />
                        Deactivate user.
                    </div>
                : <></>}
            </Dialog>

            <Dialog show={reject} setShow={setReject} confirm={() => submitReject()} >
                Please provide the reason you rejected :
                <br/><br/>
                <input
                    className="input-reason"
                    maxLength="150"
                    size="30"
                    onChange={(e) => notice = e.target.value}
                    required
                />
            </Dialog>

            {clickImage && images &&
                <>
                    <div className="grey-screen">
                    </div>
                    <div className="report-img-popup-container" onClick={() => setClickImage(false)}>
                        <img src={images} className="report-img-popup"/>
                    </div>
                </>}

            <div className="page-content-div">
                <div className="report-detail-container">
                    <ReportDetail />
                </div>
                <br/>
                <div className="report-description-container">
                    <ReportDesc />
                </div>

                <ReportButton />
                <ReportStatus />
            </div>
        </>
    )
}

export default ReportDetails;