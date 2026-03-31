# LS UNIVERSITY Website

A modern, fully functional university website with comprehensive Google Analytics 4 (GA4) and Google Tag Manager (GTM) integration. The website includes admission form tracking, custom event analytics, and DOM scraping capabilities for detailed user behavior analysis.

## 🎯 Features

### Core Website Features
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Multi-page Navigation**: Home, About, Programs, Store, Admission, and Contact pages
- **Admission Form**: Comprehensive student application form with validation
- **Contact Form**: Get in touch form for inquiries
- **University Store**: Official merchandise and academic supplies store
- **Dynamic Content**: Feature cards, program offerings, and statistics

### Analytics & Tracking Features
- **Google Tag Manager Integration**: GTM-NF32QWM7 container on all pages
- **GA4 Custom Events**: Comprehensive event tracking system
- **Form Submission Tracking**: Complete form interaction monitoring
- **DOM Scraping**: Automated DOM structure and change monitoring
- **User Behavior Tracking**: Page views, clicks, scrolls, and interactions
- **Form Field Analytics**: Track every form field interaction (focus, blur, change)
- **CTA Tracking**: Call-to-action button click monitoring
- **Scroll Depth Tracking**: Monitor user engagement with scroll behavior
- **Navigation Tracking**: Track all navigation interactions
- **Feature Card Analytics**: Monitor feature card interactions
- **DOM Change Monitoring**: Real-time DOM mutation tracking

## 📁 Project Structure

```
├── index.html                      # Home page
├── admission.html                  # Admission application page
├── about.html                      # About the university
├── programs.html                   # Academic programs
├── contact.html                    # Contact page
├── store.html                      # University store page
├── inventory.csv                   # Product inventory data
├── css/
│   └── styles.css                  # Main stylesheet
├── js/
│   ├── gtm-helper.js               # GTM utility functions
│   ├── ga4-events.js               # GA4 custom event tracking
│   ├── form-tracking.js            # Form interaction tracking
│   ├── dom-scraper.js              # DOM monitoring and scraping
│   └── store.js                    # Store functionality
├── assets/                         # Images and media files
├── .github/
│   └── copilot-instructions.md     # Project documentation
└── README.md                       # This file
```

## 🔧 Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Analytics**: Google Tag Manager (GTM), Google Analytics 4 (GA4)
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## 📊 Analytics Events

### Page Events
- `page_view`: Tracked on every page load
- `page_structure_scraped`: Scrapes page structure (headings, paragraphs, buttons, etc.)

### Form Events
- `admission_form_submission`: Admission form submission
- `admission_field_focus`: User focuses on admission form field
- `admission_field_blur`: User leaves admission form field
- `admission_field_change`: User changes admission form field value
- `contact_form_submission`: Contact form submission
- `contact_field_focus`: User focuses on contact form field
- `contact_field_blur`: User leaves contact form field
- `contact_field_change`: User changes contact form field value
- `form_structure_scraped`: Form structure analysis

### Store Events
- `store_page_view`: Store page visits
- `store_filter`: Product filtering (category/search)
- `add_to_cart`: Product added to cart
- `store_search`: Product search queries
- `program_learn_more`: Program information clicks
- `button_click`: Generic button clicks

### DOM Events
- `dom_element_added`: New elements added to DOM
- `dom_element_removed`: Elements removed from DOM
- `dom_attribute_changed`: Element attributes changed
- `cta_elements_scraped`: CTA element analysis
- `card_elements_scraped`: Card element analysis

### User Interaction Events
- `page_visibility_changed`: Page visibility changes (tab switching)
- `window_focused`: Window regains focus
- `window_blurred`: Window loses focus

## 🚀 Getting Started

### Setup
1. Clone or download the project files
2. Open any HTML file in a modern web browser
3. Analytics will automatically start tracking

### Local Development
```bash
# No build process required - pure HTML/CSS/JavaScript
# Simply open index.html in your browser or use a local server:

# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Then visit: http://localhost:8000
```

### Customization

#### Change GTM Container ID
Edit the GTM scripts in all HTML files:
```html
<!-- Find and replace GTM-NF32QWM7 with your container ID -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NF32QWM7');</script>
```

#### Add More Events
Edit `js/ga4-events.js` and add:
```javascript
function trackCustomEvent(eventName, metadata = {}) {
    const eventData = {
        ...getPageInfo(),
        ...getSessionInfo(),
        ...metadata
    };
    
    pushGTMEvent(eventName, eventData);
}
```

#### Style Customization
Edit `css/styles.css` and modify the CSS variables in `:root`:
```css
:root {
    --primary-color: #1e40af;
    --secondary-color: #f59e0b;
    --text-color: #1f2937;
    --light-bg: #f9fafb;
}
```

## 📈 Tracking Details

### Form Tracking
All form fields are automatically tracked with:
- Field name, type, and ID
- Field focus and blur events
- Field change events
- Form submission with field count and selected values

### DOM Scraping
The DOM scraper automatically collects:
- Total elements (headings, paragraphs, buttons, links, forms, images)
- Form structure (field types and count)
- CTA elements (buttons with tracking)
- Card/section elements
- Real-time DOM mutation tracking

### Custom Events
Each event includes:
- Event name and timestamp
- Page information (title, URL, path)
- Session information (session ID, start time)
- Event-specific metadata

## 🔒 Data Privacy
- No sensitive data is captured
- Email addresses are redacted in tracking
- Passwords are not tracked
- Form data is not sent to GTM (only structure is tracked)

## 📱 Browser Compatibility
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Events not appearing in GA4?
1. Check that GTM container ID is correct
2. Ensure GTM is active in your container
3. Open browser DevTools Console to see event logs
4. Check GA4 Real-time reporting

### Form tracking not working?
1. Verify form ID matches the JavaScript selectors
2. Check console for JavaScript errors
3. Ensure form fields have proper `name` attributes
4. Verify data-field-type attributes are set

### DOM scraper not detecting changes?
1. Check that elements are in the document body
2. Ensure MutationObserver is supported (all modern browsers)
3. Check console for any mutation errors
4. Verify element IDs are unique

## 📖 Documentation

- Analytics events are logged to browser console
- Each event includes timestamp and full metadata
- GTM Data Layer can be inspected in browser DevTools

## 📝 License
All rights reserved - LS UNIVERSITY

## 👥 Support
For questions or issues, contact: admissions@lsuniversity.edu

---

**Last Updated**: March 2026
**Version**: 1.0
**GTM Container ID**: GTM-NF32QWM7
