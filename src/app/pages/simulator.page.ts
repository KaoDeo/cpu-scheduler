import { Component } from '@angular/core';
import { ProcessQueueService } from '../services';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.page.html',
  styleUrls: ['./simulator.page.scss'],
})
export class SimulatorPage {
  constructor(private processQueueService: ProcessQueueService) {}
}
