# LS UNIVERSITY Website - Copilot Instructions

## Project Overview
- **Project Name**: LS UNIVERSITY Website
- **Type**: Static Website with GA4/GTM Integration
- **Technologies**: HTML5, CSS3, JavaScript
- **Analytics**: Google Analytics 4 (GA4) and Google Tag Manager (GTM)
- **GTM Container ID**: GTM-NF32QWM7

## Project Structure
```
root/
├── .github/
│   └── copilot-instructions.md
├── index.html
├── admission.html
├── about.html
├── programs.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   ├── ga4-events.js
│   ├── form-tracking.js
│   ├── dom-scraper.js
│   └── gtm-helper.js
├── assets/
└── README.md
```

## Key Features
1. GA4 and GTM integration on all pages
2. Admission form with submission tracking
3. Custom event tracking for user interactions
4. DOM scraping for enhanced analytics
5. Responsive design
6. Event data layer implementation

## Analytics Events
- Page View: Tracked at each page load
- Form Submission: Admission form completion
- Button Click: CTA buttons
- Form Field Interaction: Focus and blur events
- Scroll Depth: Track user scrolling behavior
- Video Engagement: (if applicable)
- Download: Document downloads

## Development Notes
- All HTML pages include GTM-NF32QWM7 container code
- Custom events are pushed to dataLayer for GA4/GTM processing
- DOM scraping monitors form interactions and DOM changes
- Form submissions are tracked with custom events

## Required Files
- All HTML pages have GTM code in head section
- ga4-events.js: Handles all event tracking
- form-tracking.js: Tracks form submissions and field interactions
- dom-scraper.js: Monitors and scrapes DOM for analytics
- gtm-helper.js: Helper functions for GTM/GA4
