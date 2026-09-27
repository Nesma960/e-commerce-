// import { Component, inject, OnInit } from '@angular/core';
// import { BrandsService } from '../../../../core/services/brands/brands.service';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   imports: [],
//   selector: 'app-specific-brand',
//   styleUrl: './specific-brand.component.css',
//   templateUrl: './specific-brand.component.html',
// })
// export class SpecificBrandComponent implements OnInit {
//   private readonly brandsService = inject(BrandsService);
//   private readonly activatedRoute = inject(ActivatedRoute)

//   brandId: string = '';


//   ngOnInit(): void {
//     this.getBrandId()
//   }
//   getBrandId(): void {
//     this.activatedRoute.paramMap.subscribe((params) => {
//       const id = params.get('id');
//       if (!id) { return }
//       this.brandId = id;
//       this.getSpecificBrand()

//     });
//   }
//   getSpecificBrand(): void {
//     this.brandsService.getSpecificBrand(this.brandId).subscribe({
//       next: (res) => {
//         console.log(res);

//       }
//     })
//   }
// }
