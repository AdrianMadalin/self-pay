import { Component } from '@angular/core';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LocationListComponent } from './components/location-list/location-list.component';

@Component({
  selector: 'app-root',
  imports: [ToolbarComponent, LocationListComponent],
  template: `
    <div class="flex flex-col w-full px-8 py-4 bg-white shadow-md rounded-lg border border-gray-200">
      <app-toolbar class="mb-4"></app-toolbar>

      <app-location-list class="flex-1"></app-location-list>
    </div>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {}
