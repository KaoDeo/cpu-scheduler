import { ProcessState } from './process-state.type';

export interface Process {
  id: string;
  name: string;
  arrivalTime: number;
  burstTime: number;
  priority: number;
  completionTime: number;
  waitingTime: number;
  turnaroundTime: number;
  state: ProcessState;
  pause?(): void;
  resume?(): void;
  cancel?(): void;
}
