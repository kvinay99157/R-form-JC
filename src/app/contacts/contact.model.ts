export interface Contact {
  id: string,
  personal: boolean,
  firstName: string,
  lastName: string,
  dateOfBirth: Date | null,
  favoritesRanking: number | null,
  // use partial when you eant to use value type in component coz this one is a nested group
  // phone: Partial<Phone>,
  // address: Partial<Address>,
  phone: Phone,
  address: Address,
  notes: string,
}

export interface Phone {
  phoneNumber: string,
  phoneType: string,
}

export interface Address {
  streetAddress: string,
  city: string,
  state: string,
  postalCode: string,
  addressType: string,
}
// use here to control radio button  and add thete component dynamically 
export const phonjeTypeValue = [
  { title: 'Mobile', value: 'mobile' },
  { title: 'Work', value: 'work' },
  { title: 'Other', value: 'other' },
];
export const adressTypeValue = [
  { title: 'Home', value: 'home' },
  { title: 'Work', value: 'work' },
  { title: 'Other', value: 'other' },
];
