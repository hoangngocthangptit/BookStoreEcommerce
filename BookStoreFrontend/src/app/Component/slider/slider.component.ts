import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor() { }
  slides = [
    {'image': 'https://img.thedailybeast.com/image/upload/v1552084297/afawwwfa_i2oq5t.jpg'},
    {'image': 'https://www.mother.ly/wp-content/uploads/2021/12/ARTICLE-HERO-Viral-News-9.jpg' },
    {'image': 'https://assets.penguinrandomhouse.com/wp-content/uploads/2021/11/29145422/Hidden-Gems_PRH_Site_1200x628.jpg'},
  ];
  ngOnInit(): void {
  }

}
