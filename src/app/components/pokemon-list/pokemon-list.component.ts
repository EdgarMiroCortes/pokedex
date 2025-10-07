import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon, PokemonListItem } from '../../models/pokemon.model';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, TranslatePipe],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {
  @Input() pokemons: Pokemon[] = [];
  @Input() favorites: number[] = [];
  @Input() loading: boolean = false;
  @Input() detailOpen: boolean = false;
  
  @Output() pokemonSelected = new EventEmitter<Pokemon>();
  @Output() favoriteToggled = new EventEmitter<number>();

  onPokemonClick(pokemon: Pokemon): void {
    this.pokemonSelected.emit(pokemon);
  }

  onFavoriteClick(event: Event, pokemonId: number): void {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    this.favoriteToggled.emit(pokemonId);
  }

  isFavorite(pokemonId: number): boolean {
    return this.favorites.includes(pokemonId);
  }

  getPokemonImage(pokemon: Pokemon): string {
    return pokemon.sprites?.front_default || 
           'assets/pokemon-placeholder.png';
  }

  getPokemonTypes(pokemon: Pokemon): string[] {
    return pokemon.types?.map(t => t.type.name) || [];
  }
}
