import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, TranslatePipe],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent {
  @Input() pokemon: Pokemon | null = null;
  @Input() isFavorite: boolean = false;
  @Input() loading: boolean = false;

  @Output() backClicked = new EventEmitter<void>();
  @Output() favoriteToggled = new EventEmitter<number>();

  currentImageIndex: number = 0;

  onBackClick(): void {
    this.backClicked.emit();
  }

  onFavoriteClick(): void {
    if (this.pokemon) {
      this.favoriteToggled.emit(this.pokemon.id);
    }
  }

  getPokemonImage(): string {
    if (!this.pokemon) return '';
    return this.pokemon.sprites?.other?.['official-artwork']?.front_default || 
           this.pokemon.sprites?.front_default || 
           'assets/pokemon-placeholder.png';
  }

  getPokemonImages(): string[] {
    if (!this.pokemon) return [];
    const images: string[] = [];
    
    if (this.pokemon.sprites?.other?.['official-artwork']?.front_default) {
      images.push(this.pokemon.sprites.other['official-artwork'].front_default);
    }
    
    if (this.pokemon.sprites?.front_default) {
      images.push(this.pokemon.sprites.front_default);
    }
    
    const officialArtwork = this.pokemon.sprites?.other?.['official-artwork'] as any;
    if (officialArtwork?.front_shiny) {
      images.push(officialArtwork.front_shiny);
    }
    
    if (this.pokemon.sprites?.front_shiny) {
      images.push(this.pokemon.sprites.front_shiny);
    }
    
    return [...new Set(images)];
  }

  getPokemonTypes(): string[] {
    if (!this.pokemon) return [];
    return this.pokemon.types?.map(t => t.type.name) || [];
  }

  getPokemonStats() {
    if (!this.pokemon) return [];
    return this.pokemon.stats?.map(stat => ({
      name: stat.stat.name.replace('-', ' '),
      value: stat.base_stat,
      maxValue: 255
    })) || [];
  }

  getStatPercentage(value: number, maxValue: number = 255): number {
    return (value / maxValue) * 100;
  }

  formatHeight(height: number): string {
    return `${(height / 10).toFixed(1)} m`;
  }

  formatWeight(weight: number): string {
    return `${(weight / 10).toFixed(1)} kg`;
  }

  getCurrentImage(): string {
    const images = this.getPokemonImages();
    return images[this.currentImageIndex] || '';
  }

  nextImage(): void {
    const images = this.getPokemonImages();
    if (this.currentImageIndex < images.length - 1) {
      this.currentImageIndex++;
    }
  }

  previousImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  goToImage(index: number): void {
    this.currentImageIndex = index;
  }

  getPrimaryType(): string {
    if (!this.pokemon || !this.pokemon.types || this.pokemon.types.length === 0) {
      return 'normal';
    }
    return this.pokemon.types[0].type.name;
  }
}
