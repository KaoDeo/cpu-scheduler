import { Injectable } from '@angular/core';
import { Process, SchedulingAlgorithms } from '../types';

@Injectable({
  providedIn: 'root',
})
export class FCFSService implements SchedulingAlgorithms {
  completeTime: number = 0;
  turnAroundTime: number = 0;
  waitingTime: number = 0;
  constructor() {}

  getStats(curr: Process, prev: Process | null) {
    this.calculateCompletionTime(curr, prev);
    this.calculateTurnaroundTime(curr);
    this.calculateWaitingTime(curr);

    curr.completionTime = this.completeTime;
    curr.turnaroundTime = this.turnAroundTime;
    curr.waitingTime = this.waitingTime;

    return {
      completionTime: this.completeTime,
      turnaroundTime: this.turnAroundTime,
      waitingTime: this.waitingTime,
    };
  }

  /*
   * Completion Time (CT) = time when process finishes
   * Turnaround Time (TAT) = CT - Arrival Time
   * Waiting Time (WT) = TAT - Burst Time
   */
  calculateCompletionTime(curr: Process, prev: Process | null) {
    const prevCompletionTime = prev?.completionTime ?? 0;

    const startTime = Math.max(prevCompletionTime, curr.arrivalTime);
    this.completeTime = startTime + curr.burstTime;
    return this.completeTime;
  }

  calculateWaitingTime(curr: Process) {
    this.waitingTime = this.turnAroundTime - curr.burstTime;
    return this.waitingTime;
  }

  calculateTurnaroundTime(curr: Process) {
    this.turnAroundTime = this.completeTime - curr.arrivalTime;
    return this.turnAroundTime;
  }
}
