import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { TranslationService } from '../../services/translation.service';
import { mockPokemon } from '../../mocks/pokemon.mock';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailComponent, HttpClientTestingModule],
      providers: [
        { provide: TranslationService, useValue: { getTranslation: () => 'Mock Translation' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit back clicked event', () => {
    spyOn(component.backClicked, 'emit');
    component.onBackClick();
    
    expect(component.backClicked.emit).toHaveBeenCalled();
  });

  it('should emit favorite toggled event', () => {
    component.pokemon = mockPokemon;
    spyOn(component.favoriteToggled, 'emit');
    
    component.onFavoriteClick();
    
    expect(component.favoriteToggled.emit).toHaveBeenCalledWith(mockPokemon.id);
  });

  it('should get pokemon image', () => {
    component.pokemon = mockPokemon;
    const imageUrl = component.getPokemonImage();
    expect(imageUrl).toBe(mockPokemon.sprites?.other?.['official-artwork']?.front_default);
  });

  it('should get pokemon images array', () => {
    component.pokemon = mockPokemon;
    const images = component.getPokemonImages();
    
    expect(images.length).toBeGreaterThan(0);
    expect(images).toContain(mockPokemon.sprites?.front_default);
  });

  it('should get pokemon types', () => {
    component.pokemon = mockPokemon;
    const types = component.getPokemonTypes();
    expect(types).toEqual(['grass', 'poison']);
  });

  it('should get pokemon stats', () => {
    component.pokemon = mockPokemon;
    const stats = component.getPokemonStats();
    
    expect(stats.length).toBe(6);
    expect(stats[0].name).toBe('hp');
    expect(stats[0].value).toBe(45);
  });

  it('should calculate stat percentage', () => {
    const percentage = component.getStatPercentage(50, 100);
    expect(percentage).toBe(50);
  });

  it('should format height', () => {
    const formattedHeight = component.formatHeight(70);
    expect(formattedHeight).toBe('7.0 m');
  });

  it('should format weight', () => {
    const formattedWeight = component.formatWeight(690);
    expect(formattedWeight).toBe('69.0 kg');
  });

  it('should get current image', () => {
    component.pokemon = mockPokemon;
    component.currentImageIndex = 0;
    
    const currentImage = component.getCurrentImage();
    expect(currentImage).toBeTruthy();
  });

  it('should navigate to next image', () => {
    component.pokemon = mockPokemon;
    component.currentImageIndex = 0;
    
    component.nextImage();
    expect(component.currentImageIndex).toBe(1);
  });

  it('should navigate to previous image', () => {
    component.pokemon = mockPokemon;
    component.currentImageIndex = 1;
    
    component.previousImage();
    expect(component.currentImageIndex).toBe(0);
  });

  it('should go to specific image', () => {
    component.pokemon = mockPokemon;
    component.goToImage(2);
    expect(component.currentImageIndex).toBe(2);
  });

  it('should get primary type', () => {
    component.pokemon = mockPokemon;
    const primaryType = component.getPrimaryType();
    expect(primaryType).toBe('grass');
  });

  it('should return normal as default primary type', () => {
    const pokemonWithoutTypes = { ...mockPokemon, types: [] };
    component.pokemon = pokemonWithoutTypes;
    const primaryType = component.getPrimaryType();
    expect(primaryType).toBe('normal');
  });

  it('should display loading spinner when loading', () => {
    component.loading = true;
    component.pokemon = null;
    fixture.detectChanges();
    
    const loadingElement = fixture.nativeElement.querySelector('app-loading-spinner');
    expect(loadingElement).toBeTruthy();
  });

  it('should display no pokemon selected message', () => {
    component.loading = false;
    component.pokemon = null;
    fixture.detectChanges();
    
    const noSelectionElement = fixture.nativeElement.querySelector('.text-muted');
    expect(noSelectionElement).toBeTruthy();
  });

  it('should display pokemon details when pokemon is selected', () => {
    component.pokemon = mockPokemon;
    fixture.detectChanges();
    
    const pokemonName = fixture.nativeElement.querySelector('h1');
    expect(pokemonName.textContent).toContain('Bulbasaur');
  });

  it('should display favorite button with correct state', () => {
    component.pokemon = mockPokemon;
    component.isFavorite = true;
    fixture.detectChanges();
    
    const favoriteButton = fixture.nativeElement.querySelector('.btn-danger');
    expect(favoriteButton).toBeTruthy();
  });
});
