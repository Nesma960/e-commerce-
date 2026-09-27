import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesData } from '../../../../core/models/categories-data.interface';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  selector: 'app-popular-categories',
  styleUrl: './popular-categories.component.css',
  templateUrl: './popular-categories.component.html',
})
export class PopularCategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService)

  categoriesList: WritableSignal<CategoriesData[]> = signal<CategoriesData[]>([])

  ngOnInit(): void {
    this.getAllCategoriesData();
  }

  getAllCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList.set(res.data)

      }
    })
  }



}
