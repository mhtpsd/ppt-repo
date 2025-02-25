import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import interact from 'interactjs';
import PptxGenJS from 'pptxgenjs';
import JSZip from 'jszip';

@Component({
  selector: 'app-creator-page',
  templateUrl: './creator-page.component.html',
  styleUrls: ['./creator-page.component.css']
})
export class CreatorPageComponent implements AfterViewInit {

  slides: any[] = [{ elements: [] }];
  selectedSlideIndex = 0;
  selectedColor = '#000000';
  selectedSize = 20;
  selectedFontFamily = 'Arial';
  selectedHighlightColor = '#ffff00'; // Default highlight color (yellow)
  selectedLineSpacing = '1'; // Default line spacing
  selectedElement: any = null;

  @ViewChild('slideCanvas') slideCanvas: ElementRef | undefined;

  ngAfterViewInit() {
    interact('.draggable')
      .draggable({
        listeners: {
          start(event) {
            console.log(event.type, event.target);
          },
          move(event) {
            const target = event.target;
            const x = (parseFloat(target.getAttribute('data-x') || '0') || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y') || '0') || 0) + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;

            target.setAttribute('data-x', x.toString());
            target.setAttribute('data-y', y.toString());
          },
        }
      });

    interact('.resizable')
      .resizable({
        edges: { top: true, left: true, bottom: true, right: true },
        listeners: {
          move(event) {
            let { x, y } = event.target.dataset;

            x = (parseFloat(x) || 0) + event.deltaRect.left;
            y = (parseFloat(y) || 0) + event.deltaRect.top;

            Object.assign(event.target.style, {
              width: `${event.rect.width}px`,
              height: `${event.rect.height}px`,
              transform: `translate(${x}px, ${y}px)`
            });

            Object.assign(event.target.dataset, { x, y });
          }
        }
      });
  }

  addText() {
    const newText = {
      type: 'text',
      content: 'New Text',
      style: {
        top: '50px',
       50px',
        color: this.selectedColor,
        fontSize: `${this.selectedSize}px`,
        fontFamily: this.selectedFontFamily,
        backgroundColor: this.selectedHighlightColor,
        textAlign: 'left',
        lineHeight: this.selectedLineSpacing
      }
    };
    this.slides[this.selectedSlideIndex].elements.push(newText);
  }

  addShape() {
    const newShape = {
      type: 'shape',
      content: 'New Shape',
      style: {
        top: '50px',
        left: '50px',
       .selectedColor,
        fontSize: `${this.selectedSize}px`
      }
    };
    this.slides[this.selectedSlideIndex].elements.push(newShape);
  }

  addSlide() {
    this.slides.push({ elements: [] });
    this.selectedSlideIndex = this.slides.length - 1;
  }

  selectSlide(index: number) {
    this.selectedSlideIndex = index;
  }

  selectElement(element: any, event: Event) {
    event.stopPropagation();
    this.selectedElement = element;
    this.selectedColor = element.style.color;
    this.selectedSize = parseInt(element.style.fontSize, 10);
    this.selectedFontFamily = element.style.fontFamily || 'Arial';
    this.selectedHighlightColor = element.style.backgroundColor || '#ffff00';
    this.selectedLineSpacing = element.style.lineHeight || '1';
  }

  updateSelectedElement(styleProperty: string, value: string) {
    if (this.selectedElement) {
      this.selectedElement.style[styleProperty] = value;
    }
  }

  changeTextColor(color: string) {
    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand('foreColor', false, color);
  }

  changeTextSize(size: number) {
    document.execCommand('fontSize', false, size.toString());
  }

  changeFontFamily(fontFamily: string) {
    document.execCommand('fontName', false, fontFamily);
  }

  changeHighlightColor(color: string) {
    document.execCommand('hiliteColor', false, color);
  }

  changeLineSpacing(lineSpacing: string) {
    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand('lineHeight', false, lineSpacing);
  }

  uploadPpt(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const arrayBuffer = e.target.result;
        JSZip.loadAsync(arrayBuffer).then((zip) => {
          // Process the loaded presentation
          zip.file('ppt/slides/slide1.xml').async('string').then((content) => {
            console.log(content);
            // Parse and display the slide content
          });
        });
      };
      reader.readAsArrayBuffer(file);
    }
  }

  savePpt() {
    let pres = new PptxGenJS();
    let slide = pres.addSlide();
    slide.addText('Hello World from PptxGenJS!', { x: 1, y: 1, color: '363636' });
    pres.writeFile('SamplePresentation.pptx');
  }
}