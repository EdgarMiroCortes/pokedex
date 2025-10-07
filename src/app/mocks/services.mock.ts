import { of, throwError } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';
import { FavoritesService } from '../services/favorites.service';
import { TranslationService } from '../services/translation.service';
import { mockPokemon, mockPokemonListResponse } from './pokemon.mock';

export class MockPokemonService {
  getPokemonDetail = jasmine.createSpy('getPokemonDetail').and.returnValue(of(mockPokemon));
}

export class MockFavoritesService {
  favorites$ = of([1, 2, 3]);
  getFavorites = jasmine.createSpy('getFavorites').and.returnValue([1, 2, 3]);
  isFavorite = jasmine.createSpy('isFavorite').and.returnValue(true);
  addToFavorites = jasmine.createSpy('addToFavorites');
  removeFromFavorites = jasmine.createSpy('removeFromFavorites');
  toggleFavorite = jasmine.createSpy('toggleFavorite');
  clearFavorites = jasmine.createSpy('clearFavorites');
  getFavoritesObservable = jasmine.createSpy('getFavoritesObservable').and.returnValue(of([1, 2, 3]));
}

export class MockTranslationService {
  getTranslation = jasmine.createSpy('getTranslation').and.returnValue('Mock Translation');
}

export const mockServices = {
  PokemonService: MockPokemonService,
  FavoritesService: MockFavoritesService,
  TranslationService: MockTranslationService
};
