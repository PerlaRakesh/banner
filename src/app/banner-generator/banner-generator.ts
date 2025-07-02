import { Component } from '@angular/core';

interface Template {
  background: string;
  headingColor: string;
  subheadingColor: string;
}

@Component({
  selector: 'app-banner-generator',
  standalone: false,
  templateUrl: './banner-generator.html',
  styleUrls: ['./banner-generator.css']
})
export class BannerGeneratorComponent {
  headingText: string = 'YOUR NAME';
  subheadingText: string = 'Professional Title | Key Expertise';
  headingColor: string = '#ffffff';
  subheadingColor: string = '#ffffff';
  backgroundColor: string = '#0077B5';
  selectedTemplate: string = 'professional-blue';

  templates: { [key: string]: Template } = {
    'professional-blue': {
      background: 'linear-gradient(135deg, #0077B5 0%, #00A5F7 100%)',
      headingColor: '#ffffff',
      subheadingColor: '#f0f0f0'
    },
    'modern-purple': {
      background: 'linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%)',
      headingColor: '#ffffff',
      subheadingColor: '#f0f0f0'
    },
    'tech-dark': {
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      headingColor: '#4fc3f7',
      subheadingColor: '#a5d6f7'
    },
    'light-minimal': {
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)',
      headingColor: '#333333',
      subheadingColor: '#555555'
    },
    'creative-mesh': {
      background: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 50%, #e7f2ff 100%)',
      headingColor: '#333333',
      subheadingColor: '#555555'
    },
    'custom': {
      background: '#0077B5',
      headingColor: '#ffffff',
      subheadingColor: '#f0f0f0'
    }
  };

  updateBanner() {
    const template = this.templates[this.selectedTemplate];
    this.headingColor = template.headingColor;
    this.subheadingColor = template.subheadingColor;
    this.backgroundColor = this.selectedTemplate === 'custom' ? this.backgroundColor : template.background;
  }

  downloadBanner() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Check if ctx is null
    if (!ctx) {
      console.error('Failed to get canvas context');
      return; // Exit the function if ctx is null
    }

    canvas.width = 1584;
    canvas.height = 396;

    // Fill the canvas with the background color
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = this.headingColor;
    ctx.font = 'bold 48px Arial';
    ctx.fillText(this.headingText, 50, 100);
    ctx.fillStyle = this.subheadingColor;
    ctx.font = '24px Arial';
    ctx.fillText(this.subheadingText, 50, 150);

    const link = document.createElement('a');
    link.download = 'linkedin-banner.png';
    link.href = canvas.toDataURL();
    link.click();
  }
}
