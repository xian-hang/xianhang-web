import { useEffect, useState } from "react";
import api from "./api";
import { RES_OK } from "./common/statCode";
import "./ReportList.css"
import "./App.css"
import { ALL, PEN, APP, REJ, statusToString } from "./common/reportStat.js"
import { Link } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import Button from "./components/Button";

function Home() {
    const [status, setStatus] = useState(ALL)
    const [reportList, setReportList] = useState([])
    const [images, setImages] = useState({})
    const [loading, setLoading] = useState(true)
    
    const selectStatus = async (e, status) => {
        e.preventDefault()
        setStatus(status)
        updateReportList(status)
    }

    const updateReportList = async (status) => {
        setLoading(true)
        console.log(status)
        const res = await api.getReportList(status);
        if (res.status === RES_OK) {
            console.log(res.data.result)
            setReportList([...res.data.result])
            setImages({})
            const r = await Promise.all(
                res.data.result.map(async (item, index) => {
                    console.log(index)
                    if (item.image.length) {
                        console.log(item.image)
                        const res1 = await api.getReportImageUrl(item.image[0])
                        console.log(res1)
                        let newImages = images
                        newImages[index] = res1.data.url
                        setImages(newImages)
                    }
                })
            )
        } else {
            window.location.reload(False)
        }

        
        console.log(images)
        setLoading(false)
    }

    useEffect(() => {
        updateReportList(ALL)
    },[]);

    return (
        <>
            {images.length}
            {images.length && <h1>loaded</h1>}
            <LoadingSpinner loading={loading}/>
            <div className="page-content-div"> 
                <div>
                    <h1 className="content-title-div">Report List</h1>
                </div>

                <div className="status-list-div">
                    {/* <hr width="0" size="45" className="vertical-hr"/> */}
                    <Button
                        className={status === ALL ? "status-list-button active" : "status-list-button"}
                        onClick={(e) => selectStatus(e,ALL)}>
                        All
                    </Button> 
                    <hr width="0" size="45" className="vertical-hr"/>
                    <Button
                        className={status === PEN ? "status-list-button active" : "status-list-button"}
                        onClick={(e) => selectStatus(e,PEN)}>
                        Pending
                    </Button> 
                    <hr width="0" size="45" className="vertical-hr"/>
                    <Button
                        className={status === APP ? "status-list-button active" : "status-list-button"}
                        onClick={(e) => selectStatus(e,APP)}>
                        Approved
                    </Button> 
                    <hr width="0" size="45" className="vertical-hr"/>
                    <Button
                        className={status === REJ ? "status-list-button active" : "status-list-button"}
                        onClick={(e) => selectStatus(e,REJ)}>
                        Rejected
                    </Button>
                    {/* <hr width="0" size="45" className="vertical-hr"/> */}
                </div>


                <div>
                    {reportList.map((item, index) => (
                        <div key={index} className="report-list-div">
                            <Link to={`/report/${item.report.id}`} className="report-list-link">
                                <div className="report-list-element-div">
                                    <div className="report-list-element-left-col">
                                        <div className="report-list-image-div">
                                            <img src={images[index]} className="report-list-image"/>
                                        </div>
                                    </div>
                                    <div className="report-list-element-mid-col">
                                        <div className="report-user">
                                            REPORTING : {item.report.reportingUsername}
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