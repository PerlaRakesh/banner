import { Component } from '@angular/core';

interface Template {
  background: string;
  headingColor: string;
  subheadingColor: string;
}

interface TemplateMeta {
  key: string;
  image: string;
  alt: string;
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
  layout: string = 'center';
  activeTemplate: string = 'professional-blue';
  isCustom: boolean = false;

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

  templateList: TemplateMeta[] = [
  {
    key: 'professional-blue',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3c719f58-1e9c-4233-ab4b-34ee47dafc6c.png',
    alt: 'Blue gradient background'
  },
  {
    key: 'modern-purple',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9352c8a6-80f4-4a7d-8c19-6dbc0d8beb52.png',
    alt: 'Modern purple geometric design'
  },
  {
    key: 'tech-dark',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/503c4b68-0911-47d6-8031-674ed863d047.png',
    alt: 'Dark background with circuit pattern'
  },
  {
    key: 'light-minimal',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a9eca9c8-fd0b-4299-af13-d7b4e7ba95de.png',
    alt: 'Clean white background'
  },
  {
    key: 'creative-mesh',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b77ab753-8c25-4eb9-96bb-114d25fd9f72.png',
    alt: 'Gradient mesh in vibrant colors'
  },
  {
    key: 'custom',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4c581b68-1b0e-43ed-9af2-8b97c350c372.png',
    alt: 'Custom color background'
  }
  ];

  ngOnInit() {
    const bannerCanvas = document.getElementById('bannerCanvas') as HTMLElement;
    const bannerContent = document.getElementById('bannerContent') as HTMLElement;

    bannerCanvas.style.height = `${bannerCanvas.offsetWidth * (396 / 1584)}px`;
    bannerContent.style.alignItems = 'center';
    this.activeTemplate = 'professional-blue';
    bannerCanvas.style.background = this.templates[this.activeTemplate].background;
  }

  selectTemplate(templateName: string) {
    this.activeTemplate = templateName;
    this.isCustom = this.activeTemplate === 'custom';
    this.updateBanner();
  }

  selectLayout(layout: string) {
    this.layout = layout;
    this.updateBanner(); // Call updateBanner to apply layout changes
  }

  updateBanner() {
    const bannerCanvas = document.getElementById('bannerCanvas') as HTMLElement;
    const bannerHeading = document.getElementById('bannerHeading') as HTMLElement;
    const bannerSubheading = document.getElementById('bannerSubheading') as HTMLElement;
    const bannerContent = document.getElementById('bannerContent') as HTMLElement;

    const template = this.templates[this.activeTemplate];
    
    bannerHeading.style.color = this.headingColor;
    bannerSubheading.style.color = this.subheadingColor;

    // Apply background based on template
    if (this.activeTemplate === 'custom') {
        bannerCanvas.style.background = this.backgroundColor; // Use custom background color
    } else {
        bannerCanvas.style.background = template.background; // Use template background
    }

    bannerHeading.textContent = this.headingText;
    bannerSubheading.textContent = this.subheadingText;

    bannerContent.style.textAlign = this.layout == 'center' ? 'center' :  this.layout == 'left' ? 'left' : 'right';
    bannerContent.style.alignItems = this.layout == 'center' ? 'center' :  this.layout == 'left' ? 'flex-start' : 'flex-end';
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
