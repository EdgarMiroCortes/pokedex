import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { TranslationService } from '../../services/translation.service';
import { mockPokemon, mockPokemons } from '../../mocks/pokemon.mock';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent, HttpClientTestingModule],
      providers: [
        { provide: TranslationService, useValue: { getTranslation: () => 'Mock Translation' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pokemon selected event', () => {
    spyOn(component.pokemonSelected, 'emit');
    component.onPokemonClick(mockPokemon);
    
    expect(component.pokemonSelected.emit).toHaveBeenCalledWith(mockPokemon);
  });

  it('should emit favorite toggled event', () => {
    spyOn(component.favoriteToggled, 'emit');
    const event = new Event('click');
    spyOn(event, 'stopPropagation');
    
    component.onFavoriteClick(event, 1);
    
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.favoriteToggled.emit).toHaveBeenCalledWith(1);
  });

  it('should check if pokemon is favorite', () => {
    component.favorites = [1, 2, 3];
    
    expect(component.isFavorite(1)).toBe(true);
    expect(component.isFavorite(4)).toBe(false);
  });

  it('should get pokemon image', () => {
    const imageUrl = component.getPokemonImage(mockPokemon);
    expect(imageUrl).toBe(mockPokemon.sprites?.front_default);
  });

  it('should get pokemon types', () => {
    const types = component.getPokemonTypes(mockPokemon);
    expect(types).toEqual(['grass', 'poison']);
  });

  it('should return empty array for pokemon without types', () => {
    const pokemonWithoutTypes = { ...mockPokemon, types: [] };
    const types = component.getPokemonTypes(pokemonWithoutTypes);
    expect(types).toEqual([]);
  });

  it('should display loading spinner when loading', () => {
    component.loading = true;
    component.pokemons = [];
    fixture.detectChanges();
    
    const loadingElement = fixture.nativeElement.querySelector('app-loading-spinner');
    expect(loadingElement).toBeTruthy();
  });

  it('should display no results message when no pokemons', () => {
    component.loading = false;
    component.pokemons = [];
    fixture.detectChanges();
    
    const noResultsElement = fixture.nativeElement.querySelector('.no-results-container');
    expect(noResultsElement).toBeTruthy();
  });

  it('should display pokemon list when pokemons available', () => {
    component.loading = false;
    component.pokemons = mockPokemons;
    fixture.detectChanges();
    
    const pokemonCards = fixture.nativeElement.querySelectorAll('.pokemon-card');
    expect(pokemonCards.length).toBe(2);
  });

  it('should apply correct grid classes when detail is open', () => {
    component.detailOpen = true;
    component.pokemons = mockPokemons;
    fixture.detectChanges();
    
    const pokemonCards = fixture.nativeElement.querySelectorAll('.pokemon-card');
    const parentDiv = pokemonCards[0].parentElement;
    expect(parentDiv.className).toContain('col-lg-3');
  });

  it('should apply correct grid classes when detail is closed', () => {
    component.detailOpen = false;
    component.pokemons = mockPokemons;
    fixture.detectChanges();
    
    const pokemonCards = fixture.nativeElement.querySelectorAll('.pokemon-card');
    const parentDiv = pokemonCards[0].parentElement;
    expect(parentDiv.className).toContain('col-xl-1-5');
  });
});
