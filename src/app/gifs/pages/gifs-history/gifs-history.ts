import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-gifs-history',
  imports: [],
  templateUrl: './gifs-history.html',
})
export default class GifsHistory {

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['query'])
    )
  );

}
