import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';
import { Observable, of} from 'rxjs';
import { MessageService } from '../messages/message.service';

@Injectable()
export class HeroService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

    private heroesUrl = '/api/heroes';

    getHeroes(): Observable<Hero[]> {

      return this.http.get<Hero[]>(this.heroesUrl);
    }

    getHero( id: number): Observable<Hero> {
      this.messageService.add(`HeroService: fetched hero id=${id}`);
      return of(Heroes.find(hero => hero.id === id));
    }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
