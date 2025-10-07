import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'pokemon_favorites';
  private favoritesSubject = new BehaviorSubject<number[]>(this.getFavoritesFromStorage());

  constructor() {
  }

  /**
   * Obtiene la lista de favoritos desde localStorage
   */
  private getFavoritesFromStorage(): number[] {
    try {
      const favorites = localStorage.getItem(this.STORAGE_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      return [];
    }
  }

  /**
   * Guarda la lista de favoritos en localStorage
   */
  private saveFavoritesToStorage(favorites: number[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
    }
  }

  /**
   * Observable para escuchar cambios en los favoritos
   */
  get favorites$(): Observable<number[]> {
    return this.favoritesSubject.asObservable();
  }

  /**
   * Obtiene la lista actual de favoritos
   */
  getFavorites(): number[] {
    return this.favoritesSubject.value;
  }

  /**
   * Agrega un pokémon a favoritos
   */
  addToFavorites(pokemonId: number): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(pokemonId)) {
      const newFavorites = [...favorites, pokemonId];
      this.favoritesSubject.next(newFavorites);
      this.saveFavoritesToStorage(newFavorites);
    }
  }

  /**
   * Remueve un pokémon de favoritos
   */
  removeFromFavorites(pokemonId: number): void {
    const favorites = this.getFavorites();
    const newFavorites = favorites.filter(id => id !== pokemonId);
    this.favoritesSubject.next(newFavorites);
    this.saveFavoritesToStorage(newFavorites);
  }

  /**
   * Verifica si un pokémon está en favoritos
   */
  isFavorite(pokemonId: number): boolean {
    return this.getFavorites().includes(pokemonId);
  }

  /**
   * Alterna el estado de favorito de un pokémon
   */
  toggleFavorite(pokemonId: number): void {
    if (this.isFavorite(pokemonId)) {
      this.removeFromFavorites(pokemonId);
    } else {
      this.addToFavorites(pokemonId);
    }
  }

  /**
   * Limpia todos los favoritos
   */
  clearFavorites(): void {
    this.favoritesSubject.next([]);
    this.saveFavoritesToStorage([]);
  }
}
