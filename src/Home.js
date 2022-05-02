import { useEffect, useState } from "react";
import api from "./api";
import { RES_OK } from "./common/statCode";
import "./Home.css"
import "./App.css"
import { ALL, PEN, APP, REJ, statusToString } from "./common/reportStat.js"
import { Link } from "react-router-dom";

function Home() {
    const [status, setStatus] = useState(ALL)
    const [reportList, setReportList] = useState([])
    
    const selectStatus = async (e, status) => {
        e.preventDefault()
        setStatus(status)
    }

    const initReportList = async () => {
        const res = await api.getReportList();
        if (res.status === RES_OK) {
            console.log(res.data.result)
            setReportList([...res.data.result])
            console.log(reportList)
        }
    }

    const ReportImage = () => {
        return (
            <div className="report-image-div">

            </div>
        )
    }

    useEffect(() => {
        initReportList()
    },[]);

    return (
        <>
            <div className="page-content-div"> 
                <div>
                    <h1 className="content-title-div">Report List</h1>
                </div>

                <div className="status-list-div">
                    {/* <hr width="0" size="45" className="vertical-hr"/> */}
                    <button
                        className={status === ALL ? "status-list-button active" : "status-list-button"}
                        onClick={(e) => selectStatus(e,ALL)}>
                        All
                    </button> 
                    <hr width="0" size="45" className="vertical-hr"/>
                    <button
                        className={status === PEN ? "status-list-button active" : "status-list-button"}
                        onClick={(e) => selectStatus(e,PEN)}>
                        Pending
                    </button> 
                    <hr width="0" size="45" className="vertical-hr"/>
                    <button
                        className={status === APP ? "status-list-button active" : "status-list-button"}
                        onClick={(e) => selectStatus(e,APP)}>
                        Approved
                    </button> 
                    <hr width="0" size="45" className="vertical-hr"/>
                    <button
                        className={status === REJ ? "status-list-button active" : "status-list-button"}
                        onClick={(e) => selectStatus(e,REJ)}>
                        Rejected
                    </button>
                    {/* <hr width="0" size="45" className="vertical-hr"/> */}
                </div>


                <div>
                    {reportList.map((item, index) => (
                        <div key={index} className="report-list-div">
                            <Link to={`/report/${item.report.id}`} className="report-list-link">
                                <div className="report-list-element-div">
                                    <div className="report-list-element-left-col">
                                        <ReportImage />
                                    </div>
                                    <div className="report-list-element-mid-col">
                                        <div className="report-user">
                                            Reported : {item.report.username}
                                        </div>
                                        <div className="report-desc">
                                            {item.report.description}
                                        </div>
                                    </div>
                                    <div className="report-list-element-right-col">
                                        <div className={item.report.status === PEN ? "report-status-div report-pen"
                                            : (item.report.status === APP ? "report-status-div report-app" : "report-status-div report-rej")}>
                                            {statusToString(item.report.status)}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>

        </>
    )
}

export default Home;