import { AbstractControl, ValidationErrors } from "@angular/forms";

// this one is only for one word is define here as 
// export function restrictedWords(control: AbstractControl): ValidationErrors | null {

//     return control.value.includes('foo')
//         ? { restrictedWords: true } : null;
// }

// this one is global and print word error message  nd word define in ts file
export function restrictedWords(words: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
        const invalidWords = words
            .map(w => control.value.includes(w) ? w : null)
            .filter(w => w !== null);
        return invalidWords.length > 0
            ? { restrictedWords: invalidWords.join(', ') }
            : null;
    }

}