import { Answers } from "./Answers";

export interface SimplifiedQuestion {
    question: string;
    questionType: string;
    options: Answers[];
}