import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs-service';
import { GifList } from '../../components/gif-list/gif-list';

@Component({
  selector: 'app-gifs-history',
  imports: [GifList],
  templateUrl: './gifs-history.html',
})
export default class GifsHistory {

  gifsService = inject(GifsService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['query'])
    )
  );

  gifsByKey = computed(() => {
    return this.gifsService.getHistoryGifs(this.query())
  })

}
