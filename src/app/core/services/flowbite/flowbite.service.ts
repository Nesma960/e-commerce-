import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlowbiteService {
  private readonly platformId = inject(PLATFORM_ID);

  loadFlowbite(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    import('flowbite').then((flowbite) => {
      flowbite.initFlowbite();
    });
  }
}
