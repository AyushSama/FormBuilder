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
  questions:Array<{question : string}> = [{question:''}];
  
  handleAddQuestion() {
    this.questions.push({ question: '' }); 
  }

  removeOption(index: number) {
    if (this.questions.length > 1) {
      this.questions.splice(index, 1);  // Remove the selected option
    }
  }

  handleDelete($event: boolean,$index:number) {
    this.removeOption($index);
  }
}
