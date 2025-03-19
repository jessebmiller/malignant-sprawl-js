/**
 * Manages the UI updates for sensor readings, visualization, and other displays
 */
class UIManager {
  constructor() {
    // Get DOM elements
    this.sensorReadout = document.getElementById('sensor-readout');
    this.visualizationPanel = document.querySelector('.visualization-panel');
    this.triangle = document.querySelector('.triangle');
    
    // Initial sensor data
    this.sensorData = {
      temperature: -82.4,
      pressure: 6.8,
      windSpeed: 12.3,
      radiation: 0.64,
      atmosphere: {
        co2: 95.1,
        n: 2.6,
        ar: 1.9,
        o2: 0.13
      },
      soil: {
        sio2: 43.2,
        fe2o3: 18.4,
        so3: 7.2,
        al2o3: 7.3
      },
      power: 87
    };
    
    // Start simulation with small random changes to sensor values
    setInterval(() => this.updateSensorSimulation(), 10000);
  }
  
  /**
   * Updates a specific sensor reading with a new value
   * @param {string} sensorType - The type of sensor to update
   * @param {any} value - The new sensor value
   */
  updateSensorValue(sensorType, value) {
    // Update the internal data based on sensor type
    switch (sensorType) {
      case 'temperature':
        this.sensorData.temperature = value;
        break;
      case 'pressure':
        this.sensorData.pressure = value;
        break;
      case 'wind':
        this.sensorData.windSpeed = value;
        break;
      case 'radiation':
        this.sensorData.radiation = value;
        break;
      case 'power':
        this.sensorData.power = value;
        break;
      // Add other sensor types as needed
    }
    
    // Update the display
    this.refreshSensorDisplay();
  }
  
  /**
   * Refreshes the entire sensor display based on current data
   */
  refreshSensorDisplay() {
    // Find all sensor data elements
    const temperatureElement = this.findSensorDataElement('TEMPERATURE');
    const pressureElement = this.findSensorDataElement('ATMOSPHERIC PRESSURE');
    const windElement = this.findSensorDataElement('WIND SPEED');
    const radiationElement = this.findSensorDataElement('RADIATION LEVEL');
    const powerElement = this.findSensorDataElement('POWER LEVEL');
    
    // Update the values
    if (temperatureElement) temperatureElement.textContent = `${this.sensorData.temperature.toFixed(1)}°C`;
    if (pressureElement) pressureElement.textContent = `${this.sensorData.pressure.toFixed(1)} mbar`;
    if (windElement) windElement.textContent = `${this.sensorData.windSpeed.toFixed(1)} m/s`;
    if (radiationElement) radiationElement.textContent = `${this.sensorData.radiation.toFixed(2)} mSv/h`;
    if (powerElement) powerElement.textContent = `${this.sensorData.power}%`;
  }
  
  /**
   * Helper to find a sensor data element by its label
   * @param {string} label - The sensor label to search for
   * @returns {HTMLElement|null} - The found element or null
   */
  findSensorDataElement(label) {
    const labelElements = this.sensorReadout.querySelectorAll('.sensor-label');
    for (const labelElement of labelElements) {
      if (labelElement.textContent === label) {
        const parentDiv = labelElement.parentElement;
        return parentDiv.querySelector('.sensor-data');
      }
    }
    return null;
  }
  
  /**
   * Simulates small random changes to sensor readings for visual interest
   */
  updateSensorSimulation() {
    // Add some small random fluctuations to sensor values
    this.sensorData.temperature += (Math.random() * 0.6 - 0.3);
    this.sensorData.pressure += (Math.random() * 0.2 - 0.1);
    this.sensorData.windSpeed += (Math.random() * 1.0 - 0.5);
    this.sensorData.radiation += (Math.random() * 0.04 - 0.02);
    
    // Keep power within reasonable bounds (and slowly decreasing)
    this.sensorData.power -= (Math.random() * 0.2);
    if (this.sensorData.power < 10) this.sensorData.power = 10;
    this.sensorData.power = Math.round(this.sensorData.power * 10) / 10;
    
    // Update the UI display
    this.refreshSensorDisplay();
  }
  
  /**
   * Updates the visualization panel (for future implementation)
   * @param {Object} visualData - Data for visualization updates
   */
  updateVisualization(visualData) {
    // Future implementation will handle triangle/mesh visualization
    console.log("Visualization update with data:", visualData);
  }
}
