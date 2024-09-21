import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionContextService {

  constructor() { }

  questionIds:number[] = [];

  storeQuestionContext(questionId:number){
    this.questionIds.push(questionId);
  }

  removeFromQuestionContext(questionId: number) {
    this.questionIds = this.questionIds.filter(id => id !== questionId);
  }

  getQuestionIds(){
    return this.questionIds;
  }

}
