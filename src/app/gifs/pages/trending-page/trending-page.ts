import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifList } from '../../components/gif-list/gif-list';
import { GifsService } from '../../services/gifs-service';

@Component({
  selector: 'app-trending-page',
  imports: [],
  templateUrl: './trending-page.html',
})
export default class TrendingPage {

  public gifService = inject(GifsService);

  scrollDivRef = viewChild<ElementRef>('groupDiv');

  public onScroll(event: Event) {
    const scrolDiv = this.scrollDivRef()?.nativeElement;
    console.log(scrolDiv);

  }
}
