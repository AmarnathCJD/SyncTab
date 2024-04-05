import React, { useState, useEffect } from "react";

const CounterApp = () => {
    const [count, setCount] = useState(0);
    var pageInitReq = true;
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
            pageInitReq = false;
        }
    };

    useEffect(() => {
        fetchCount();
    })

    return (
        <div
            style={{
                background: "linear-gradient(to right, #FF416C, #FF4B2B)",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div
                style={{
                    background: "#ffffff",
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
                        color: "#333",
                        margin: "0",
                    }}
                >
                    Synced Counter
                </h1>
                <p
                    style={{
                        fontSize: "3rem",
                        fontWeight: "bold",
                        color: "#3b82f6",
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
                            background: "#ef4444",
                            color: "#ffffff",
                            border: "none",
                            fontWeight: "bold",
                            padding: "0.75rem 1.5rem",
                            borderRadius: "0.5rem",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                        }}
                        onClick={handleIncrement}
                        onMouseEnter={(e) => (e.target.style.background = "#dc2626")}
                        onMouseLeave={(e) => (e.target.style.background = "#ef4444")}
                    >
                        Increment
                    </button>
                    <button
                        style={{
                            background: "#3b82f6",
                            color: "#ffffff",
                            border: "none",
                            fontWeight: "bold",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.5rem",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                        }}
                        onClick={handleReset}
                        onMouseEnter={(e) => (e.target.style.background = "#2563eb")}
                        onMouseLeave={(e) => (e.target.style.background = "#3b82f6")}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CounterApp;
