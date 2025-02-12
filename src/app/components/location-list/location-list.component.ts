import { Component, inject } from '@angular/core';
import { LocationsService } from '../../services/locations.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { LocationComponent } from '../location/location.component';
import { LoadingComponent } from '../loading/loading.component';
import { map, Observable } from 'rxjs';
import { GroupCardComponent } from '../group-card/group-card.component';
import { LocationModel } from '../../models/location.model';

@Component({
  selector: 'app-location-list',
  imports: [AsyncPipe, LocationComponent, LoadingComponent, GroupCardComponent, NgIf],
  templateUrl: './location-list.component.html',
})
export class LocationListComponent {
  private _locationService: LocationsService = inject(LocationsService);

  public isLoadingComplete$: Observable<boolean> = this._locationService
    .getLoadingState()
    .pipe(map(loading => !loading));

  public locations$ = this._locationService.getLocations();

  public groupedLocations$: Observable<{ [city: string]: Array<LocationModel> }> =
    this._locationService.getLocationsByCity();

  public cityNames$: Observable<string[]> = this.groupedLocations$.pipe(
    map(groupedLocations => Object.keys(groupedLocations)),
  );
}
