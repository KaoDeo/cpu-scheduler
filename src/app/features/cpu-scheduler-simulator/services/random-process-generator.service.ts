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

  generateProcesses(count: number): void {
    for (let i = 0; i < count; i++) {
      const process = this.generateRandomProcess(i);
      this.processQueueService.add(process);
    }
  }

  startGenerating(): void {
    const maxProcesses = 5;
    const interval = Math.floor(Math.random() * 1000) + 1000;

    while (this.count < maxProcesses) {
      const process = this.generateRandomProcess(this.count);
      this.processQueueService.add(process);
      this.count++;
    }
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
    };
  }
}
