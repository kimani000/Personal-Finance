import { Component } from '@angular/core';

@Component({
  selector: 'pf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'PFINANCE';

  deadLink() {
    alert("Dead Link!...");
  }
}
