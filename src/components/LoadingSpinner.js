import React from "react";
import "./LoadingSpinner.css";

function LoadingSpinner({ loading }) {
    if (loading) {
      return (
          <div className="loading-spinner-div">
            <div className="loading-spinner">
            </div>
          </div>
        );
    } else {
        <>
        </>
    }
}

export default LoadingSpinner;