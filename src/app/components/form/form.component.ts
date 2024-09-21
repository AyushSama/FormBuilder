import { Component } from '@angular/core';
import { QuestionComponent } from "../question/question.component";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [QuestionComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

}
