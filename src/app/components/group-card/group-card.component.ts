import { Component, Input } from '@angular/core';
import { LocationModel } from '../../models/location.model';

@Component({
  selector: 'app-group-card',
  template: `
    <div class="bg-white border border-gray-300 rounded-lg shadow-md p-4 w-full max-w-md">
      <h3 class="text-xl font-semibold text-blue-600 mb-3">{{ city }}</h3>
      <ul class="space-y-2">
        @for (location of locations; track location.locationId) {
          <li class="p-2 border-b last:border-none">
            {{ location.name }}
          </li>
        }
      </ul>
    </div>
  `,
})
export class GroupCardComponent {
  @Input() city!: string;
  @Input() locations: Array<LocationModel> = [];
}
