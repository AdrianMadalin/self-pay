import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="flex flex-col justify-center items-center">
      <div
        class="animate-spin rounded-full border-4 border-gray-300 border-t-blue-500 border-r-blue-500"
        [ngClass]="sizeClass"></div>
      @if (showText) {
        <p class="mt-2 text-blue-500 font-medium">Loading...</p>
      }
    </div>
  `,
})
export class LoadingComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() showText: boolean = true;

  get sizeClass() {
    return {
      'w-6 h-6 border-2': this.size === 'sm',
      'w-12 h-12 border-4': this.size === 'md',
      'w-16 h-16 border-4': this.size === 'lg',
    };
  }
}
