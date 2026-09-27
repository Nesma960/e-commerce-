import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesData } from '../../../../core/models/categories-data.interface';
import { CategoriesService } from '../../../../core/services/categories/categories.service';

@Component({
  imports: [RouterLink],
  selector: 'app-category-details',
  styleUrl: './category-details.component.css',
  templateUrl: './category-details.component.html',
})
export class CategoryDetailsComponent implements OnInit {


  private readonly categoriesService = inject(CategoriesService);
  private readonly activatedRoute = inject(ActivatedRoute);

  categoryId: WritableSignal<string> = signal<string>('');
  CategoryDetailsList: WritableSignal<CategoriesData[]> = signal<CategoriesData[]>([])



  ngOnInit(): void {
    this.getCategoryId();
    this.getSpecificCategoryData();
  }

  getCategoryId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.categoryId.set(params.get('id')!)
    })

    // call api
    this.getSpecificCategoryData();
  }

  getSpecificCategoryData(): void {
    this.categoriesService.getAllSubCategories(this.categoryId()).subscribe({
      next: (res) => {
        this.CategoryDetailsList.set(res.data)
      }
    })
  }





}
