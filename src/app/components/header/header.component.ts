import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../pipes/translate.pipe';

export type ViewMode = 'all' | 'favorites';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() availableTypes: string[] = [];
  @Input() currentView: ViewMode = 'all';
  @Input() selectedType: string = '';
  @Input() searchTerm: string = '';
  @Input() pokemonLimit: number = 50;
  
  @Output() viewChanged = new EventEmitter<ViewMode>();
  @Output() typeFilterChanged = new EventEmitter<string>();
  @Output() searchTermChanged = new EventEmitter<string>();
  @Output() pokemonLimitChanged = new EventEmitter<number>();

  quantityOptions: number[] = [10, 25, 50, 100, 200];

  onViewChange(view: ViewMode): void {
    this.viewChanged.emit(view);
  }

  onTypeChange(type: string): void {
    this.selectedType = type;
    this.typeFilterChanged.emit(type);
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.searchTerm = target.value;
      this.searchTermChanged.emit(target.value);
    }
  }

  onLimitChange(limit: number): void {
    this.pokemonLimitChanged.emit(limit);
  }

  clearFilters(): void {
    this.selectedType = '';
    this.searchTerm = '';
    this.typeFilterChanged.emit('');
    this.searchTermChanged.emit('');
    this.pokemonLimitChanged.emit(50);
  }
}