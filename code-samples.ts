// Sensor interface - Extensible for future sensor types
interface ISensor {
  readonly type: SensorType;
  readonly range: number;
  readonly precision: number;
  readonly powerConsumption: number;
  
  getSensorReading(world: IWorld, position: Vector3): SensorReading;
  upgrade(specs: SensorUpgradeSpecs): boolean;
}

// Example sensor implementation
class TemperatureSensor implements ISensor {
  readonly type = SensorType.TEMPERATURE;
  range: number;
  precision: number;
  readonly powerConsumption: number;
  
  constructor(initialSpecs: SensorSpecs) {
    this.range = initialSpecs.range;
    this.precision = initialSpecs.precision;
    this.powerConsumption = initialSpecs.powerConsumption;
  }
  
  getSensorReading(world: IWorld, position: Vector3): SensorReading {
    // Get base temperature from the world
    const baseTemp = world.getEnvironmentalFactor(EnvironmentalFactor.TEMPERATURE, position);
    
    // Apply precision (add some noise based on precision)
    const noise = (1 - this.precision) * (Math.random() * 2 - 1);
    const measuredTemp = baseTemp + noise;
    
    return {
      type: this.type,
      value: measuredTemp.toFixed(1),
      unit: "°C",
      timestamp: Date.now()
    };
  }
  
  upgrade(specs: SensorUpgradeSpecs): boolean {
    if (specs.range) this.range = specs.range;
    if (specs.precision) this.precision = specs.precision;
    return true;
  }
}

// Robot programming interface
interface IProgrammable {
  readonly processor: IProcessor;
  readonly memory: IProgramMemory;
  
  loadProgram(program: CompiledProgram): boolean;
  executeProgram(): ProgramResult;
  halt(): void;
}

// Command processor for parsing player input
interface ICommandProcessor {
  registerCommand(name: string, handler: CommandHandler): void;
  parseAndExecute(input: string): CommandResult;
  compileProgram(sourceCode: string, language: ProgrammingLanguage): CompiledProgram | Error;
}

// World interface that can scale from a single triangle to a planet
interface IWorld {
  readonly gravity: Vector3;
  readonly atmosphere: AtmosphericConditions;
  
  getTerrainAt(position: Vector3): TerrainData;
  getEntitiesInRadius(position: Vector3, radius: number): Entity[];
  getEnvironmentalFactor(factor: EnvironmentalFactor, position: Vector3): number;
  getResourceDeposits(position: Vector3, radius: number): ResourceDeposit[];
  
  // These methods would be implemented later as the game expands
  addEntity(entity: Entity): void;
  removeEntity(entityId: string): boolean;
  modifyTerrain(position: Vector3, modification: TerrainModification): boolean;
}

// Example implementation of the robot's upgrade system
class RobotUpgradeSystem {
  private robot: Robot;
  private availableUpgrades: Map<UpgradeType, UpgradeSpec[]>;
  private resources: Map<ResourceType, number>;
  
  constructor(robot: Robot) {
    this.robot = robot;
    this.availableUpgrades = new Map();
    this.resources = new Map();
    
    // Initialize with basic upgrades
    this.initializeBasicUpgrades();
  }
  
  private initializeBasicUpgrades(): void {
    // Add basic sensor range upgrade
    this.availableUpgrades.set(UpgradeType.SENSOR_RANGE, [
      {
        id: "basic-range-1",
        name: "Basic Range Extension",
        description: "Extends sensor range by 50%",
        requirements: new Map([
          [ResourceType.METAL, 10],
          [ResourceType.SILICON, 5]
        ]),
        applyUpgrade: (robot: Robot) => {
          const tempSensor = robot.getSensor(SensorType.TEMPERATURE);
          if (tempSensor) {
            tempSensor.upgrade({ range: tempSensor.range * 1.5 });
            return true;
          }
          return false;
        }
      }
    ]);
    
    // Add basic processor upgrade
    this.availableUpgrades.set(UpgradeType.PROCESSOR, [
      {
        id: "basic-proc-1",
        name: "Processing Unit v1.1",
        description: "Increases instructions per second by 100%",
        requirements: new Map([
          [ResourceType.SILICON, 15],
          [ResourceType.COPPER, 10]
        ]),
        applyUpgrade: (robot: Robot) => {
          const processor = robot.getProcessor();
          processor.upgrade({ ips: processor.instructionsPerSecond * 2 });
          return true;
        }
      }
    ]);
  }
  
  getAvailableUpgrades(): UpgradeType[] {
    return Array.from(this.availableUpgrades.keys());
  }
  
  getUpgradeSpecs(type: UpgradeType): UpgradeSpec[] {
    return this.availableUpgrades.get(type) || [];
  }
  
  canApplyUpgrade(upgradeId: string): boolean {
    // Find the upgrade spec
    for (const specs of this.availableUpgrades.values()) {
      const upgrade = specs.find(spec => spec.id === upgradeId);
      if (upgrade) {
        // Check if we have enough resources
        for (const [resource, amount] of upgrade.requirements.entries()) {
          const available = this.resources.get(resource) || 0;
          if (available < amount) {
            return false;
          }
        }
        return true;
      }
    }
    return false;
  }
  
  applyUpgrade(upgradeId: string): boolean {
    // Find the upgrade spec
    for (const specs of this.availableUpgrades.values()) {
      const upgrade = specs.find(spec => spec.id === upgradeId);
      if (upgrade && this.canApplyUpgrade(upgradeId)) {
        // Consume resources
        for (const [resource, amount] of upgrade.requirements.entries()) {
          const available = this.resources.get(resource) || 0;
          this.resources.set(resource, available - amount);
        }
        
        // Apply the upgrade
        return upgrade.applyUpgrade(this.robot);
      }
    }
    return false;
  }
  
  addResource(type: ResourceType, amount: number): void {
    const current = this.resources.get(type) || 0;
    this.resources.set(type, current + amount);
  }
}
