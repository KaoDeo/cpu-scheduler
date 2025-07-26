import { Injectable } from '@angular/core';
import { ProcessQueueService } from './process-queue.service';
import { v4 as uuidv4 } from 'uuid';
import { Process, ProcessState } from '../types';

@Injectable({
  providedIn: 'root',
})
export class RandomProcessGeneratorService {
  private count = 0;
  constructor(private processQueueService: ProcessQueueService) {}

  generateProcesses(count: number): void {
    for (let i = 0; i < count; i++) {
      const process = this.generateRandomProcess(i);
      this.processQueueService.add(process);
    }
  }

  generateWithRandomInterval(): void {
    const interval = Math.floor(Math.random() * 10);

    setInterval(() => {
      const process = this.generateRandomProcess(this.count);
      this.processQueueService.add(process);
    }, interval);

    this.count++;
  }

  private generateRandomProcess(i: number): Process {
    return {
      id: uuidv4(),
      name: `Process ${i}`,
      arrivalTime: Math.random() * 10,
      burstTime: Math.random() * 10,
      priority: Math.random() * 10,
      completionTime: 0,
      waitingTime: 0,
      turnaroundTime: 0,
      state: ProcessState.New,
    };
  }
}
