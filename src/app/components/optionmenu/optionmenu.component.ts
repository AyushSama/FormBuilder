import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-optionmenu',
  standalone: true,
  imports: [MatIcon,FormsModule],
  templateUrl: './optionmenu.component.html',
  styleUrl: './optionmenu.component.scss'
})
export class OptionmenuComponent {
  
  options: Array<{ value: string }> = [{ value: '' }];

  // Method to add a new option
  handleAddOptions() {
    // Add a new object to the array to create a new input field
    this.options.push({ value: '' });
  }

  // Method to remove an option by index
  removeOption(index: number) {
    if (this.options.length > 1) {
      this.options.splice(index, 1);  // Remove the selected option
    }
  }

}
