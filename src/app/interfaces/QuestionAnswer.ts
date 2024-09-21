import { Question } from "./Question";
import { Answer } from './Answer';

export interface QuestionAnswer{
    Question: Question;
    Answer : Answer[];
}