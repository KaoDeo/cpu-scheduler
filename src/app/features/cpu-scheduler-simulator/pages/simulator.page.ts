import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { DialogContentComponent } from '../components';
import {
  AlgorithmFactoryService,
  ProcessQueueService,
  RandomProcessGeneratorService,
} from '../services';
import {
  AlgorithmsEnum,
  Process,
  ProcessFieldsEnum,
  SchedulingAlgorithms,
} from '../types';

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
    MatChipsModule,
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
    ProcessFieldsEnum.Quantum,
    ProcessFieldsEnum.Priority,
    ProcessFieldsEnum.State,
    'action',
  ];

  execDisplayedColumns = [
    ProcessFieldsEnum.Id,
    ProcessFieldsEnum.Name,
    ProcessFieldsEnum.ArrivalTime,
    ProcessFieldsEnum.BurstTime,
    ProcessFieldsEnum.Quantum,
    ProcessFieldsEnum.Priority,
    ProcessFieldsEnum.State,
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
    private algorithmFactory: AlgorithmFactoryService,
    private cd: ChangeDetectorRef
  ) {
    this.algoCtlr.valueChanges.subscribe((value) => {
      if (value) {
        this.handleValueChange(value as AlgorithmsEnum);
      }
    });
  }

  execQueue = signal<Process[]>([]);

  get dataSource() {
    return this.processQueueService.queue();
  }

  ngOnInit(): void {
    this.randomProcessGeneratorService.startGenerating();
  }

  handleValueChange(value: AlgorithmsEnum) {
    this.currentAlgorithm = this.algorithmFactory.createAlgorithm(value);
    if (this.currentAlgorithm.onSelected) {
      const updatedProcesses = this.currentAlgorithm.onSelected(
        this.dataSource
      );

      this.execQueue.set([...updatedProcesses]);
      this.cd.detectChanges();
    }
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
