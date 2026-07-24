import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import type { GiphyResponse } from '../intefaces/giphy.interfaces';
import { environment } from '@environments/environment';
import { Gif } from '../intefaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

@Service()
export class GifsService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  constructor() {
    this.loadTrendingGifs();
  }

  public loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20
      }
    }).subscribe({
      next: (resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.set(gifs);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Observable completed');
        this.trendingGifsLoading.set(false);
      }
    })
  }
}
