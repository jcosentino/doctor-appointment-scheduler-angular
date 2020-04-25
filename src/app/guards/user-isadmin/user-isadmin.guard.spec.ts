import { TestBed, async, inject } from '@angular/core/testing';

import { UserIsAdminGuard } from './user-isadmin.guard';

describe('UserLoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserIsAdminGuard]
    });
  });

  it('should ...', inject([UserIsAdminGuard], (guard: UserIsAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
