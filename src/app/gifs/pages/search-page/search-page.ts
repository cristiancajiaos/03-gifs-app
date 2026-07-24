import { Component, inject, signal } from '@angular/core';
import { GifList } from '../../components/gif-list/gif-list';
import { GifsService } from '../../services/gifs-service';
import { Gif } from '../../intefaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifList],
  templateUrl: './search-page.html',
})
export default class SearchPage {

  private gifsService = inject(GifsService);

  gifs = signal<Gif[]>([]);

  onSearch(query: string): void {
    this.gifsService.searchGifs(query).subscribe({
      next: (items) => {
        console.log(items);
        this.gifs.set(items);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Observable complete');
      }
    });
  }
}
