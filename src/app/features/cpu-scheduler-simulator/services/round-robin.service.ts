import { Injectable } from '@angular/core';
import { Process, SchedulingAlgorithms } from '../types';

@Injectable({
  providedIn: 'root',
})
export class RoundRobinService implements SchedulingAlgorithms {
  quantum: number = 2;
  constructor() {}

  onSelected(processes: Process[]): Process[] {
    const queue = [];

    for (const process of processes) {
      if (process.burstTime > this.quantum) {
        const remainingTime = process.burstTime - this.quantum;
        process.burstTime = remainingTime;
        queue.push(process);
      } else {
        queue.push(process);
      }
    }

    return queue;
  }

  getStats(curr: Process, prev: Process | null) {
    const completionTime = this.calculateCompletionTime(curr, prev);
    const turnaroundTime = this.calculateTurnaroundTime(curr);
    const waitingTime = this.calculateWaitingTime(curr);

    return {
      completionTime: completionTime,
      turnaroundTime: turnaroundTime,
      waitingTime: waitingTime,
    };
  }

  calculateCompletionTime(curr: Process, prev: Process | null) {
    return {
      value: 0,
      name: '0',
    };
  }

  calculateWaitingTime(curr: Process) {
    return {
      value: 0,
      name: '0',
    };
  }

  calculateTurnaroundTime(curr: Process) {
    return {
      value: 0,
      name: '0',
    };
  }
}
