import { TestBed, inject } from '@angular/core/testing';

import { TrainerResolverService } from './trainer-resolver.service';

describe('ProduitResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainerResolverService]
    });
  });

  it('should be created', inject([TrainerResolverService], (service: TrainerResolverService) => {
    expect(service).toBeTruthy();
  }));
});
