import { Injectable } from '@angular/core';
import { Process, SchedulingAlgorithms } from '../types';

@Injectable({
  providedIn: 'root',
})
export class RoundRobinService {
  constructor() {}

  getStats(curr: Process) {
    return {
      completionTime: 0,
      waitingTime: 0,
      turnaroundTime: 0,
    };
  }

  calculateCompletionTime(curr: Process) {
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
