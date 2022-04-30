import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss'],
})
export class SpecialityComponent implements OnInit {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"  ></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate:true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave:true

    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      speciality_id: {
        title: 'ID',
        editable: false,
        addable: false,
        type: 'number',
      },
      speciality_name: {
        title: 'Speciality',
        type: 'string',
      },
      speciality_description: {
        title: 'Description',
        type: 'string',
      },
    },
  };
  constructor() {}

  ngOnInit(): void {}
}
