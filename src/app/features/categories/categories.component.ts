import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryDetailsComponent } from "./components/category-details/category-details.component";

@Component({
  imports: [CategoryDetailsComponent, RouterOutlet],
  selector: 'app-categories',
  styleUrl: './categories.component.css',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {

}
