import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'features/specialities',
    loadChildren: () =>
      import('./speciality/speciality.module').then((m) => m.SpecialityModule),
  },
  {
    path: 'features/contacts',
    loadChildren: () =>
      import('./website-contacts/website-contacts.module').then((m) => m.ContactsModule),
  },
  {
    path: 'features/users/clients',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'features/users/trainers',
    loadChildren: () =>
      import('./trainers/trainers.module').then((m) => m.TrainersModule),
  },
  {
    path: 'features/users/admins',
    loadChildren: () =>
      import('./admins/administrators.module').then((m) => m.AdministratorsModule),
  },
  {
    path: 'features/users/add-admin',
    loadChildren: () =>
      import('./add-admin/add-admin.module').then((m) => m.AddAdminModule),
  },
  {
    path: 'crafted/pages/profile/:id',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'crafted/account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
