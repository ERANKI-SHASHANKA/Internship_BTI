### **1. Programming Fundamentals (C/C++)**

**Basic C++ Questions:**

**Q: What's the difference between `new` and `malloc`?**
- A: `new` is C++ operator, calls constructor, type-safe, uses `delete`. `malloc` is C function, allocates raw memory, needs `free`, no constructor called.

**Q: What's a pointer? What's a reference? Key difference?**
- A: Pointer stores memory address, can be null, can be reassigned. Reference is alias to existing variable, must be initialized, cannot be reassigned. Syntax: `int* ptr` vs `int& ref`.

**Q: What does this code print?**
```cpp
int x = 5;
int* ptr = &x;
*ptr = 10;
std::cout << x;
```
- A: Prints `10`. Pointer `ptr` points to `x`, dereferencing and modifying `*ptr` changes `x`.

**Q: What's wrong with this code?**
```cpp
int* createArray() {
    int arr[5] = {1,2,3,4,5};
    return arr;
}
```
- A: Returns pointer to local array that goes out of scope. Solution: use `new int[5]` or `std::vector<int>`.

---

### **2. Data Structures & Algorithms (DSA)**

**Basic DSA Questions:**

**Q: Explain the difference between array and linked list. When to use each?**
- A: 
  - **Array:** Contiguous memory, O(1) access by index, O(n) insertion/deletion. Use: fixed size, frequent access
  - **Linked List:** Non-contiguous, O(n) access, O(1) insertion at head. Use: dynamic size, frequent insertions

**Q: What's the time complexity of:**
- Binary search in sorted array? **O(log n)**
- Finding element in unsorted array? **O(n)**
- Inserting at end of vector? **O(1) amortized**
- Searching in hash table? **O(1) average**

**Q: Implement a function to reverse a string in-place.**
```cpp
void reverseString(std::string& s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        std::swap(s[left], s[right]);
        left++;
        right--;
    }
}
```

**Q: Given an array of integers, find the two numbers that add up to a target sum.**
```cpp
// Example: [2, 7, 11, 15], target = 9 → return indices [0, 1]
std::vector<int> twoSum(vector<int>& nums, int target) {
    std::unordered_map<int, int> map;  // value -> index
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.find(complement) != map.end()) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    return {};
}
// Time: O(n), Space: O(n)
```

**Q: What's a stack? What's a queue? Give real-world examples.**
- A: 
  - **Stack:** LIFO (Last In First Out). Example: function call stack, undo operations, browser back button
  - **Queue:** FIFO (First In First Out). Example: printer queue, task scheduling, message buffers in ADAS

---

### **3. Operating Systems Basics**

**Simple OS Questions:**

**Q: What's the difference between a process and a thread?**
- A: Process is independent program with own memory. Thread runs inside process, shares memory. Threads are lighter and faster to create.

**Q: What is a race condition? Give a simple example.**
- A: Two threads accessing shared data simultaneously, outcome depends on timing.
```cpp
int counter = 0;
// Thread 1: counter++;
// Thread 2: counter++;
// Expected: 2, but might get 1 due to race condition
```

**Q: What's a mutex? Why do we need it?**
- A: Mutual exclusion lock. Ensures only one thread accesses shared resource at a time. Prevents race conditions.

**Q: What's the difference between stack and heap memory?**
- A:
  - **Stack:** Fast, automatic, limited size, local variables, function calls
  - **Heap:** Slower, manual (`new`/`delete`), larger, dynamic allocation
  
**Q: What happens when you have a memory leak?**
- A: Memory is allocated but never freed. Program consumes more and more memory over time, eventually crashes or slows down system.

**Q: What's virtual memory?**
- A: Technique that gives each program the illusion of large contiguous memory. Uses hard disk as extension of RAM when physical memory is full.

---

### **4. Basic ADAS Concepts (Domain Knowledge)**

**Simple Automotive Questions:**

**Q: What does ADAS stand for? Name 3 ADAS features.**
- A: Advanced Driver Assistance Systems. Examples: Automatic Emergency Braking (AEB), Lane Keeping Assist, Adaptive Cruise Control, Blind Spot Detection, Parking Assist.

**Q: Name 3 sensors used in modern cars for ADAS.**
- A: Camera (sees lanes, signs), Radar (detects distance, works in fog), Ultrasonic (parking), LiDAR (3D mapping).

**Q: What is AEB (Automatic Emergency Braking)?**
- A: System that detects potential collision and automatically applies brakes if driver doesn't react in time. Typically uses radar and camera.

**Q: Why is timing important in ADAS systems?**
- A: ADAS needs to react in real-time. Example: at 100 km/h, car travels ~28 meters per second. A 100ms delay could mean 2.8m difference in braking distance.

**Q: What does "safety-critical" mean?**
- A: System where failure could result in injury or death. Requires extra testing, redundancy, and strict development standards.

