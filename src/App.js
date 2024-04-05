import React, { useState, useEffect } from "react";

const CounterApp = () => {
    const [count, setCount] = useState(0);
    const [pageInitReq, setPageInitReq] = useState(true);
    const BACK_END_URL = `http://${window.location.hostname}:5000`;

    useEffect(() => {
        const updater = new EventSource(`${BACK_END_URL}/api/ws`);
        updater.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setCount(data.count);
        };

        return () => {
            updater.close();
        };
    }, []);

    const handleIncrement = () => {
        fetch(`${BACK_END_URL}/api/increment`, {
            method: "POST",
        });
    };

    const handleReset = () => {
        fetch(`${BACK_END_URL}/api/reset`, {
            method: "POST",
        });
    };

    const fetchCount = async () => {
        if (pageInitReq) {
            const response = await fetch(`${BACK_END_URL}/api/fetch`);
            const data = await response.json();
            setCount(data.count);
            setPageInitReq(false);
        }
    };

    useEffect(() => {
        fetchCount();
    }, []);

    return (
        <div
            style={{
                background: "#ccd5ff",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div
                style={{
                    background: "#e7bbe3",
                    padding: "2rem",
                    borderRadius: "0.5rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    width: "300px",
                }}
            >
                <h1
                    style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "#c884a6", 
                        margin: "0",
                    }}
                >
                    Synced Counter
                </h1>
                <p
                    style={{
                        fontSize: "3rem",
                        fontWeight: "bold",
                        color: "#23c9ff", 
                        margin: "1rem 0",
                    }}
                >
                    {count}
                </p>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        alignItems: "center",
                    }}
                >
                    <button
                        style={{
                            background: "#7cc6fe", 
                            color: "#ffffff",
                            border: "none",
                            fontWeight: "bold",
                            padding: "0.75rem 1.5rem",
                            borderRadius: "0.5rem",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                        }}
                        onClick={handleIncrement}
                        onMouseEnter={(e) => (e.target.style.background = "#23c9ff")} 
                        onMouseLeave={(e) => (e.target.style.background = "#7cc6fe")}
                    >
                        Increment
                    </button>
                    <button
                        style={{
                            background: "#c884a6",
                            color: "#ffffff",
                            border: "none",
                            fontWeight: "bold",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.5rem",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                        }}
                        onClick={handleReset}
                        onMouseEnter={(e) => (e.target.style.background = "#e7bbe3")} 
                        onMouseLeave={(e) => (e.target.style.background = "#c884a6")}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CounterApp;
