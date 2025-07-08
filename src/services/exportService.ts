import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { htmlDocx } from 'html-docx-js';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export interface CalendarEvent {
  date: string;
  title: string;
  content: string;
  contentType: string;
  platform: string;
  status: string;
}

export interface PersonaData {
  name: string;
  role: string;
  age: string;
  location: string;
  income: string;
  education: string;
  goals: string[];
  painPoints: string[];
  solutions: string[];
  characteristics: string[];
  techComfort: string;
  decisionMaking: string;
  communication: string;
  workStyle: string;
}

class ExportService {
  // Generate sample calendar data for demonstration
  private generateSampleCalendarData(calendarType: string): CalendarEvent[] {
    const events: CalendarEvent[] = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 15; i++) {
      const eventDate = new Date(currentDate);
      eventDate.setDate(currentDate.getDate() + i);
      
      let event: CalendarEvent;
      
      if (calendarType === 'marketing') {
        event = {
          date: eventDate.toISOString().split('T')[0],
          title: `Marketing Campaign ${i + 1}`,
          content: `Blog post about industry trends and insights for Q${Math.floor(Math.random() * 4) + 1}`,
          contentType: ['blog', 'infographic', 'whitepaper', 'case-study'][Math.floor(Math.random() * 4)],
          platform: ['website', 'linkedin', 'email'][Math.floor(Math.random() * 3)],
          status: ['draft', 'scheduled', 'published'][Math.floor(Math.random() * 3)]
        };
      } else if (calendarType === 'social') {
        event = {
          date: eventDate.toISOString().split('T')[0],
          title: `Social Post ${i + 1}`,
          content: `Engaging social media content about product features and customer success stories`,
          contentType: ['post', 'story', 'reel', 'carousel'][Math.floor(Math.random() * 4)],
          platform: ['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok'][Math.floor(Math.random() * 5)],
          status: ['draft', 'scheduled', 'published'][Math.floor(Math.random() * 3)]
        };
      } else {
        event = {
          date: eventDate.toISOString().split('T')[0],
          title: `Email Campaign ${i + 1}`,
          content: `Newsletter content featuring product updates, industry news, and customer testimonials`,
          contentType: ['newsletter', 'promotional', 'welcome', 'abandoned-cart'][Math.floor(Math.random() * 4)],
          platform: ['mailchimp', 'hubspot', 'sendgrid'][Math.floor(Math.random() * 3)],
          status: ['draft', 'scheduled', 'sent'][Math.floor(Math.random() * 3)]
        };
      }
      
      events.push(event);
    }
    
