import { TestBed } from '@angular/core/testing';
import { FavoritesService } from '../favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add favorite', () => {
    service.addToFavorites(1);
    expect(service.isFavorite(1)).toBe(true);
  });

  it('should remove favorite', () => {
    service.addToFavorites(1);
    service.removeFromFavorites(1);
    expect(service.isFavorite(1)).toBe(false);
  });

  it('should toggle favorite', () => {
    service.clearFavorites();
    
    expect(service.isFavorite(1)).toBe(false);
    service.toggleFavorite(1);
    expect(service.isFavorite(1)).toBe(true);
    service.toggleFavorite(1);
    expect(service.isFavorite(1)).toBe(false);
  });

  it('should get favorites list', () => {
    service.addToFavorites(1);
    service.addToFavorites(2);
    const favorites = service.getFavorites();
    expect(favorites).toEqual([1, 2]);
  });

  it('should clear all favorites', () => {
    service.addToFavorites(1);
    service.addToFavorites(2);
    service.clearFavorites();
    expect(service.getFavorites()).toEqual([]);
  });
});
