import { Process } from './process.type';
import { Stats } from './stats.type';

export interface Output {
  value: number;
  name: string;
}

export interface SchedulingAlgorithms {
  getStats: (curr: Process, prev: Process | null) => Stats | null;
  onSelected?: (processes: Process[]) => Process[];
  calculateCompletionTime: (curr: Process, prev: Process) => Output;

  calculateWaitingTime: (curr: Process) => Output;

  calculateTurnaroundTime: (curr: Process) => Output;
}
