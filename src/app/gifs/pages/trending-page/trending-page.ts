import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifsService } from '../../services/gifs-service';
import { ScrollStateService } from '../../../shared/services/scroll-state-service';

@Component({
  selector: 'app-trending-page',
  imports: [],
  templateUrl: './trending-page.html',
})
export default class TrendingPage implements AfterViewInit {


  public gifService = inject(GifsService);
  public scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) {
      return;
    }

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  public onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) {
      return;
    }

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }
}
