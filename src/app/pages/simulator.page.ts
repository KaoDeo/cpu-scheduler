import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {
  ProcessQueueService,
  RandomProcessGeneratorService,
} from '../services';
import { ProcessFieldsEnum } from '../types';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.page.html',
  styleUrls: ['./simulator.page.scss'],
  imports: [
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class SimulatorPage {
  displayedColumns = [
    ProcessFieldsEnum.Id,
    ProcessFieldsEnum.Name,
    ProcessFieldsEnum.ArrivalTime,
    ProcessFieldsEnum.BurstTime,
    ProcessFieldsEnum.Priority,
    ProcessFieldsEnum.CompletionTime,
    ProcessFieldsEnum.WaitingTime,
    ProcessFieldsEnum.TurnaroundTime,
  ];

  algorithms = [
    { value: 'fcfs', viewValue: 'First Come First Serve' },
    { value: 'sjf', viewValue: 'Shortest Job First' },
    { value: 'rr', viewValue: 'Round Robin' },
    { value: 'priority', viewValue: 'Priority Scheduling' },
  ];

  algoCtlr = new FormControl('');

  constructor(
    private randomProcessGeneratorService: RandomProcessGeneratorService,
    public processQueueService: ProcessQueueService
  ) {}

  get dataSource() {
    return this.processQueueService.queue();
  }

  ngOnInit(): void {
    this.randomProcessGeneratorService.startGenerating();
  }
}
