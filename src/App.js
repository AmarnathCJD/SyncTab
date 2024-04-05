import React, { useState, useEffect } from "react";

const BACK_END_URL = "http://localhost:5000";

const CounterApp = () => {
    const [count, setCount] = useState(0);
    var pageInitReq = true;

    useEffect(() => {
        const updater = new EventSource(BACK_END_URL + "/api/ws");
        updater.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setCount(data.count);
        };

        return () => {
            updater.close();
        };
    }, []);

    const handleIncrement = () => {
        fetch(BACK_END_URL + "/api/increment", {
            method: "POST",
        });
    };

    const handleReset = () => {
        fetch(BACK_END_URL + "/api/reset", {
            method: "POST",
        });
    };

    const fetchCount = async () => {
        if (pageInitReq) {
            const response = await fetch(BACK_END_URL + "/api/fetch");
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
                backgroundColor: "#edf2f7",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    backgroundColor: "#ffffff",
                    padding: "1.5rem",
                    borderRadius: "0.5rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    fontFamily: "Roboto, sans-serif",
                    textAlign: "center",
                    width: "300px",
                }}
            >
                <h1
                    style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        marginBottom: "1rem",
                        color: "#333",
                    }}
                >
                    Synced Counter
                </h1>
                <p
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "700",
                        color: "#3b82f6",
                        marginBottom: "1rem",
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
                            backgroundColor: "#ef4444",
                            color: "#ffffff",
                            border: "none",
                            fontWeight: "700",
                            padding: "0.75rem 1.5rem",
                            borderRadius: "0.5rem",
                            cursor: "pointer",
                            transition:
                                "background-color 0.3s ease-in-out, transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                        onClick={handleIncrement}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#dc2626")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#ef4444")}
                    >
                        Increment
                    </button>
                    <button
                        style={{
                            backgroundColor: "#3b82f6",
                            color: "#ffffff",
                            border: "none",
                            fontWeight: "700",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.5rem",
                            cursor: "pointer",
                            transition:
                                "background-color 0.3s ease-in-out, transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                        onClick={handleReset}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CounterApp;
