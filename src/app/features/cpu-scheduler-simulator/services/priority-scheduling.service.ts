import { Injectable } from '@angular/core';
import { Process, ProcessState, SchedulingAlgorithms, Stats } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PrioritySchedulingService implements SchedulingAlgorithms {
  private completeTime: number = 0;
  private turnAroundTime: number = 0;
  private waitingTime: number = 0;

  constructor() {}

  onSelected(processes: Process[]): Process[] {
    const queue: Process[] = [];
    let currentTime = 0;

    while (processes.length > 0) {
      const availableProcesses = processes.filter(
        (p) => p.arrivalTime <= currentTime
      );

      if (availableProcesses.length === 0) {
        const nextArrival = Math.min(...processes.map((p) => p.arrivalTime));
        currentTime = nextArrival;
        continue;
      }

      const selectedProcess = availableProcesses.reduce((prev, curr) =>
        curr.priority < prev.priority ? curr : prev
      );

      const processIndex = processes.indexOf(selectedProcess);
      processes.splice(processIndex, 1);

      const completionTime = currentTime + selectedProcess.burstTime;

      queue.push({
        ...selectedProcess,
        state: ProcessState.Completed,
        completionTime: completionTime,
      });

      currentTime = completionTime;
    }

    return queue;
  }

  getStats(curr: Process, prev: Process | null): Stats | null {
    if (!curr) {
      return null;
    }

    const completionTime = this.calculateCompletionTime(curr, prev);
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
    this.completeTime = curr.completionTime || 0;

    const prevCompletionTime = prev?.completionTime ?? 0;
    const startTime = Math.max(prevCompletionTime, curr.arrivalTime);

    return {
      value: this.completeTime,
      name: `Start: ${startTime} + Burst: ${curr.burstTime} = ${this.completeTime}`,
    };
  }

  // todo: waiting time is not correctly culced
  calculateWaitingTime(curr: Process) {
    this.waitingTime = this.turnAroundTime - curr.burstTime;

    return {
      value: this.waitingTime,
      name: `${this.turnAroundTime} - ${curr.burstTime} = ${this.waitingTime}`,
    };
  }

  calculateTurnaroundTime(curr: Process) {
    this.turnAroundTime = this.completeTime - curr.arrivalTime;

    return {
      value: this.turnAroundTime,
      name: `${this.completeTime} - ${curr.arrivalTime} = ${this.turnAroundTime}`,
    };
  }
}
