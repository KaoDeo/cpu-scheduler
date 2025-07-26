import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseLayoutComponent } from './components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BaseLayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
