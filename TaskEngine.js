/**
 * TASKARCADE // COGNITIVE CELEBRATION ENGINE
 * Core Micro-State Machine Logic for Neurodivergent Focus Sprints
 * Powered by SOLVM Framework // A Mary of Tech Production (c) 2026
 * * This module manages the state transitions, local countdown intervals,
 * and deterministic dopamine-feedback triggers for ADHD-adapted productivity.
 */

export const EngineStates = {
  IDLE: 'IDLE',
  FOCUS_SPRINT: 'FOCUS_SPRINT',
  CELEBRATION_TRIGGERED: 'CELEBRATION_TRIGGERED',
  COGNITIVE_REST: 'COGNITIVE_REST'
};

export class TaskArcadeStateMachine {
  constructor(initialDurationMinutes = 25) {
    this.state = EngineStates.IDLE;
    this.duration = initialDurationMinutes * 60; // Convert to seconds
    this.timeRemaining = this.duration;
    this.intervalId = null;
    this.onStateChangeCallbacks = [];
  }

  // Subscribe UI views to state changes without exposing visual assets
  subscribe(callback) {
    this.onStateChangeCallbacks.push(callback);
  }

  notifyListeners() {
    this.onStateChangeCallbacks.forEach(cb => cb({
      state: this.state,
      timeRemaining: this.timeRemaining,
      progressPercentage: ((this.duration - this.timeRemaining) / this.duration) * 100
    }));
  }

  // Transitions the engine into an active focus bubble
  startSprint() {
    if (this.state === EngineStates.IDLE || this.state === EngineStates.COGNITIVE_REST) {
      this.state = EngineStates.FOCUS_SPRINT;
      this.notifyListeners();
      
      this.intervalId = setInterval(() => {
        this.tick();
      }, 1000);
    }
  }

  tick() {
    if (this.timeRemaining > 0) {
      this.timeRemaining -= 1;
      this.notifyListeners();
    } else {
      this.triggerCelebrationCycle();
    }
  }

  // The core dopamine-feedback hook
  triggerCelebrationCycle() {
    clearInterval(this.intervalId);
    this.state = EngineStates.CELEBRATION_TRIGGERED;
    
    // Core Logic: Broadcast localized milestone completion confirmation
    console.log("SOLVM SYSTEM CONFIRMATION: Focus sprint milestone reached. Initializing celebration layer.");
    this.notifyListeners();
    
    // Auto-advance to rest state after celebration cycle completes (5 seconds)
    setTimeout(() => {
      this.resetEngine();
    }, 5000);
  }

  resetEngine() {
    this.state = EngineStates.COGNITIVE_REST;
    this.timeRemaining = 5 * 60; // 5-minute standard recovery cycle
    this.notifyListeners();
  }
}
