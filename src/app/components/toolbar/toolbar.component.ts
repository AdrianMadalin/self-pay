import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input.component';
import { LocationsService } from '../../services/locations.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-toolbar',
  imports: [SearchInputComponent],
  template: `
    <div
      class="flex w-full justify-between items-center p-4 mt-2 border-2 border-gray-300 rounded-lg shadow-sm bg-white">
      <h3 class="text-lg font-semibold text-gray-700">Self Pay Kiosk Selector</h3>

      <app-search-input></app-search-input>

      <button
        class="p-2 rounded-md w-24 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed hover:cursor-pointer"
        [disabled]="isDisabled"
        (click)="onSave()">
        Save
      </button>
    </div>
  `,
})
export class ToolbarComponent implements OnInit {
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  private _locationService: LocationsService = inject(LocationsService);
  public isDisabled: boolean = true;

  public ngOnInit() {
    this._locationService
      .getSelectedLocations()
      .pipe(untilDestroyed(this))
      .subscribe(selectedLocations => {
        this.isDisabled = selectedLocations.length === 0;
      });
  }

  public onSave(): void {
    this._locationService.logSelectedLocations();
  }
}
