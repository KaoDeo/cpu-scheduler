import { Output } from './scheduling-algorithms.type';

export interface Stats {
  completionTime: Output;
  waitingTime: Output;
  turnaroundTime: Output;
}
