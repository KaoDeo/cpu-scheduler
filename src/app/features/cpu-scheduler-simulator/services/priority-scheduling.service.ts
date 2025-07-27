import { Injectable } from '@angular/core';
import { Process, SchedulingAlgorithms } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PrioritySchedulingService implements SchedulingAlgorithms {
  constructor() {}

  getStats(curr: Process) {
    return {
      completionTime: 0,
      waitingTime: 0,
      turnaroundTime: 0,
    };
  }

  calculateCompletionTime(curr: Process) {
    return 0;
  }

  calculateWaitingTime(curr: Process) {
    return 0;
  }

  calculateTurnaroundTime(curr: Process) {
    return 0;
  }
}
