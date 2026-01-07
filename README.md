# Parcel Connect Landing Page

A modern, responsive landing page for Parcel Connect - a decentralized logistics platform that connects travelers with people who need parcels delivered across Botswana.

## Overview

Parcel Connect is a mobile application that allows people who are already traveling, particularly long-distance commuters, to carry parcels for others along their journey. The platform matches senders with verified travelers, helping to reduce delivery costs while creating small earning opportunities for commuters.

## Features

- Modern, premium design with light and dark mode support
- Fully responsive across desktop, tablet, and mobile devices
- Smooth animations and micro-interactions
- Real-time route matching visualization
- Interactive earnings calculator
- Transparent pricing display
- Contact form for inquiries
- App store download links

## Technology Stack

- HTML5 - Semantic markup structure
- CSS3 - Custom styling with CSS variables for theming
- Vanilla JavaScript - Interactive functionality
- Google Fonts (Inter) - Modern typography

## Project Structure

```
Parcel Connect Landing Page/
├── index.html              # Main HTML file
├── styles.css              # All styling and animations
├── script.js               # Interactive functionality
├── assets/
│   └── images/            # App screenshots and images
└── README.md              # This file
```

## Sections

### Navigation Bar
- Parcel Connect logo
- Navigation links (How It Works, Pricing, Contact)
- Theme toggle (Light/Dark mode)
- Download App button

### Hero Section
- Eye-catching headline: "LOGISTICS, DECENTRALIZED"
- 3D phone mockups showcasing the app interface
- Animated energy connection between phones
- Call-to-action button

### How It Works
- Real-time route matching visualization with animated map
- Verified community rating display (4.8 stars)
- Potential earnings calculator with interactive slider

### Pricing
- Three pricing tiers:
  - Envelope/Keys (from P50)
  - Standard Box (from P120) - Featured
  - Custom Cargo (Negotiated)
- Transparent, fair pricing structure

### Earnings Potential
- Interactive route calculator
- Estimated earnings display
- Visual map representation

### Contact Form
- Name, Email, Phone Number, and Message fields
- Form validation
- Simulated submission with loading state

### Footer
- App Store and Play Store download buttons
- Copyright information

## Theme System

The landing page supports both light and dark modes:

### Dark Mode (Cyber Mint)
- Background: Deep Obsidian (#0A0A0A)
- Primary Accent: Neon Mint (#00E6AC)
- Glass effects with backdrop blur

### Light Mode
- Background: Pure White (#FFFFFF)
- Primary Accent: Mint Green (#00C896)
- Clean, bright interface

Theme preference is saved to localStorage and persists across sessions.

## Animations

- Hero elements fade in on page load
- Phone mockups slide in from sides with 3D rotation
- Scroll-triggered fade-in for section content
- Hover effects with 3D card tilts
- Floating phone animations
- Background particle system
- Smooth transitions throughout

## Responsive Design

Breakpoints:
- Desktop: 1400px+
- Laptop: 1024px - 1399px
- Tablet: 768px - 1023px
- Mobile: < 768px

All sections adapt gracefully to different screen sizes with optimized layouts and touch-friendly interactions.

## Setup and Usage

1. Clone or download the repository
2. Open `index.html` in a modern web browser
3. No build process or dependencies required

For development:
- Edit `index.html` for structure changes
- Modify `styles.css` for styling updates
- Update `script.js` for functionality changes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Requires modern browser with support for:
- CSS Grid and Flexbox
- CSS Custom Properties
- IntersectionObserver API
- ES6+ JavaScript

## Performance

- Optimized animations using CSS transforms and opacity
- Efficient scroll observers with proper thresholds
- Minimal JavaScript for fast load times
- No external dependencies or frameworks

## Customization

### Colors
Update CSS variables in `:root` and `[data-theme="light"]` sections of `styles.css`

### Content
Edit text content directly in `index.html`

### Images
Replace images in `assets/images/` folder with your own screenshots

### Animations
Adjust animation durations and easing in `styles.css` keyframes

## Contact

For questions or support regarding Parcel Connect, use the contact form on the landing page.

## License

Copyright 2025 ParcelConnect by Open Hive. All rights reserved.

## Credits

- Design and Development: Custom implementation
- Typography: Inter font family from Google Fonts
- Icons: Custom SVG icons
