import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  routerHtml: Router;

  
  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) {
    // this.routerHtml = this.router;
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
  }


  ngOnInit() {
    }
}
