import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { OptionmenuComponent } from "../optionmenu/optionmenu.component";

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatButtonModule, OptionmenuComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  
}
