import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';
import { Observable, of} from 'rxjs';
import { MessageService } from '../messages/message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HeroService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

    private heroesUrl = 'api/heroes';
    private httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    getHeroes(): Observable<Hero[]> {

      return this.http.get<Hero[]>(this.heroesUrl)
        .pipe(
          tap(_ => this.log('fetched heroes')), // Leer de nuevo sobre 'tap'
          catchError(this.handleError('getHeroes', []))
        );
    }

    getHero( id: number): Observable<Hero> {
      const url = `${this.heroesUrl}/${id}`;
      return this.http.get<Hero>(url)
        .pipe(
          tap(_ => this.log(`fetched hero id=${id}`)),
          catchError(this.handleError<Hero>(`getHero id= ${id}`))
        );
    }

    updateHero(hero: Hero ): Observable<any> {
      return this.http.put(this.heroesUrl, hero, this.httpOptions)
        .pipe(
          tap(_ => this.log(`update Hero id=${hero.id}`)),
          catchError(this.handleError<any>('updateHero'))
        );
    }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
