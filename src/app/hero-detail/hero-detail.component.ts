import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../heroes/hero.service';
import { Hero } from '../heroes/hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor(private heroService: HeroService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {

    this.getHero();

  }

  getHero(): void {

    const idHero = +this.route.snapshot.paramMap.get('id');

    this.heroService.getHero(idHero)
          .subscribe(hero => {this.hero = hero;
          // console.log('id del heroe', this.hero.id);
          });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

}
