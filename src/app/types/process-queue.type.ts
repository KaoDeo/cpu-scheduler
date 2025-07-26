import { ProcessState } from './process-state.type';
import { Process } from './process.type';

export interface ProcessQueue {
  add(process: Process): void;
  remove(processId: string): void;
  clear(): void;
  peek(): Process | null;
  contains(processId: string): boolean;
  isEmpty(): boolean;
  size(): number;
}
