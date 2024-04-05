import React, { useState, useEffect } from "react";

const CounterApp = () => {
  const [count, setCount] = useState(0);
  const [pageInitReq, setPageInitReq] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
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
    setIsButtonClicked(true);
    fetch(`${BACK_END_URL}/api/increment`, {
      method: "POST",
    });
    setTimeout(() => {
      setIsButtonClicked(false);
    }, 300);
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
        background: "#BFC0C0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        fontFamily: "'Arial', sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#FFFFFF",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          width: "300px",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#2D3142",
            margin: "0",
            marginBottom: "20px",
          }}
        >
          Synced Counter
        </h1>
        <p
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#EF8354",
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
              background: isButtonClicked ? "#FFFFFF" : "#4F5D75",
              color: isButtonClicked ? "#4F5D75" : "#FFFFFF",
              border: "none",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s, color 0.3s",
              border: "2px solid transparent",
              outline: "2px solid #2D3142",
              fontFamily: "'Arial', sans-serif",
            }}
            onClick={handleIncrement}
          >
            Increment
          </button>
          <button
            style={{
              background: "#2D3142",
              color: "#FFFFFF",
              border: "none",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
              border: "2px solid transparent",
              outline: "1px solid #EF8354",
              fontFamily: "'Arial', sans-serif",
            }}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CounterApp;
