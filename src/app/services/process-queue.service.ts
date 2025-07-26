import { Injectable } from '@angular/core';
import { Process, ProcessQueue } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ProcessQueueService implements ProcessQueue {
  private queue: Process[] = [];

  add(process: Process): void {
    this.queue.push(process);
  }

  remove(processId: string): void {
    const index = this.queue.findIndex((process) => process.id === processId);
    if (index !== -1) {
      this.queue.splice(index, 1);
    }
  }

  clear(): void {
    this.queue = [];
  }

  peek(): Process | null {
    return this.queue[0] ?? null;
  }

  contains(processId: string): boolean {
    return this.queue.some((process) => process.id === processId);
  }

  isEmpty(): boolean {
    return !!this.queue.length;
  }

  size(): number {
    return this.queue.length;
  }
}