---

### **5. Problem-Solving & Logical Reasoning**

**Problem 1: Collision Detection (Simple)**

**Scenario:** Your car is traveling at 72 km/h (20 m/s). A sensor detects a stopped car 60 meters ahead.

**Questions:**
1. How many seconds until collision if you don't brake?
2. If the braking system takes 0.5 seconds to activate, how far will you travel in that time?
3. Should the system trigger a warning? (Assume warning threshold is 3 seconds to collision)

**Answers:**
1. Time = Distance / Speed = 60m / 20 m/s = **3 seconds**
2. Distance = Speed × Time = 20 m/s × 0.5s = **10 meters**
3. **Yes**, because 3 seconds = threshold, should warn immediately

---

**Problem 2: Sensor Data Validation**

**Scenario:** You receive distance readings from 3 sensors:
- Camera: 45.2 m
- Radar: 45.5 m  
- Ultrasonic: 12.8 m

**Questions:**
1. Which sensor reading looks suspicious? Why?
2. How would you determine which sensor to trust?
3. Write pseudocode to select the most reliable reading.

**Answers:**
1. Ultrasonic (12.8m) - differs significantly from others. Ultrasonic has limited range (~5m), might be reading something else
2. Use sensor fusion: compare readings, check if in valid range, use confidence/reliability scores, historical data
3. Pseudocode:
```
if (abs(camera - radar) < THRESHOLD):
    use average(camera, radar)
else if (camera in valid_range):
    use camera
else if (radar in valid_range):
    use radar
else:
    trigger error - no reliable reading
```

---

**Problem 3: Finding Bugs**

**Scenario:** This function should return true if obstacle is dangerous:
```cpp
bool isDangerous(double distance, double speed) {
    double timeToCollision = distance / speed;
    if (timeToCollision < 2.0)
        return true;
    return false;
}
```

**Questions:**
1. What happens if `speed = 0`? How to fix?
2. What if `distance` is negative? Should we handle it?
3. Rewrite the function with error handling.

**Answers:**
1. Division by zero → crash. Fix: check if speed > 0
2. Negative distance is invalid sensor reading, should handle it
3. Fixed version:
```cpp
bool isDangerous(double distance, double speed, bool& valid) {
    valid = false;
    if (distance <= 0 || speed <= 0) {
        return false;  // invalid input
    }
    valid = true;
    double timeToCollision = distance / speed;
    return (timeToCollision < 2.0);
}
```

---

**Problem 4: Simple State Machine**

**Scenario:** Design a simple cruise control system with these states:
- OFF (default)
- STANDBY (ready but not active)
- ACTIVE (controlling speed)

**Rules:**
- Button press when OFF → STANDBY
- Button press when STANDBY and speed > 30 km/h → ACTIVE
- Brake pedal pressed → go to STANDBY
- Cancel button → go to OFF

**Questions:**
1. Draw a simple state diagram
2. Write pseudocode for state transitions
3. What should happen if speed drops below 30 km/h while ACTIVE?

**Answers:**
1. State diagram:
```
    [OFF] --button--> [STANDBY] --button(speed>30)--> [ACTIVE]
      ^                  ^                              |
      |                  |                              |
      +--cancel----------+--------brake/cancel---------+
```

2. Pseudocode:
```cpp
switch(currentState) {
    case OFF:
        if (buttonPressed) currentState = STANDBY;
        break;
    case STANDBY:
        if (buttonPressed && speed > 30) currentState = ACTIVE;
        if (cancelPressed) currentState = OFF;
        break;
    case ACTIVE:
        if (brakePressed || cancelPressed) currentState = STANDBY;
        if (speed < 30) currentState = STANDBY;  // safety
        break;
}
```

