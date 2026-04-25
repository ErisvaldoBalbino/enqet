import { Component, signal } from '@angular/core';
import { HomePageComponent } from "./components/home-page-component/home-page-component";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [HomePageComponent]
})
export class App {
  protected readonly title = signal('sistema-enquetes');
}
