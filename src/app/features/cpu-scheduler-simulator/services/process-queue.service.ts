import { Injectable, signal } from '@angular/core';
import { Process, ProcessQueue } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ProcessQueueService implements ProcessQueue {
  queue = signal<Process[]>([]);

  add(process: Process): void {
    this.queue.update((q) => [...q, process]);
  }

  remove(processId: string): void {
    this.queue.update((q) => q.filter((process) => process.id !== processId));
  }

  clear(): void {
    this.queue.set([]);
  }

  peek(): Process | null {
    return this.queue()[0] ?? null;
  }

  contains(processId: string): boolean {
    return this.queue().some((process) => process.id === processId);
  }

  isEmpty(): boolean {
    return this.queue().length === 0;
  }

  size(): number {
    return this.queue().length;
  }
}
