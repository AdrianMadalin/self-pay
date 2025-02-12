import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { LocationModel } from '../../models/location.model';
import { LocationsService } from '../../services/locations.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
})
export class LocationComponent implements OnInit, OnDestroy {
  @Input({ required: true }) location!: LocationModel;
  public isSelected = false;

  private _locationsService: LocationsService = inject(LocationsService);
  private destroy$ = new Subject<void>();

  public ngOnInit() {
    this._locationsService
      .getSelectedLocations()
      .pipe(takeUntil(this.destroy$))
      .subscribe(selectedLocations => {
        this.isSelected = selectedLocations.some(l => l.locationId === this.location.locationId);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onCheckboxChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this._locationsService.toggleLocationSelection(this.location, isChecked);
  }
}
