import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { QuestionContextService } from '../../services/question-context.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MainModel } from '../../interfaces/MainModel';
import { SimplifiedQuestion } from '../../interfaces/SimplifiedQuestion';
import { Answers } from '../../interfaces/Answers';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [MatDialogModule,FormsModule,CommonModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent implements OnInit {
  
  constructor(private apiService: ApiService,private qContext : QuestionContextService){}
  protected _onDestroy = new Subject<void>();

  ngOnInit(): void {
    this.apiCall();
  }

  questionsData!:SimplifiedQuestion[];

  simplifiedData: SimplifiedQuestion[] = [
    {
      question: "What is your name?",
      questionType: "radio",
      options: [
        { answerOption: 1, answer: "Ayush", correct: true },
        { answerOption: 2, answer: "Rishabh", correct: false },
        { answerOption: 3, answer: "Sanat", correct: false }
      ]
    },
    {
      question: "What is your country?",
      questionType: "dropdown",
      options: [
        { answerOption: 1, answer: "India", correct: true },
        { answerOption: 2, answer: "Switzerland", correct: false }
      ]
    },
    {
      question: "What things you are into?",
      questionType: "checkbox",
      options: [
        { answerOption: 1, answer: "Football", correct: true },
        { answerOption: 2, answer: "Cricket", correct: true },
        { answerOption: 3, answer: "Hockey", correct: false }
      ]
    },
    {
      question: "What things you are into?",
      questionType: "checkbox",
      options: [
        { answerOption: 1, answer: "Football", correct: true },
        { answerOption: 2, answer: "Cricket", correct: true },
        { answerOption: 3, answer: "Hockey", correct: false }
      ]
    },
    {
      question: "What things you are into?",
      questionType: "checkbox",
      options: [
        { answerOption: 1, answer: "Football", correct: true },
        { answerOption: 2, answer: "Cricket", correct: true },
        { answerOption: 3, answer: "Hockey", correct: false }
      ]
    },
    {
      question: "What things you are into?",
      questionType: "checkbox",
      options: [
        { answerOption: 1, answer: "Football", correct: true },
        { answerOption: 2, answer: "Cricket", correct: true },
        { answerOption: 3, answer: "Hockey", correct: false }
      ]
    },
    {
      question: "What things you are into?",
      questionType: "checkbox",
      options: [
        { answerOption: 1, answer: "Football", correct: true },
        { answerOption: 2, answer: "Cricket", correct: true },
        { answerOption: 3, answer: "Hockey", correct: false }
      ]
    }
  ];

  apiCall(){
    this.apiService
      .getAllQuestionAnswers()
      .pipe(takeUntil(this._onDestroy))
      .subscribe({
        next: (res: any) => {
          this.questionsData = res;
          console.log(this.simplifyApiResponse(res));
          this.questionsData = this.simplifyApiResponse(res);

        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  simplifyApiResponse(apiResponse: MainModel[][]): SimplifiedQuestion[] {
    return apiResponse.map((group: MainModel[]): SimplifiedQuestion => {
      const questionText = group[0].question; // Assume all items in a group have the same question
      const questionType = group[0].questionType; // Assume all items in a group have the same questionType
  
      const options: Answers[] = group.map((option: MainModel) => ({
        answerOption: option.answerOption,
        answer: option.answer,
        correct: option.correct
      }));
  
      return {
        question: questionText,
        questionType: questionType,
        options: options
      };
    });
  }


  selectedOptions: any[] = [];
  textAnswers: string[] = [];

  // Handle checkbox selections
  selectedCheckboxes: { [questionIndex: number]: number[] } = {};

  handleCheckboxChange(questionIndex: number, answerOption: number, event: any) {
    if (!this.selectedCheckboxes[questionIndex]) {
      this.selectedCheckboxes[questionIndex] = [];
    }

    if (event.target.checked) {
      this.selectedCheckboxes[questionIndex].push(answerOption);
    } else {
      const index = this.selectedCheckboxes[questionIndex].indexOf(answerOption);
      if (index > -1) {
        this.selectedCheckboxes[questionIndex].splice(index, 1);
      }
    }
  }
  

}
