/**
 * Main entry point for the Seed Robot application
 */
document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const terminalHistory = document.getElementById('terminal-history');
  const terminalInput = document.getElementById('terminal-input');
  
  // Initialize UI Manager
  const uiManager = new UIManager();
  
  // Initialize Command Processor
  const commandProcessor = new CommandProcessor(terminalHistory, terminalInput);
  
  // Register additional commands that interact with the UI
  commandProcessor.registerCommand("temperature", (args) => {
    const value = parseFloat(args[0]);
    if (!isNaN(value)) {
      uiManager.updateSensorValue('temperature', value);
      return `Temperature sensor reading updated to ${value}°C`;
    }
    return "Invalid temperature value. Usage: temperature [value]";
  });
  
  commandProcessor.registerCommand("power", (args) => {
    const value = parseFloat(args[0]);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      uiManager.updateSensorValue('power', value);
      return `Power level updated to ${value}%`;
    }
    return "Invalid power value. Usage: power [0-100]";
  });
  
  // Set focus on terminal input
  terminalInput.focus();
  
  // Ensure terminal input gets focus when clicking anywhere in terminal
  document.querySelector('.command-terminal').addEventListener('click', () => {
    terminalInput.focus();
  });
  
  // Initialize system time
  initializeSystemTime();
});

/**
 * Sets up the system time display and updates it
 */
function initializeSystemTime() {
  // Get DOM element for MTC (Mars Time Coordinate) display
  const mtcElement = document.querySelector('.system-status div:nth-child(3)');
  
  // Update the time every second
  setInterval(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    mtcElement.textContent = `MTC: ${hours}:${minutes}`;
  }, 1000);
}
