import { Output } from './scheduling-algorithms.type';

export interface Stats {
  formulas?: { name: string; value: string }[];
  completionTime: Output;
  waitingTime: Output;
  turnaroundTime: Output;
}
