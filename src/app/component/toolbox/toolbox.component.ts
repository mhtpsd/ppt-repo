import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent {
  @Output() addTextEvent = new EventEmitter<void>();
  @Output() addShapeEvent = new EventEmitter<void>();
  @Output() changeTextColorEvent = new EventEmitter<string>();
  @Output() changeTextSizeEvent = new EventEmitter<number>();
  @Output() changeFontFamilyEvent = new EventEmitter<string>();
  @Output() changeHighlightColorEvent = new EventEmitter<string>();
  @Output() changeLineSpacingEvent = new EventEmitter<string>();

  selectedColor = '#000000';
  selectedSize = 20;
  selectedFontFamily = 'Arial';
  selectedHighlightColor = '#ffff00'; // Default highlight color (yellow)
  selectedLineSpacing = '1'; // Default line spacing

  addText() {
    this.addTextEvent.emit();
  }

  addShape() {
    this.addShapeEvent.emit();
  }

  changeTextColor(color: string) {
    this.changeTextColorEvent.emit(color);
  }

  changeTextSize(size: number) {
    this.changeTextSizeEvent.emit(size);
  }

  changeFontFamily(fontFamily: string) {
    this.changeFontFamilyEvent.emit(fontFamily);
  }

  changeHighlightColor(color: string) {
    this.changeHighlightColorEvent.emit(color);
  }

  changeLineSpacing(lineSpacing: string) {
    this.changeLineSpacingEvent.emit(lineSpacing);
  }
}
