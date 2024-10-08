import { Component, EventEmitter, inject, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Question } from '../../interfaces/Question';
import { Answer } from '../../interfaces/Answer';
import { QuestionAnswer } from '../../interfaces/QuestionAnswer';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { QuestionContextService } from '../../services/question-context.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatButtonModule,FormsModule],
templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  
  protected _onDestroy = new Subject<void>();
  constructor(private apiService : ApiService,private qContext:QuestionContextService){}
  
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  
  @Output() delete = new EventEmitter<boolean>;
  
  selectedQuestionType:string = "TEXT";
  questionContent!:string;
  textContent!:string;
  options: Array<{ value: string }> = [{ value: '' }];

  questions: Question = { questionId: 0, question: '', questionType: '' }; // Directly initialize here
  answers: Answer[] = []; // Initialize as an empty array
  questionAnswer: QuestionAnswer = { questionsAyush: this.questions, answersAyush: this.answers }; // Initialize as needed
   


  handleDeleteQuestion() {
    this.delete.emit(true);
  }
  handleQuestionType(type: string) {
    this.selectedQuestionType = type;
  }

  handleSave(){
    this.saveQuestion();
    if(this.selectedQuestionType=='TEXT')
      this.saveTextOption();
    else 
      this.saveAnswerOption();
    this.saveQuestionAnswer();
    this.apiCall();
  }

  apiCall(){
    this.apiService
      .insertQuestionAnswer(this.questionAnswer)
      .pipe(takeUntil(this._onDestroy))
      .subscribe({
        next: (res: any) => {
          this.qContext.storeQuestionContext(res.questionId);
          this.openSnackBar("Question Added Successfully","Dance");
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  saveQuestion(){
    this.questions.questionId = 0;
    this.questions.question = this.questionContent;
    this.questions.questionType = this.selectedQuestionType;
  }

  saveTextOption() {
    this.answers = [];
    const newAnswer: Answer = {
      ansId: 0, // Assign or generate an ansId as needed
      questionId: 0, // This can be updated later if necessary
      answerOption: 1, // Assuming answer options start from 1
      answer: this.textContent, // Use the textContent from the input
      correct: false // Set to false or adjust logic as needed
    };
    this.answers.push(newAnswer);
  }
  

  saveAnswerOption(){
    this.answers = this.options.map((option, index) => ({
      ansId: 0, // Assign or generate an ansId as needed
      questionId: 0,
      answerOption: index + 1, // Assuming answer options start from 1
      answer: option.value,
      correct: false // You may want to define logic to set this
    }));
  }

  saveQuestionAnswer(){
    this.questionAnswer.questionsAyush = this.questions;
    this.questionAnswer.answersAyush = this.answers;
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
