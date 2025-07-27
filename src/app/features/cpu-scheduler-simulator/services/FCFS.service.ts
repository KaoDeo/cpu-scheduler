import { Injectable } from '@angular/core';
import { Process, SchedulingAlgorithms } from '../types';

/**
 * Non-preemptive CPU scheduling algorithm (A running process won't be interrupted if a new process arrives)
 */
@Injectable({
  providedIn: 'root',
})
export class FCFSService implements SchedulingAlgorithms {
  completeTime: number = 0;
  turnAroundTime: number = 0;
  waitingTime: number = 0;
  constructor() {}

  getStats(curr: Process, prev: Process | null) {
    const completionTime = this.calculateCompletionTime(curr, prev);
    const turnaroundTime = this.calculateTurnaroundTime(curr);
    const waitingTime = this.calculateWaitingTime(curr);

    curr.completionTime = this.completeTime;
    curr.turnaroundTime = this.turnAroundTime;
    curr.waitingTime = this.waitingTime;

    return {
      completionTime: completionTime,
      turnaroundTime: turnaroundTime,
      waitingTime: waitingTime,
    };
  }

  /*
    https://www.geeksforgeeks.org/dsa/first-come-first-serve-cpu-scheduling-non-preemptive/
   * Completion Time (CT) = time when process finishes
   * Turnaround Time (TAT) = CT - Arrival Time
   * Waiting Time (WT) = TAT - Burst Time
   */
  calculateCompletionTime(curr: Process, prev: Process | null) {
    const prevCompletionTime = prev?.completionTime ?? 0;

    const startTime = Math.max(prevCompletionTime, curr.arrivalTime);
    this.completeTime = startTime + curr.burstTime;
    return {
      value: this.completeTime,
      name: `${startTime} + ${curr.burstTime} = ${this.completeTime}`,
    };
  }

  calculateWaitingTime(curr: Process) {
    this.waitingTime = this.turnAroundTime - curr.burstTime;
    return {
      value: this.waitingTime,
      name: `${this.turnAroundTime} - ${curr.burstTime} = ${this.waitingTime}`,
    };
  }

  calculateTurnaroundTime(curr: Process) {
    this.turnAroundTime = this.completeTime - curr.arrivalTime;
    return {
      value: this.turnAroundTime,
      name: `${this.completeTime} - ${curr.arrivalTime} = ${this.turnAroundTime}`,
    };
  }
}