    return events;
  }

  // Generate sample persona data
  private generateSamplePersonas(): PersonaData[] {
    return [
      {
        name: 'John Davis',
        role: 'Marketing Manager at Tech Corp',
        age: '38 years old',
        location: 'San Francisco, CA',
        income: '$85,000 - $120,000',
        education: 'MBA Marketing',
        goals: [
          'Increase marketing ROI by 40% this year',
          'Build a strong brand presence across digital channels',
          'Generate qualified leads for sales team',
          'Stay ahead of marketing technology trends'
        ],
        painPoints: [
          'Limited budget for marketing initiatives',
          'Difficulty measuring campaign effectiveness',
          'Too many marketing tools to manage',
          'Lack of time for content creation'
        ],
        solutions: [
          'Marketing automation tools to save time on repetitive tasks',
          'All-in-one platform to reduce tool sprawl and complexity',
          'AI-powered content generation for faster campaign creation',
          'Built-in analytics dashboard for easy ROI tracking'
        ],
        characteristics: [
          'Highly active on LinkedIn, shares industry insights regularly',
          'Prefers video tutorials over written documentation',
          'Values peer recommendations and case studies',
          'Attends 3-4 marketing conferences annually'
        ],
        techComfort: 'High - Early Adopter',
        decisionMaking: 'Data-Driven',
        communication: 'Email & Video Calls',
        workStyle: 'Collaborative'
      },
      {
        name: 'Sarah Chen',
        role: 'Small Business Owner',
        age: '32 years old',
        location: 'Austin, TX',
        income: '$45,000 - $65,000',
        education: 'Bachelor\'s Business Administration',
        goals: [
          'Grow online presence and brand awareness',
          'Increase customer retention by 25%',
          'Streamline marketing processes',
          'Build a loyal customer community'
        ],
        painPoints: [
          'Limited time to manage marketing activities',
          'Small budget for marketing tools and advertising',
          'Difficulty creating consistent content',
          'Lack of marketing expertise'
        ],
        solutions: [
          'Affordable, easy-to-use marketing tools',
          'Templates and automation for consistent content',
          'Educational resources and tutorials',
          'Community support and networking opportunities'
        ],
        characteristics: [
          'Very active on Instagram and Facebook',
          'Prefers simple, intuitive interfaces',
          'Values cost-effective solutions',
          'Seeks peer recommendations and reviews'
        ],
        techComfort: 'Medium - Cautious Adopter',
        decisionMaking: 'Budget-Conscious',
        communication: 'Social Media & Email',
        workStyle: 'Independent'
      },
      {
        name: 'Michael Johnson',
        role: 'Enterprise CTO',
        age: '45 years old',
        location: 'New York, NY',
        income: '$150,000 - $200,000',
        education: 'MS Computer Science',
        goals: [
          'Implement scalable marketing technology stack',
          'Ensure data security and compliance',
          'Drive digital transformation initiatives',
          'Optimize marketing operations efficiency'
        ],
        painPoints: [
          'Complex integration requirements',
          'Security and compliance concerns',
          'Need for enterprise-grade scalability',
          'Managing multiple stakeholder requirements'
        ],
        solutions: [
          'Enterprise-grade security and compliance features',
          'Robust API and integration capabilities',
          'Scalable architecture for large organizations',
          'Dedicated support and professional services'
        ],
        characteristics: [
          'Focuses on technical specifications and security',
          'Requires detailed documentation and proof of concepts',
          'Values vendor stability and long-term partnerships',
          'Prefers formal procurement processes'
        ],
        techComfort: 'Very High - Technology Leader',
        decisionMaking: 'Technical & Risk-Averse',
        communication: 'Email & Formal Meetings',
        workStyle: 'Strategic & Analytical'
      }
    ];
  }

  // Export calendar as PDF
  exportCalendarPDF(calendarType: string): void {
    const doc = new jsPDF();
    const events = this.generateSampleCalendarData(calendarType);
    
    // Add title
    doc.setFontSize(20);
    doc.text(`${calendarType.charAt(0).toUpperCase() + calendarType.slice(1)} Calendar`, 20, 20);
    
    // Add generation date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
    
    // Prepare table data
    const tableData = events.map(event => [
      event.date,
      event.title,
      event.contentType,
      event.platform,
      event.status,
      event.content.substring(0, 50) + '...'
    ]);
    
    // Add table
    doc.autoTable({
      head: [['Date', 'Title', 'Type', 'Platform', 'Status', 'Content']],
      body: tableData,
      startY: 45,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [255, 107, 53] },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 35 },
        2: { cellWidth: 25 },
        3: { cellWidth: 25 },
        4: { cellWidth: 20 },
        5: { cellWidth: 50 }
      }
    });
    
    doc.save(`${calendarType}-calendar.pdf`);
  }

  // Export content as PDF
  exportContentPDF(calendarType: string): void {
    const doc = new jsPDF();
    const events = this.generateSampleCalendarData(calendarType);
    
    doc.setFontSize(20);
    doc.text(`${calendarType.charAt(0).toUpperCase() + calendarType.slice(1)} Content`, 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
    
    let yPosition = 50;
    
    events.forEach((event, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text(`${index + 1}. ${event.title}`, 20, yPosition);
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`Date: ${event.date} | Type: ${event.contentType} | Platform: ${event.platform}`, 20, yPosition + 8);
      
      doc.setFontSize(11);
      const splitContent = doc.splitTextToSize(event.content, 170);
      doc.text(splitContent, 20, yPosition + 18);
      
      yPosition += 35 + (splitContent.length * 5);
    });
    
    doc.save(`${calendarType}-content.pdf`);
  }

  // Export calendar as Excel
  exportCalendarExcel(calendarType: string): void {
    const events = this.generateSampleCalendarData(calendarType);
    
    const worksheet = XLSX.utils.json_to_sheet(events.map(event => ({
      Date: event.date,
      Title: event.title,
      'Content Type': event.contentType,
      Platform: event.platform,
      Status: event.status,
      Content: event.content
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Calendar');
    
    // Add metadata sheet
    const metadata = [
      { Property: 'Calendar Type', Value: calendarType },
      { Property: 'Generated On', Value: new Date().toLocaleDateString() },
      { Property: 'Total Events', Value: events.length }
    ];
    
    const metaSheet = XLSX.utils.json_to_sheet(metadata);
    XLSX.utils.book_append_sheet(workbook, metaSheet, 'Metadata');
    
    XLSX.writeFile(workbook, `${calendarType}-calendar.xlsx`);
  }

  // Export content as Excel
  exportContentExcel(calendarType: string): void {
    const events = this.generateSampleCalendarData(calendarType);
    
    const contentData = events.map((event, index) => ({
      'Item #': index + 1,
      Title: event.title,
      Date: event.date,
      'Content Type': event.contentType,
      Platform: event.platform,
      Status: event.status,
      'Full Content': event.content
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(contentData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Content');
    
    XLSX.writeFile(workbook, `${calendarType}-content.xlsx`);
  }

  // Export calendar as Word
  exportCalendarWord(calendarType: string): void {
    // Word export functionality temporarily unavailable
    // The html-docx-js library is incompatible with ES modules
    alert('Word export is currently unavailable. Please use PDF or Excel export instead.');
  }

  // Export content as Word
  exportContentWord(calendarType: string): void {
    // Word export functionality temporarily unavailable
    // The html-docx-js library is incompatible with ES modules
    alert('Word export is currently unavailable. Please use PDF or Excel export instead.');
  }

  // Export personas as PDF
  exportPersonasPDF(): void {
    const doc = new jsPDF();
    const personas = this.generateSamplePersonas();
    
    doc.setFontSize(20);
    doc.text('Customer Personas', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
    
    let yPosition = 50;
    
    personas.forEach((persona, index) => {
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Persona header
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text(`${index + 1}. ${persona.name}`, 20, yPosition);
      
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      doc.text(persona.role, 20, yPosition + 8);
      
      yPosition += 20;
      
      // Demographics
      doc.setFontSize(11);
      doc.text(`Age: ${persona.age} | Location: ${persona.location}`, 20, yPosition);
      doc.text(`Income: ${persona.income} | Education: ${persona.education}`, 20, yPosition + 6);
      
      yPosition += 18;
      
      // Goals
      doc.setFont(undefined, 'bold');
      doc.text('Goals:', 20, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;
      
      persona.goals.forEach(goal => {
        const splitGoal = doc.splitTextToSize(`• ${goal}`, 170);
        doc.text(splitGoal, 25, yPosition);
        yPosition += splitGoal.length * 5;
      });
      
      yPosition += 5;
      
      // Pain Points
      doc.setFont(undefined, 'bold');
      doc.text('Pain Points:', 20, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;
      
      persona.painPoints.forEach(pain => {
        const splitPain = doc.splitTextToSize(`• ${pain}`, 170);
        doc.text(splitPain, 25, yPosition);
        yPosition += splitPain.length * 5;
      });
      
      yPosition += 15;
    });
    
    doc.save('customer-personas.pdf');
  }

  // Export personas as Excel
  exportPersonasExcel(): void {
    const personas = this.generateSamplePersonas();
    
    const personaData = personas.map((persona, index) => ({
      'Persona #': index + 1,
      Name: persona.name,
      Role: persona.role,
      Age: persona.age,
      Location: persona.location,
      Income: persona.income,
      Education: persona.education,
      'Tech Comfort': persona.techComfort,
      'Decision Making': persona.decisionMaking,
      Communication: persona.communication,
      'Work Style': persona.workStyle,
      Goals: persona.goals.join('; '),
      'Pain Points': persona.painPoints.join('; '),
      Solutions: persona.solutions.join('; '),
      Characteristics: persona.characteristics.join('; ')
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(personaData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Personas');
    
    // Add summary sheet
    const summary = [
      { Metric: 'Total Personas', Value: personas.length },
      { Metric: 'Generated On', Value: new Date().toLocaleDateString() },
      { Metric: 'Average Age Range', Value: '32-45 years' },
      { Metric: 'Most Common Role', Value: 'Marketing Professional' }
    ];
    
    const summarySheet = XLSX.utils.json_to_sheet(summary);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');
    
    XLSX.writeFile(workbook, 'customer-personas.xlsx');
  }

  // Export personas as Word
  exportPersonasWord(): void {
    // Word export functionality temporarily unavailable
    // The html-docx-js library is incompatible with ES modules
    alert('Word export is currently unavailable. Please use PDF or Excel export instead.');
  }
}

export const exportService = new ExportService();