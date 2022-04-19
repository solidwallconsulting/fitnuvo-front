import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  bests = [
    {
      id: "1",
      image:'/assets/site/img/hero/trainer1.png',
      name:'Frridy',
      price:'47',
      review:'18',
      speciality:"Workout",
      experience:"3",
      location:"130-138 Newington Butts, London (SnapFitness Elephant..."

    },
    {
      id: "2",
      image:'/assets/site/img/hero/trainer2.png',
      name:'Viktoria Banr',
      price:'47',
      review:'18',
      speciality:"Workout",
      experience:"3",
      location:"130-138 Newington Butts, London (SnapFitness Elephant..."
    },
    {
      id: "3",
      image:'/assets/site/img/hero/trainer3.png',
      name:'Kathy Tucker',
      price:'47',
      review:'18',
      speciality:"Workout",
      experience:"3",
      location:"130-138 Newington Butts, London (SnapFitness Elephant..."
    },
    {
      id: "4",
      image:'/assets/site/img/hero/trainer4.png',
      name:'John S.',
      price:'47',
      review:'18',
      speciality:"Workout",
      experience:"3",
      location:"130-138 Newington Butts, London (SnapFitness Elephant..."
    },
    {
      id: "5",
      image:'/assets/site/img/hero/trainer1.png',
      name:'Joey',
      price:'47',
      review:'18',
      speciality:"Workout",
      experience:"3",
      location:"130-138 Newington Butts, London (SnapFitness Elephant..."
    }
  ]
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1,
        nav: false 
      },
      400: {
        items: 1,
        nav: false 
      },
      760: {
        items: 1,
        nav: false 
      },
      1000: {
        items: 2,
        nav: false 
      },
      1200: {
        items: 2
      },
      1500: {
        items: 2
      }
    },
    nav: true
  }
  reviews = [
    {
      id: "1",
      image:'/assets/site/img/icon/Ellipse3.png',
      name:'Joan Leigh',
      location:"London",
      comment:"I've only been working out for a couple of weeks now who is incredible. Victoria is an incredible trainer. Ive signed up for the next 3 months and up for the hard yards and transformation."

    },
    {
      id: "2",
      image:'/assets/site/img/icon/Ellipse1.png',
      name:'Birmingham',
      location:"London",
      comment:"Try imperdiet est sit amet volutpat molestie. Ut dignissim dui sit amet ex laoreet, vitae aliquet metus ornare.Suspendisse quam erat, laoreet ayre."
    },
    {
      id: "3",
      image:'/assets/site/img/icon/Ellipse2.png',
      name:'Kate Harris',
      location:"Manchester",
      comment:"Nam imperdiet est sit amet volutpat molestie. Utlon si dignissim dui sit amet ex laoreet, vitae aliquet metus.Barolt ta calri boreso."
    },
    {
      id: "4",
      image:'/assets/site/img/icon/Ellipse3.png',
      name:'Joan Leigh',
      location:"London",
      comment:"I've only been working out for a couple of weeks now who is incredible. Victoria is an incredible trainer. Ive signed up for the next 3 months and up for the hard yards and transformation."

    },
    {
      id: "5",
      image:'/assets/site/img/icon/Ellipse1.png',
      name:'Birmingham',
      location:"London",
      comment:"Try imperdiet est sit amet volutpat molestie. Ut dignissim dui sit amet ex laoreet, vitae aliquet metus ornare.Suspendisse quam erat, laoreet ayre."
    },
    {
      id: "6",
      image:'/assets/site/img/icon/Ellipse2.png',
      name:'Kate Harris',
      location:"Manchester",
      comment:"Nam imperdiet est sit amet volutpat molestie. Utlon si dignissim dui sit amet ex laoreet, vitae aliquet metus.Barolt ta calri boreso."
    },
  ]
  clientOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 350,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1,
        nav: false 

        
      },
      400: {
        items: 1,
        nav: false 
      },
      760: {
        items: 1,
        nav: false 
      },
      1000: {
        items: 2
      },
      1200: {
        items: 3
      },
      1500: {
        items: 3
      }
    },
    nav: true
  }
}
