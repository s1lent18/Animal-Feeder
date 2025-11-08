// src/App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [activeModule, setActiveModule] = useState(null); // track which module is ON

  const ESP_IP = "https://concludingly-unempty-david.ngrok-free.dev:5000"; // Change this to your ESP’s IP address

  const toggleModule = async (module) => {
  const newState = activeModule === module ? null : module;
  setActiveModule(newState);

  try {
    const command = { module, state: newState === module ? "on" : "off" };

    await fetch(`${ESP_IP}/command`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(command),
    });
  } catch (error) {
    console.error(`Error toggling ${module}:`, error);
    alert("Failed to connect to relay server. Check if it's running.");
  }
};

  return (
    <div className="App">
      <header className="App-header">Automated Animal Feeder</header>

      <div className="buttons-container">
        <button
          className={`module-btn ${activeModule === "time-interval" ? "on" : "off"}`}
          onClick={() => toggleModule("time-interval")}
        >
          {activeModule === "time-interval" ? "Turn Off" : "Turn On"} Time Interval Module
        </button>

        <button
          className={`module-btn ${activeModule === "sound" ? "on" : "off"}`}
          onClick={() => toggleModule("sound")}
        >
          {activeModule === "sound" ? "Turn Off" : "Turn On"} Sound Module
        </button>

        <button
          className={`module-btn ${activeModule === "motor" ? "on" : "off"}`}
          onClick={() => toggleModule("motor")}
        >
          {activeModule === "motor" ? "Turn Off" : "Turn On"} Motor
        </button>
      </div>
    </div>
  );
}

export default App;
