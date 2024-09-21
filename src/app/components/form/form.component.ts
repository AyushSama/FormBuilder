import { Component, inject } from '@angular/core';
import { QuestionComponent } from "../question/question.component";
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { PreviewComponent } from '../preview/preview.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [QuestionComponent,MatIcon],
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

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(PreviewComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
