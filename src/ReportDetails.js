import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ReportDetails() {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)

    const getReport = async () => {
        
    }

    useEffect(() => {
        getReport()
    }, []);

    return (
        <>
            <LoadingSpinner loading={loading}/>
            ReportPage
        </>
    )
}

export default ReportDetails;