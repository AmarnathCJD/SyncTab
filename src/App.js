import React, { useState, useEffect } from "react";
import {
  SendArrowUp,
  ArrowUpSquareFill,
  SymmetryVertical,
  ArrowRepeat,
} from "react-bootstrap-icons";

const CounterApp = () => {
  const [count, setCount] = useState(0);
  const [pageInitReq, setPageInitReq] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [autoIncrement, setAutoIncrement] = useState(false);
  const [latency, setLatency] = useState(0);

  const BACK_END_URL = `https://gogramdocs-amarnathcjd.koyeb.app`;

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
    updateLatency();
    setIsButtonClicked(false);
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

  const updateLatency = async () => {
    const start = Date.now();
    await fetch(`${BACK_END_URL}/api/increment`, {
      method: "POST",
    });
    const end = Date.now();
    const currentLatency = end - start;
    setLatency(currentLatency);
  };

  useEffect(() => {
    fetchCount();
  }, []);

  useEffect(() => {
    let intervalId;
    if (autoIncrement) {
      // set button color to green

      document.getElementById("incrementButton").style.backgroundColor =
        "#4f5d75";
      intervalId = setInterval(() => {
        handleIncrement();
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [autoIncrement]);

  return (
    <div
      style={{
        background: "#f8f9fa",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
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
            color: "#2d3142",
            margin: "0",
            marginBottom: "20px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <ArrowRepeat
            size={30}
            style={{
              color: "#2d3142",
              marginRight: "10px",
              marginTop: "3px",
              fill: "#2d3142",
            }}
          />
          Sync Counter
        </h1>
        <p
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#ef8354",
            margin: "1rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <span>{count}</span>

          <span
            style={{
              fontSize: "1rem",
              color: "#2d3142",
              fontWeight: "normal",
            }}
          >
            (+{latency}ms)
          </span>
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: isButtonClicked ? "#ffffff" : "#4f5d75",
              color: isButtonClicked ? "#4f5d75" : "#ffffff",
              border: "none",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s, color 0.3s",
              border: "2px solid transparent",
              outline: "2px solid #2d3142",
              fontFamily: "Arial, sans-serif",
            }}
            onClick={handleIncrement}
            id="incrementButton"
          >
            <ArrowUpSquareFill
              size={14}
              style={{
                marginRight: "5px",
                marginTop: "1px",
                fill: isButtonClicked ? "#4f5d75" : "#ffffff",
              }}
            />
            <span style={{ textAlign: "center" }}>Increment</span>
          </button>

          <button
            style={{
              background: "#2d3142",
              color: "#ffffff",
              border: "none",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
              border: "2px solid transparent",
              outline: "1px solid #ef8354",
              fontFamily: "Arial, sans-serif",
            }}
            onClick={handleReset}
          >
            Reset
          </button>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={autoIncrement}
              onChange={() => setAutoIncrement(!autoIncrement)}
              style={{
                transform: "scale(1.5)",
                marginRight: "8px",
                marginTop: "5px",
              }}
            />
            <label
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#2d3142",
              }}
            >
              Auto Increment
            </label>
          </div>
          <SendArrowUp
            size={20}
            style={{ color: "#2d3142", fill: "#2d3142" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CounterApp;
