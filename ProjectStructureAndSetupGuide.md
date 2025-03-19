# Seed Robot Project - Getting Started

This document outlines the project structure and how to set up the initial prototype for the Seed Robot planetary cleanup game.

## Project Structure

```
seed-robot/
│
├── index.html              # Main HTML file
├── styles.css              # CSS styles
│
└── js/
    ├── CommandProcessor.js # Handles user commands
    ├── UIManager.js        # Manages UI updates
    └── main.js             # Entry point and initialization
```

## Setup Instructions

1. Create the folder structure above
2. Copy all the provided files into their respective locations
3. Open `index.html` in a web browser to view the application

No additional libraries or setup is required for this initial prototype. It uses vanilla JavaScript and standard HTML/CSS.

## Available Commands

The prototype supports the following commands:

- `help` - Display available commands
- `status` - Show system status
- `scan` - Perform a basic environmental scan
- `clear` - Clear the terminal history
- `temperature [value]` - Update temperature sensor value
- `power [value]` - Update power level (0-100)

## Next Steps

After implementing this basic prototype, here are the suggested next steps:

1. Implement a simple robot model with basic properties
2. Create a basic world model with the single triangle terrain
3. Expand the command system to allow for robot programming
4. Implement resource detection and collection mechanics
5. Add the upgrade system for the robot

## Developer Notes

- The UI updates automatically with small random variations in sensor readings
- The system time (MTC) updates in real-time
- The terminal input automatically receives focus when clicking on the terminal area
- All code is structured to be easily expandable as the project grows
