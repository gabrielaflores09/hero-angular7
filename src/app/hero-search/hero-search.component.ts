import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../heroes/hero';
import { HeroService } from '../heroes/hero.service';

@Component({
    selector: 'app-hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css']
})

export class HeroSearchComponent implements OnInit {

    heores$: Observable<Hero[]>;
    private searchTerms = new Subject<string>();

    constructor(private heroService: HeroService ) { }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {

        this.heores$ = this.searchTerms.pipe(
            // Espera 300 ms después de cada pulsación antes de considerar el término
            debounceTime(300),
            // Ignora el nuevo término si es igual al término anterior
            distinctUntilChanged(),
            // Cambia a nueva búsqueda observable cada vez que cambia el término
            switchMap((term: string) =>
            this.heroService.searchHeroes(term)),
        );

    }
}
