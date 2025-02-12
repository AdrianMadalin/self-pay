import { Component, inject } from '@angular/core';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'app-search-input',
  template: `
    <input
      type="text"
      placeholder="Search locations..."
      (input)="onSearchChange($event)"
      class="w-full p-2 min-w-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
  `,
})
export class SearchInputComponent {
  private _locationService: LocationsService = inject(LocationsService);

  public onSearchChange(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this._locationService.setSearchQuery(query);
  }
}
