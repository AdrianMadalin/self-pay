import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  finalize,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocationModel } from '../models/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private _httpClient: HttpClient = inject(HttpClient);

  private readonly apiUrl: string = 'https://graph.cloud.selfpay.ro/v2/opendata/terminal/locations';
  private searchQuery$ = new BehaviorSubject<string>('');
  private selectedLocations$ = new BehaviorSubject<Array<LocationModel>>([]);
  private selectedLocationsByCity$ = new BehaviorSubject<Array<LocationModel>>([]);
  private loading$ = new BehaviorSubject<boolean>(false);

  public getLocations(): Observable<LocationModel[]> {
    return this.searchQuery$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.loadLocations(query, 5)),
    );
  }

  public loadLocations(query: string = '', chunk: number = 10): Observable<Array<LocationModel>> {
    return this._httpClient.get<Array<LocationModel>>(this.apiUrl).pipe(
      tap(() => this.loading$.next(true)),
      map(locations => {
        const trimmedQuery = query.trim();

        if (!trimmedQuery) return locations.slice(0, chunk);

        const result = locations
          .filter(location => location.name.toLowerCase().includes(query.toLowerCase()))
          .slice(0, chunk);

        this.selectedLocationsByCity$.next(result);

        return result;
      }),
      catchError(error => {
        console.error('Error fetching locations:', error);
        return EMPTY;
      }),
      finalize(() => this.loading$.next(false)),
    );
  }

  public getLoadingState(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  public getLocationsByCity(): Observable<{ [city: string]: Array<LocationModel> }> {
    return this.selectedLocationsByCity$.asObservable().pipe(
      map(locations =>
        locations.reduce(
          (acc, location) => {
            if (!acc[location.city]) {
              acc[location.city] = [];
            }
            acc[location.city].push(location);
            return acc;
          },
          {} as { [city: string]: LocationModel[] },
        ),
      ),
    );
  }

  public setSearchQuery(query: string) {
    this.searchQuery$.next(query);
  }

  public getSelectedLocations(): Observable<LocationModel[]> {
    return this.selectedLocations$.asObservable();
  }

  public toggleLocationSelection(location: LocationModel, isChecked: boolean): void {
    let currentSelections = this.selectedLocations$.getValue();

    if (isChecked) {
      if (!currentSelections.some(l => l.locationId === location.locationId)) {
        currentSelections = [...currentSelections, location];
      }
    } else {
      currentSelections = currentSelections.filter(l => l.locationId !== location.locationId);
    }

    this.selectedLocations$.next(currentSelections);
  }

  public logSelectedLocations(): void {
    console.log('=>selectedLocations$ => ', this.selectedLocations$.getValue());
  }
}
