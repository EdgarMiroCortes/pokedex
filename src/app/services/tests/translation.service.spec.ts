import { TestBed } from '@angular/core/testing';
import { TranslationService } from '../translation.service';

describe('TranslationService', () => {
  let service: TranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslationService]
    });
    service = TestBed.inject(TranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return translation for existing key', () => {
    const result = service.getTranslation('filters.all');
    expect(result).toBe('Tots');
  });

  it('should return key for non-existing translation', () => {
    const result = service.getTranslation('non.existing.key');
    expect(result).toBe('non.existing.key');
  });

  it('should return pokemon translations', () => {
    expect(service.getTranslation('pokemon.view_details')).toBe('Veure Detalls');
    expect(service.getTranslation('pokemon.back')).toBe('← Enrere');
    expect(service.getTranslation('pokemon.height')).toBe('Alçada');
  });

  it('should return filter translations', () => {
    expect(service.getTranslation('filters.all')).toBe('Tots');
    expect(service.getTranslation('filters.favorites_short')).toBe('Fav');
    expect(service.getTranslation('filters.search_placeholder')).toBe('Nom pokémon...');
  });
});
