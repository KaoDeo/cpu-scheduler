import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { AlgorithmsEnum, Process, ProcessFieldsEnum } from '../types';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  ProcessQueueService,
  RandomProcessGeneratorService,
  AlgorithmFactoryService,
} from '../services';
import { SchedulingAlgorithms } from '../types';
import { DialogContentComponent } from '../components';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.page.html',
  styleUrls: ['./simulator.page.scss'],
  imports: [
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class SimulatorPage {
  processFieldsEnum = ProcessFieldsEnum;

  displayedColumns = [
    ProcessFieldsEnum.Id,
    ProcessFieldsEnum.Name,
    ProcessFieldsEnum.ArrivalTime,
    ProcessFieldsEnum.BurstTime,
    ProcessFieldsEnum.Priority,
    'action',
  ];

  algorithms = [
    { value: AlgorithmsEnum.Fcfs, viewValue: 'First Come First Serve' },
    { value: AlgorithmsEnum.Sjf, viewValue: 'Shortest Job First' },
    { value: AlgorithmsEnum.Rr, viewValue: 'Round Robin' },
    { value: AlgorithmsEnum.Priority, viewValue: 'Priority Scheduling' },
  ];

  algoCtlr = new FormControl('', Validators.required);
  currentAlgorithm: SchedulingAlgorithms | null = null;

  constructor(
    private randomProcessGeneratorService: RandomProcessGeneratorService,
    public processQueueService: ProcessQueueService,
    private dialog: MatDialog,
    private algorithmFactory: AlgorithmFactoryService
  ) {
    this.algoCtlr.valueChanges.subscribe((value) => {
      if (value) {
        this.currentAlgorithm = this.algorithmFactory.createAlgorithm(
          value as AlgorithmsEnum
        );

        switch (value) {
          case AlgorithmsEnum.Fcfs:
          case AlgorithmsEnum.Rr:
          case AlgorithmsEnum.Priority:
            return;

          case AlgorithmsEnum.Sjf:
            const sortedProcesses = [...this.dataSource].sort(
              (a, b) => a.burstTime - b.burstTime
            );
            this.processQueueService.queue.set(sortedProcesses);
            break;
        }
      }
    });
  }

  get dataSource() {
    return this.processQueueService.queue();
  }

  ngOnInit(): void {
    this.randomProcessGeneratorService.startGenerating();
  }

  onActionClick(element: Process, index: number) {
    const prevElement = index > 0 ? this.dataSource[index - 1] : null;

    if (this.currentAlgorithm) {
      const stats = this.currentAlgorithm.getStats(element, prevElement);

      this.dialog.open(DialogContentComponent, {
        data: {
          stats: stats,
        },

        width: '800px',
        maxHeight: '800px',
      });
    }
  }
}
