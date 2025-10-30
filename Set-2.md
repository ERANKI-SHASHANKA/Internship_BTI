**Task: Implement a circular buffer **

Determine if a number is a power of 2 or not

-------------------------------
Problem Statement:
You're developing a safety-critical sensor fusion module for an ADAS system. The system uses three sensors: Camera, Radar, and LiDAR. The sensor status is encoded in a single 8-bit value as follows:
Bit 0: Camera active (1 = active, 0 = inactive)
Bit 1: Radar active (1 = active, 0 = inactive)
Bit 2: LiDAR active (1 = active, 0 = inactive)
Bit 3: Camera error (1 = error, 0 = no error)
Bit 4: Radar error (1 = error, 0 = no error)
Bit 5: LiDAR error (1 = error, 0 = no error)
Bit 6-7: Reserved (= 0 always)

Safety Requirements:
Data is considered VALID (safe to use) if:

At least 2 sensors are active AND
None of the active sensors have errors
Data is considered INVALID (unsafe) if:

Fewer than 2 sensors are active OR
Any active sensor has an error

Part 1: Basic Operations (Warm-up)

Write the following functions using bit manipulation:
// 1. Check if a specific sensor is active
bool isCameraActive(uint8_t status);
bool isRadarActive(uint8_t status);
bool isLidarActive(uint8_t status);

// 2. Check if a specific sensor has an error
bool hasCameraError(uint8_t status);
bool hasRadarError(uint8_t status);
bool hasLidarError(uint8_t status);

// 3. Count how many sensors are active
int countActiveSensors(uint8_t status);

// 4. Determine if the sensor data is valid/safe to use
bool isSensorDataValid(uint8_t status);

-------------------------------

**This function calculates braking distance. Find all bugs:**
double calculateBrakingDistance(double speed, double friction) {
    double brakingDistance = speed * speed / friction;
    return brakingDistance;
}

Issues:

No check for friction = 0 (division by zero)
No check for negative values (invalid input)
Missing units (speed in m/s or km/h?)
Missing physical constants (should be: v²/(2μg))
No bounds checking on result

double calculateBrakingDistance(double speedKmh, double friction) {
    if (friction <= 0 || speedKmh < 0) {
        return -1;  // error indicator
    }
    
    double speedMs = speedKmh / 3.6;  // convert to m/s
    const double gravity = 9.81;  // m/s²
    double brakingDistance = (speedMs * speedMs) / (2 * friction * gravity);
    
    return brakingDistance;
}

-------------------------------
** Priority Decision**
Scenario: Your AEB system detects:

Object A: 30m ahead, pedestrian, 90% confidence
Object B: 50m ahead, vehicle, 95% confidence
Object C: 25m ahead, unknown, 60% confidence
You can only process one at a time. Design a priority algorithm.

Questions:

Which object should be processed first? Why?
Write a scoring function

Solution:

struct Obstacle {
    double distance;
    std::string type;
    double confidence;
    
    double calculatePriority() const {
        double distanceScore = 100.0 / distance;  // closer = higher
        double typeScore = (type == "pedestrian") ? 2.0 : 1.0;
        double confScore = confidence;
        return distanceScore * typeScore * confScore;
    }
};

Priority: C has lowest confidence, might ignore

 A: (100/30) * 2.0 * 0.9 = 6.0
 
 B: (100/50) * 1.0 * 0.95 = 1.9
 
 C: (100/25) * 1.0 * 0.6 = 2.4
 
 Answer: Process A first (closest pedestrian with good confidence)
 
-------------------------------

**Problem Statement**:
You're developing a Lane Departure Warning (LDW) system. The system should alert the driver when the vehicle drifts out of its lane without signaling.

Given requirements:

Camera captures road markings at 30 FPS
Alert should trigger within 200ms of lane departure detection
System should not alert if turn signal is active
System should not alert at speeds below 60 km/h
Alert frequency: once every 5 seconds maximum (avoid alert fatigue)

Question : 
1. Sequence these steps according to how the requirement should function.
   Decision Logic, Lane Detection, Alert Generation, Image Acquisition, Lane Tracking
2. Based on the requirements what all inputs might be required for your LDW class? (Inputs: Camera data, vehicle speed, turn signal status, time)
----------------------------------
**Scenario**: "A new feature for our cars is a 'Tiredness Alert'. The requirement is: 'The system should alert the driver if they are getting tired.' What questions would you ask before starting to code?"

What to look for: Does the candidate try to make the requirement specific?

**Good questions they might ask:**
"How do we measure 'tiredness'? Is it based on steering wheel movements, eye-tracking, or how long the car has been driven?"
"What does 'alert' mean? A sound, a vibration in the steering wheel, or a message on the screen?"
"At what car speeds should this feature be active?"
"How do we avoid false alarms? What if the driver is just making a normal maneuver?"
"Does the alert have different levels of urgency?"

**State Machine Logic**
Scenario: "Let's design the logic for a very basic Automatic Emergency Braking (AEB) system. The system can be in one of three states:

DISARMED (feature is off)
ARMED (feature is on and monitoring)
BRAKING (actively applying the brakes)
Describe the events that would cause the system to transition from one state to another. For example, what makes it go from ARMED to BRAKING?"

What to look for: Can they think in terms of states and transitions? Do they consider all possibilities, including how to get out of a state?

Good Answer (should identify transitions like these):
DISARMED -> ARMED: The driver enables the AEB feature via a button or settings menu.
ARMED -> DISARMED: The driver disables the feature.
ARMED -> BRAKING: The system detects an imminent collision (e.g., distance to the object ahead is less than a calculated minimum safe distance for the current speed).
BRAKING -> ARMED: The threat is gone (e.g., the object ahead moves away, or the car has come to a complete stop). It's important they mention this "reset" condition.
Follow-up Question: "What happens if the driver presses the accelerator while the system is in the BRAKING state?" (A good answer would be: "The driver's input should override the system, causing a transition from BRAKING back to ARMED. Driver control is the highest priority.")

**State Machine Design Problem**

**Problem**:
Design a simple state machine for Adaptive Cruise Control (ACC).

States to consider:

OFF
STANDBY (enabled but not active)
ACTIVE (maintaining speed)
FOLLOWING (adjusting speed based on lead vehicle)
Questions:
a) What are the transition conditions between states?
b) What inputs does the system need?
c) How would you implement this in code?

Expected Answer:
a) Transitions:

OFF → STANDBY: Driver presses ACC button, speed > 30 km/h
STANDBY → ACTIVE: Driver sets target speed
ACTIVE → FOLLOWING: Radar detects vehicle ahead within range
FOLLOWING → ACTIVE: Lead vehicle clears or accelerates away
ACTIVE/FOLLOWING → STANDBY: Driver presses brake
STANDBY → OFF: Driver presses ACC button again or ignition off

b) Inputs needed:

Radar distance and relative speed
Vehicle speed (from CAN bus)
Target speed setting
Brake pedal status
ACC button status
