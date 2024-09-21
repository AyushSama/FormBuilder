import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { endpoint } from '../endpoints/endpoint';
import { QuestionAnswer } from '../interfaces/QuestionAnswer';
import { QuestionContextService } from './question-context.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  questionIds:number[];
  
  constructor(private http: HttpClient,private qContext : QuestionContextService) {
    this.questionIds = this.qContext.getQuestionIds();
  }
  
  baseApiUrl:string = environment.basePathUrl;
  insertQuestAns:string = endpoint.insertQuestionAnswer;
  questionList:string = endpoint.questionList;

  insertQuestionAnswer(body:QuestionAnswer){
    try {
      return this.http.post(this.baseApiUrl+this.insertQuestAns,body);
    } catch (error) {
      throw new Error();
    }
  }

  getAllQuestionAnswers(){
    try {
      return this.http.post(this.baseApiUrl+this.questionList, this.questionIds )
    } catch (error) {
      throw new Error();
    }
  }

}
