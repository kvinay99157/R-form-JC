import { Directive, ElementRef, HostListener, Provider, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DATE_VALUE_PROVIDER: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateValueAccessorDirective),
  multi: true
}

@Directive({
  // this is a defalut we need to create own
  // selector: '[conDateValueAccessor]'
  selector: 'input ([type=date])[formControlName],input ([type=date])[formControl],input ([type=date])[ngModel]',
  providers: [DATE_VALUE_PROVIDER]
})
export class DateValueAccessorDirective implements ControlValueAccessor {

  constructor(private element: ElementRef) { }

  @HostListener('input', ['$event.target.valurAsDate'])
  private onChange!: Function;

  @HostListener('blur')
  private onTouched!: Function;

  registerOnChange(fn: Function): void {
    this.onChange = (valurAsDate: Date) => { fn(valurAsDate); };
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }


  writeValue(newValue: Date): void {
    if (newValue instanceof Date) {

      //yyy-mm-dd
      this.element.nativeElement.value = newValue.toDateString().split('T')[0];
      // yyy-mm-ddThh:mm:ss000Z
    }
  }

}
