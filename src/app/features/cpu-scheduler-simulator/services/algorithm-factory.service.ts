import { Injectable } from '@angular/core';
import { AlgorithmsEnum, SchedulingAlgorithms } from '../types';
import { FCFSService } from './FCFS.service';
import { SJFService } from './SJF.service';
import { RoundRobinService } from './round-robin.service';
import { PrioritySchedulingService } from './priority-scheduling.service';

@Injectable({
  providedIn: 'root',
})
export class AlgorithmFactoryService {
  constructor(
    private fcfsService: FCFSService,
    private sjfService: SJFService,
    private roundRobinService: RoundRobinService,
    private prioritySchedulingService: PrioritySchedulingService
  ) {}

  createAlgorithm(algorithmType: AlgorithmsEnum): SchedulingAlgorithms {
    switch (algorithmType) {
      case AlgorithmsEnum.Fcfs:
        return this.fcfsService;
      case AlgorithmsEnum.Sjf:
        return this.sjfService;
      case AlgorithmsEnum.Rr:
        return this.roundRobinService;
      case AlgorithmsEnum.Priority:
        return this.prioritySchedulingService;
      default:
        throw new Error(`Unsupported algorithm type: ${algorithmType}`);
    }
  }
}
