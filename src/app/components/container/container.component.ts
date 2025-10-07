import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, combineLatest } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { FavoritesService } from '../../services/favorites.service';
import { Pokemon } from '../../models/pokemon.model';
import { HeaderComponent, ViewMode } from '../header/header.component';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    PokemonListComponent,
    PokemonDetailComponent
  ],
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Data
  allPokemons: Pokemon[] = [];
  favoritePokemons: Pokemon[] = [];
  availableTypes: string[] = [];
  favorites: number[] = [];

  // UI State
  currentView: ViewMode = 'all';
  selectedPokemon: Pokemon | null = null;
  selectedType: string = '';
  searchTerm: string = '';
  pokemonLimit: number = 50;
  loading: boolean = false;
  error: string | null = null;

  // Computed properties
  get displayedPokemons(): Pokemon[] {
    if (this.currentView === 'favorites') {
      return this.favoritePokemons;
    }
    return this.allPokemons;
  }

  get filteredPokemons(): Pokemon[] {
    let pokemons = this.displayedPokemons;

    // Filter by type
    if (this.selectedType) {
      pokemons = pokemons.filter(pokemon => 
        pokemon.types?.some(type => type.type.name === this.selectedType)
      );
    }

    // Filter by search term
    if (this.searchTerm) {
      pokemons = pokemons.filter(pokemon => 
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    return pokemons;
  }

  constructor(
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
    this.subscribeToFavorites();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadInitialData(): void {
    this.loading = true;
    this.error = null;
    
    const pokemonDetails$ = [];
    for (let i = 1; i <= this.pokemonLimit; i++) {
      pokemonDetails$.push(this.pokemonService.getPokemonDetail(i));
    }

    combineLatest(pokemonDetails$)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (pokemonDetails) => {
          this.allPokemons = pokemonDetails;
          this.updateAvailableTypes();
          this.updateFavoritePokemons();
          this.loading = false;
          this.error = null;
        },
        error: (error) => {
          this.loading = false;
          this.error = 'Error al cargar los pokémons. Por favor, inténtalo de nuevo.';
        }
      });
  }

  private loadPokemonsWithLimit(limit: number): void {
    this.loading = true;
    this.allPokemons = [];
    this.error = null;
    
    const pokemonDetails$ = [];
    for (let i = 1; i <= limit; i++) {
      pokemonDetails$.push(this.pokemonService.getPokemonDetail(i));
    }

    combineLatest(pokemonDetails$)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (pokemonDetails) => {
          this.allPokemons = pokemonDetails;
          this.updateAvailableTypes();
          this.updateFavoritePokemons();
          this.loading = false;
          this.error = null;
        },
        error: (error) => {
          this.loading = false;
          this.error = 'Error al cargar los pokémons. Por favor, inténtalo de nuevo.';
        }
      });
  }

  private subscribeToFavorites(): void {
    this.favoritesService.favorites$
      .pipe(takeUntil(this.destroy$))
      .subscribe(favorites => {
        this.favorites = favorites;
        this.updateFavoritePokemons();
      });
  }

  private updateFavoritePokemons(): void {
    this.favoritePokemons = this.allPokemons.filter(pokemon =>
      this.favorites.includes(pokemon.id)
    );
  }

  private updateAvailableTypes(): void {
    const typeSet = new Set<string>();
    this.allPokemons.forEach(pokemon => {
      if (pokemon.types) {
        pokemon.types.forEach(type => {
          typeSet.add(type.type.name);
        });
      }
    });
    this.availableTypes = Array.from(typeSet).sort();
  }

  onViewChanged(view: ViewMode): void {
    this.currentView = view;
    // Solo resetear el pokemon seleccionado si no está en la nueva vista
    if (this.selectedPokemon && !this.displayedPokemons.includes(this.selectedPokemon)) {
      this.selectedPokemon = null;
    }
  }

  onTypeFilterChanged(type: string): void {
    this.selectedType = type;
    // Si el pokemon seleccionado no está en los resultados filtrados, deseleccionarlo
    if (this.selectedPokemon && !this.filteredPokemons.includes(this.selectedPokemon)) {
      this.selectedPokemon = null;
    }
  }

  onSearchTermChanged(term: string): void {
    this.searchTerm = term;
    // Si el pokemon seleccionado no está en los resultados filtrados, deseleccionarlo
    if (this.selectedPokemon && !this.filteredPokemons.includes(this.selectedPokemon)) {
      this.selectedPokemon = null;
    }
  }

  onPokemonLimitChanged(limit: number): void {
    this.pokemonLimit = limit;
    this.loadPokemonsWithLimit(limit);
  }

  retryLoad(): void {
    this.loadInitialData();
  }

  onPokemonSelected(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
  }

  onBackClicked(): void {
    this.selectedPokemon = null;
  }

  onFavoriteToggled(pokemonId: number): void {
    this.favoritesService.toggleFavorite(pokemonId);
  }
}