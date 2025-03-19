# Seed Robot: Planetary Cleanup Game

A prototype for a game where you command a small "seed" robot to clean up a planet after its population's self-destruction.

## Concept

You control a minimal "seed" robot that initially can only land and send sensor data. Through programming and upgrades, you'll evolve your capabilities, gather resources, and eventually build a complete ecosystem of robots and factories to clean up the planet.

## Prototype Features

- Text-based command interface
- Real-time sensor readouts (temperature, pressure, radiation, etc.)
- Simple visualization of the landing area (single triangle)
- Command system with expandable registry

## Getting Started

1. Clone this repository
2. Open `index.html` in a web browser
3. Use the terminal to interact with the seed robot

## Commands

- `help` - Display available commands
- `status` - Show system status
- `scan` - Perform a basic environmental scan
- `clear` - Clear the terminal history
- `temperature [value]` - Update temperature sensor value
- `power [value]` - Update power level (0-100)

## Development Roadmap

### Phase 1: Core Mechanics *(Current)*
- Basic command interface and sensor readouts
- Simple visualization

### Phase 2: Programming System
- Assembly language interpreter
- Robot upgrading mechanics
- Resource detection and collection

### Phase 3: Expansion
- Extended terrain visualization
- Resource processing
- New robot creation

## Technical Details

The prototype is built with vanilla JavaScript, HTML and CSS for
maximum simplicity. The architecture is designed to be extensible for
later migration to Unreal Engine 5 for the full game.

## License

Apache-2
