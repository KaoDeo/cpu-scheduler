import { Process } from './process.type';
import { Stats } from './stats.type';

export interface SchedulingAlgorithms {
  getStats: (curr: Process, prev: Process | null) => Stats | null;

  calculateCompletionTime: (curr: Process, prev: Process) => number;

  calculateWaitingTime: (curr: Process) => number;

  calculateTurnaroundTime: (curr: Process) => number;
}
