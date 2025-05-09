import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-input-validation',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.scss',
})
export class InputValidationComponent {
  @Input() control: AbstractControl | null = null;

  mostrarErros() {
    return !!this.control && this.control.touched && this.control.errors;
  }

  mostrarMensagens() {
    if (this.control && this.control?.errors) {
      const erros: ValidationErrors = this.control.errors;
      const arrayErros = Object.keys(erros).map((key) =>
        this.mensagens(key, erros[key])
      );
      return arrayErros.toString();
    }
    return [];
  }

  mensagens(errorKey: string, errorValue: any): string {
    const messages: { [key: string]: string } = {
      required: 'O campo é obrigatório',
      minlength: `O campo precisa ter no minino ${errorValue.requiredLength} caracteres`,
      maxlength: `O campo precisa ter no maximo ${errorValue.requiredLength} caracteres`,
      email: `O email é inválido`,
      mismatch: 'As senhas devem coincidir',
    };
    return messages[errorKey];
  }
}