3. Should drop to STANDBY for safety (can't maintain cruise below minimum speed)

---

**Problem 5: Array/Buffer Question**

**Scenario:** You're storing the last 10 distance measurements in an array for averaging:
```cpp
double distances[10];
int count = 0;

void addMeasurement(double dist) {
    distances[count] = dist;
    count++;
}

double getAverage() {
    double sum = 0;
    for (int i = 0; i < 10; i++) {
        sum += distances[i];
    }
    return sum / 10;
}
```

**Questions:**
1. What's wrong with `addMeasurement()`?
2. What's wrong with `getAverage()` when count < 10?
3. How would you implement a circular buffer to keep only the last 10 measurements?

**Answers:**
1. `count` keeps growing beyond array size → buffer overflow. Need: `count % 10` or check bounds
2. Dividing by 10 when fewer measurements exist → wrong average. Should divide by actual count
3. Circular buffer:
```cpp
double distances[10] = {0};
int index = 0;
int count = 0;  // up to 10

void addMeasurement(double dist) {
    distances[index] = dist;
    index = (index + 1) % 10;  // wrap around
    if (count < 10) count++;
}

double getAverage() {
    if (count == 0) return 0;
    double sum = 0;
    for (int i = 0; i < count; i++) {
        sum += distances[i];
    }
    return sum / count;
}
```

---

**Problem 6: Logic Puzzle**

**Scenario:** Your system needs to decide whether to brake based on:
- Obstacle detected: YES/NO
- Distance < 20m: YES/NO  
- Speed > 50 km/h: YES/NO

**Rules:**
- Brake if: obstacle detected AND (distance < 20m OR speed > 50 km/h)
- Don't brake otherwise

**Question:** Fill in the truth table and implement the logic:

| Obstacle | Distance<20 | Speed>50 | Brake? |
|----------|-------------|----------|---------|
| NO       | NO          | NO       | NO      |
| NO       | YES         | YES      | NO      |
| YES      | NO          | NO       | NO      |
| YES      | YES         | NO       | YES     |
| YES      | NO          | YES      | YES     |
| YES      | YES         | YES      | YES     |

**Implementation:**
```cpp
bool shouldBrake(bool obstacleDetected, bool distanceLessThan20, 
                 bool speedGreaterThan50) {
    return obstacleDetected && (distanceLessThan20 || speedGreaterThan50);
}
```

---

### **6. Practical Coding Exercise**

**Exercise: Implement a Simple Sensor Filter**

**Task:** Write a function that takes last 5 sensor readings and returns the median (middle value) to filter out noise.

**Example:** Input: `[10.2, 10.5, 15.0, 10.3, 10.4]` → Output: `10.4`

**Expected Solution:**
```cpp
#include <algorithm>
#include <vector>

double getMedian(std::vector<double> readings) {
    if (readings.empty()) return 0.0;
    
    // Sort the readings
    std::sort(readings.begin(), readings.end());
    
    // Return middle element
    int middle = readings.size() / 2;
    
    if (readings.size() % 2 == 0) {
        // Even number: average of two middle elements
        return (readings[middle-1] + readings[middle]) / 2.0;
    } else {
        // Odd number: return middle element
        return readings[middle];
    }
}
```

**Follow-up Questions:**
1. Why use median instead of average? **Answer:** Median is less affected by outliers/noise
2. What's the time complexity? **Answer:** O(n log n) due to sorting
3. Can you do better than sorting every time? **Answer:** Yes, use a circular buffer with insertion sort O(n), or selection algorithm O(n)

---

### **7. Behavioral & Communication**

**Soft Skills Assessment:**

1. **Explain a technical concept:** "Explain what a pointer is to someone who doesn't program"
   - Good answer: "A pointer is like an address of a house. Instead of storing the house itself, you store its address. When you need the house, you go to that address."

2. **Debugging approach:** "Your code compiles but crashes. How do you find the problem?"
   - Expected: Print statements, debugger (gdb), check inputs, divide and conquer, read error messages

3. **Teamwork:** "You disagree with a teammate's approach. What do you do?"
   - Expected: Discuss pros/cons, data-driven decision, respect team decision, escalate if safety issue

---

## **Evaluation Rubric for Interns**

### **Must Have (Essential):**
- ✓ Basic C++ syntax (pointers, loops, functions)
- ✓ Understanding of basic data structures (array, list, stack, queue)
- ✓ Problem decomposition (can break down complex problems)
- ✓ Willingness to learn and ask questions

### **Good to Have (Bonus):**
- ✓ Any exposure to threading/concurrency
- ✓ Understanding of basic algorithms (search, sort)
- ✓ Familiarity with Linux/command line
- ✓ Any embedded systems or hardware experience

### **Not Expected (Will Learn):**
- Deep automotive domain knowledge
- Real-time systems expertise
- Advanced concurrency patterns
- Safety standards (ISO 26262)

### **Red Flags:**
- ✗ Cannot explain their own code
- ✗ No systematic debugging approach
- ✗ Gives up easily on problems
- ✗ Cannot handle constructive feedback
- ✗ No curiosity about how things work

---

## **Interview Structure Suggestion**

**Round 1: Technical Screening (30-45 min)**
- 2-3 DSA questions (easy to medium)
- 2-3 C++ fundamentals
- 1 basic OS question

**Round 2: Problem Solving (45-60 min)**
- 1-2 ADAS scenario problems
- 1 live coding exercise (simple filter/state machine)
- Debugging exercise

**Round 3: Final Discussion (30 min)**
- Behavioral questions
- Interest in automotive/ADAS
- Questions from candidate
- Team fit assessment

---

This framework is **realistic for interns** - tests fundamentals while allowing room for growth. Focus on potential and learning ability rather than expecting expert-level knowledge!
<img width="859" height="13276" alt="image" src="https://github.com/user-attachments/assets/4ece8538-2544-4341-a295-84168e9ef56c" />

