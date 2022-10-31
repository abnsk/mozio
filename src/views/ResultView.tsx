import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CalculateDistance } from '../api/Api';
import { DistanceResultObject } from "../api/Types";

function ResultView() {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [result, setResult] = useState<Array<DistanceResultObject>>([]);
    const [hasError, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const citylist = searchParams.get("route");

    useEffect(() => {
        if (citylist != null) {
            CalculateDistance(citylist.split(","))
                .then(distances => {
                    setLoading(false);
                    setResult(distances);
                }).catch(err => {
                    setLoading(false);
                    setError(true);
                    setErrorMessage(err);
                });
        }
    }, [])

    const formatDistance = (val: number) => {
        if (val >= 1000) {
            return Math.round(val / 1000.0) + " km"
        } else if (val >= 100) {
            return Math.round(val) + " m"
        } else {
            return val.toFixed(1) + " m"
        }
    };

    return (
        <div className="resultView">
            <h1>Trip Distance Calculator</h1>
            {isLoading && <div className="lds-dual-ring"></div>}
            {
                hasError &&
                <>
                    An Error Occured:
                    <pre>{errorMessage}</pre>
                    <button className="btn-blue" onClick={() => navigate(-1)}>Go Back</button>
                </>
            }
            {
                !hasError && !isLoading &&
                <>
                    <div className="resultRow">
                        <div className="resultCell">
                            <span>Trip Date:</span>
                            <span>{searchParams.get("date")}</span>
                        </div>
                        <div className="resultCell">
                            <span>Passengers:</span>
                            <span>{searchParams.get("passengers")}</span>
                        </div>
                    </div>

                    {result.map((r: any, i: number) =>
                        <div key={r.origin + r.destination + i} className="resultRow">
                            <div className="resultCell">
                                <span>From:</span>
                                <span>{r.origin}</span>
                            </div>
                            <div className="resultCell">
                                <span>To:</span>
                                <span>{r.destination}</span>
                            </div>
                            <div className="resultCell">
                                <span>Distance:</span>
                                <span>{formatDistance(r.distance)}</span>
                            </div>
                        </div>

                    )}
                    <div className="resultSum">
                        <div className="resultCell">
                            <span>Total:</span>
                            <span data-test="total-value">{formatDistance(result.reduce((sum: number, elem) => sum + elem.distance, 0))}</span>
                        </div>
                    </div>
                </>
            }
        </div >
    )
}

export default ResultView