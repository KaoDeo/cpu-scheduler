import { Injectable } from '@angular/core';
import { ProcessQueueService } from './process-queue.service';
import { v4 as uuidv4 } from 'uuid';
import { Process, ProcessState } from '../types';

@Injectable({
  providedIn: 'root',
})
export class RandomProcessGeneratorService {
  private count = 0;
  intervalId: number = 0;
  constructor(private processQueueService: ProcessQueueService) {}

  startGenerating(): void {
    const maxProcesses = 2;

    const processes = [
      {
        id: uuidv4(),
        name: `Process 1`,
        arrivalTime: 0,
        burstTime: 5,
        completionTime: 0,
        waitingTime: 0,
        turnaroundTime: 0,
        state: ProcessState.New,
        quantum: 0,
        priority: Math.round(Math.random() * 10),
      },
      {
        id: uuidv4(),
        name: `Process 2`,
        arrivalTime: 4,
        burstTime: 2,
        completionTime: 0,
        waitingTime: 0,
        turnaroundTime: 0,
        state: ProcessState.New,
        quantum: 0,
        priority: Math.round(Math.random() * 10),
      },
    ];

    for (const process of processes) {
      this.processQueueService.add(process);
    }

    // while (this.count < maxProcesses) {
    //   const process = this.generateRandomProcess(this.count);
    //   this.processQueueService.add(process);
    //   this.count++;
    // }
  }

  stopGenerating(): void {
    clearInterval(this.intervalId);
  }

  private generateRandomProcess(i: number): Process {
    return {
      id: uuidv4(),
      name: `Process ${i}`,
      arrivalTime: i,
      burstTime: Math.round(Math.random() * 10) + 1,
      priority: Math.round(Math.random() * 10),
      completionTime: 0,
      waitingTime: 0,
      turnaroundTime: 0,
      state: ProcessState.New,
      quantum: 0,
    };
  }
}
