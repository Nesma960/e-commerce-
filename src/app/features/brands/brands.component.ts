import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { BrandsData } from '../../core/models/brands-data.interface';
import { BrandsService } from '../../core/services/brands/brands.service';

@Component({
  imports: [RouterLink],
  selector: 'app-brands',
  styleUrl: './brands.component.css',
  templateUrl: './brands.component.html',
})
export class BrandsComponent implements OnInit {

  private readonly brandsService = inject(BrandsService);

  brandsList: WritableSignal<BrandsData[]> = signal<BrandsData[]>([])

  ngOnInit(): void {
    this.getAllBrandsData();
  }

  getAllBrandsData(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsList.set(res.data)
      }
    })
  }



}
