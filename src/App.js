// src/App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [activeModule, setActiveModule] = useState(null); // track which module is ON

  const ESP_IP = "http://192.168.100.50"; // Change this to your ESP’s IP address

  const toggleModule = async (module) => {
    // If clicked module is already on, turn it off
    const newState = activeModule === module ? null : module;
    setActiveModule(newState);

    try {
      // Turn the clicked module on or off
      await fetch(`${ESP_IP}/${module}?state=${newState === module ? "on" : "off"}`);

      // If turning on a new module, turn off others
      if (newState === module) {
        const otherModules = ["time-interval", "sound", "motor"].filter((m) => m !== module);
        for (const other of otherModules) {
          await fetch(`${ESP_IP}/${other}?state=off`);
        }
      }
    } catch (error) {
      console.error(`Error toggling ${module}:`, error);
      alert("Failed to connect to ESP module. Check network connection.");
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
