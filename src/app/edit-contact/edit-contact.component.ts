import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { adressTypeValue, phonjeTypeValue } from '../contacts/contact.model';
import { restrictedWords } from './validators/retricted-words.validator';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phoneTypes = phonjeTypeValue;
  adressTypes = adressTypeValue;
  //use form builder here coz we need to add short from like while edit dont need to write all time set value
  // contactForm = new FormGroup({
  //   id: new FormControl(),
  //   firstName: new FormControl(),
  //   lastName: new FormControl(),
  //   dateOfBirth: new FormControl(),
  //   favoritesRanking: new FormControl(),
  //   phone: new FormGroup({
  //     phoneNumber: new FormControl(),
  //     phoneType: new FormControl(),
  //   }),
  //   address: new FormGroup({
  //     streetAddress: new FormControl(),
  //     city: new FormControl(),
  //     state: new FormControl(),
  //     postalCode: new FormControl(),
  //     addressType: new FormControl(),
  //   }),

  // });
  contactForm = this.fb.nonNullable.group({
    id: '',
    personal: false,
    // firstName: ['', Validators.required], //this one for normal if you want to add min.length then change it from component and here as well and do the same thing for other field
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: '',
    dateOfBirth: <Date | null>null,
    favoritesRanking: <number | null>null,
    phone: this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
    }),
    address: this.fb.nonNullable.group({
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      addressType: '',

    }),
    // add custom validator here
    // notes: '',
    // this one is only for sigle custom print data
    // notes: ['', restrictedWords],
    // this one is foe multiple restricted word
    notes: ['', restrictedWords(['foo', 'bar'])],

  });


  constructor(private route: ActivatedRoute,
    private contactService: ContactsService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactService.getContact(contactId).subscribe((contact) => {
      if (!contact) return

      // to replace all the value just call all in one metof just contact
      // this.contactForm.controls.id.setValue(contact.id)
      // this.contactForm.controls.firstName.setValue(contact.firstName);
      // this.contactForm.controls.lastName.setValue(contact.lastName);
      // this.contactForm.controls.dateOfBirth.setValue(contact.dateOfBirth);
      // this.contactForm.controls.favoritesRanking.setValue(contact.favoritesRanking);
      // this.contactForm.controls.phone.controls.phoneNumber.setValue(contact.phone.phoneNumber);
      // this.contactForm.controls.phone.controls.phoneType.setValue(contact.phone.phoneType);
      // this.contactForm.controls.address.controls.streetAddress.setValue(contact.address.streetAddress);
      // this.contactForm.controls.address.controls.addressType.setValue(contact.address.addressType);
      // this.contactForm.controls.address.controls.city.setValue(contact.address.city);
      // this.contactForm.controls.address.controls.postalCode.setValue(contact.address.postalCode);
      // this.contactForm.controls.address.controls.state.setValue(contact.address.state);
      this.contactForm.setValue(contact)

      // if u want to use change only some field part use patch value
      // const name ={ firstName: contact.firstName,lastName: contact.lastName}
      // this.contactForm.patchValue(name)
    });
  }

  //validation for name
  get firstNam() {
    return this.contactForm.controls.firstName;
  }
  //custom validator for notes
  get notes() {
    return this.contactForm.controls.notes;
  }

  saveContact() {
    // console.log(this.contactForm.value)
    // this.contactService.saveContact(this.contactForm.value).subscribe({
    //   next: () => this.router.navigate(['/contacts'])
    // })

    // there are nested form group so we can use here get raw value if you want to use value here then you can change in interface like use partial to 
    console.log(this.contactForm.value)
    this.contactService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/contacts'])
    })
  }
}
