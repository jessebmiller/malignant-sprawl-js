/**
 * Handles processing of user commands and manages command registry
 */
class CommandProcessor {
  /**
   * @param {HTMLElement} terminalHistory - The terminal history DOM element
   * @param {HTMLInputElement} terminalInput - The terminal input DOM element
   */
  constructor(terminalHistory, terminalInput) {
    this.terminalHistory = terminalHistory;
    this.terminalInput = terminalInput;
    this.commandRegistry = new Map();
    
    // Register basic commands
    this.registerCommand("help", () => this.getHelpText());
    this.registerCommand("status", () => this.getStatusText());
    this.registerCommand("scan", () => this.getScanText());
    this.registerCommand("clear", () => { 
      this.terminalHistory.innerHTML = ""; 
      return "Terminal cleared.";
    });
    
    // Set up event listener for command input
    this.terminalInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const command = this.terminalInput.value;
        this.processCommand(command);
        this.terminalInput.value = "";
      }
    });
  }
  
  /**
   * Registers a new command with its handler function
   * @param {string} name - The command name
   * @param {function} handler - Function that handles the command and returns response text
   */
  registerCommand(name, handler) {
    this.commandRegistry.set(name.toLowerCase(), handler);
  }
  
  /**
   * Processes a command input from the user
   * @param {string} input - The raw command input
   */
  processCommand(input) {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    
    // Display command in terminal
    this.appendToHistory(`> ${trimmedInput}`);
    
    // Parse command and arguments
    const parts = trimmedInput.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    // Execute command if registered
    const handler = this.commandRegistry.get(command);
    if (handler) {
      const response = handler(args);
      this.appendToHistory(response);
    } else {
      this.appendToHistory(`Unknown command: ${command}`);
      this.appendToHistory("Type 'help' for available commands.");
    }
  }
  
  /**
   * Appends text to the terminal history
   * @param {string} text - Text to append
   */
  appendToHistory(text) {
    this.terminalHistory.innerHTML += text + "\n";
    this.terminalHistory.scrollTop = this.terminalHistory.scrollHeight;
  }
  
  /**
   * Returns help text for available commands
   * @returns {string} - Formatted help text
   */
  getHelpText() {
    return `
Available commands:
- help: Display this help text
- status: Check robot status
- scan: Perform basic environmental scan
- clear: Clear terminal history
    `.trim();
  }
  
  /**
   * Returns robot status information
   * @returns {string} - Formatted status text
   */
  getStatusText() {
    return `
SEED-01 STATUS REPORT
---------------------
Power: 87% (Charging via solar)
CPU: 3% load
Memory: 12% utilized
Storage: 97% available
Sensors: All operational
Actuators: Locked (upgrade required)
    `.trim();
  }
  
  /**
   * Returns scan results
   * @returns {string} - Formatted scan results
   */
  getScanText() {
    return `
BASIC SCAN COMPLETE
------------------
Detected in immediate vicinity:
- Fine-grained martian regolith
- Iron oxide deposits (low concentration)
- Silicate minerals
- Trace water ice (subsurface)

No active lifeforms detected.
No artificial structures detected.
    `.trim();
  }
}
