import { Injectable } from '@angular/core';
import { Process, ProcessState, SchedulingAlgorithms, Stats } from '../types';

@Injectable({
  providedIn: 'root',
})
export class RoundRobinService implements SchedulingAlgorithms {
  quantum: number = 2;
  private completeTime: number = 0;
  private turnAroundTime: number = 0;
  private waitingTime: number = 0;
  private originalBurstTimes: Map<string, number> = new Map();
  private originalArrivalTimes: Map<string, number> = new Map();

  constructor() {}

  onSelected(processes: Process[]): Process[] {
    const queue = [];

    this.originalBurstTimes.clear();
    this.originalArrivalTimes.clear();
    processes.forEach((process) => {
      this.originalBurstTimes.set(process.id, process.burstTime);
      this.originalArrivalTimes.set(process.id, process.arrivalTime);
    });

    const sortedProcesses = processes.sort(
      (a, b) => a.arrivalTime - b.arrivalTime
    );

    // todo: according to the algorithm, if the curr arrivalTime equals to the next arrivalTime, still the first will be proccessed
    for (let idx = 0; idx < sortedProcesses.length; idx++) {
      const process = sortedProcesses[idx];
      while (process.burstTime > this.quantum && process.burstTime > 0) {
        if (process.arrivalTime <= sortedProcesses[idx + 1].arrivalTime) {
          process.burstTime -= this.quantum;

          process.arrivalTime += this.quantum;

          queue.push({
            ...process,
            state: ProcessState.Running,
            quantum: this.quantum,
          });

          continue;
        } else {
          break;
        }
      }

      queue.push({
        ...process,
        state: ProcessState.Completed,
        quantum: this.quantum,
      });
    }

    return queue;
  }

  // todo: needs robust testing
  getStats(
    curr?: Process,
    prev?: Process | null,
    processes?: Process[]
  ): Stats | null {
    if (!curr) {
      return null;
    }

    const completionTime = this.calculateCompletionTime(curr, prev ?? null);
    const turnaroundTime = this.calculateTurnaroundTime(curr);
    const waitingTime = this.calculateWaitingTime(curr);

    return {
      completionTime: completionTime,
      turnaroundTime: turnaroundTime,
      waitingTime: waitingTime,
      formulas: [
        {
          name: 'Completion Time',
          value: completionTime.name,
        },
        {
          name: 'Turnaround Time',
          value: turnaroundTime.name,
        },
        {
          name: 'Waiting Time',
          value: waitingTime.name,
        },
      ],
    };
  }

  calculateCompletionTime(curr: Process, prev: Process | null) {
    const prevCompletionTime = prev?.completionTime ?? 0;
    const startTime = Math.max(prevCompletionTime, curr.arrivalTime);

    this.completeTime = startTime + curr.quantum;

    return {
      value: this.completeTime,
      name: `${startTime} + ${curr.quantum} = ${this.completeTime}`,
    };
  }

  calculateWaitingTime(curr: Process) {
    const originalBurstTime =
      this.originalBurstTimes.get(curr.id) ?? curr.burstTime;
    this.waitingTime = this.turnAroundTime - originalBurstTime;

    return {
      value: this.waitingTime,
      name: `${this.turnAroundTime} - ${originalBurstTime} = ${this.waitingTime}`,
    };
  }

  calculateTurnaroundTime(curr: Process) {
    const originalArrivalTime =
      this.originalArrivalTimes.get(curr.id) ?? curr.arrivalTime;
    this.turnAroundTime = this.completeTime - originalArrivalTime;

    return {
      value: this.turnAroundTime,
      name: `${this.completeTime} - ${originalArrivalTime} = ${this.turnAroundTime}`,
    };
  }
}
