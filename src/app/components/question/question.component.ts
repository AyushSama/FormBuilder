import { Component, EventEmitter, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatButtonModule,FormsModule],
templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  
  @Output() delete = new EventEmitter<boolean>;
  
  selectedQuestionType:string = "TEXT";
  questionContent!:string;
  textContent!:string;
  options: Array<{ value: string }> = [{ value: '' }];
  


  handleDeleteQuestion() {
    this.delete.emit(true);
  }
  handleQuestionType(type: string) {
    this.selectedQuestionType = type;
  }

  handleSave(){
    // this.optionsNeeded.emit(true);
    // this.getOptions = true;
    console.log(this.options)
  }



  // Method to add a new option
  handleAddOptions() {
    // Add a new object to the array to create a new input field
    this.options.push({ value: '' });
  }

  // Method to remove an option by index
  removeOption(index: number) {
    if (this.options.length > 1) {
      this.options.splice(index, 1);
    }
  }
  
}
