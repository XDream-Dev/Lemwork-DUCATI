# Ducati Panigale V2 Color Studio

An interactive color customization showcase for the Ducati Panigale V2 motorcycle featuring smooth animations, parallax effects, and dynamic theme switching.

## Features

- **Hero Section with Parallax Effect**: Motorcycle image responds to mouse movement with smooth horizontal drift
- **Interactive Color Carousel**: Click color dots to instantly change the motorcycle color and update the entire theme
- **Dynamic Content Updates**: Hero text (title, subtitle, description) changes based on selected color to match the mood
- **Specs Tabulation**: Clean tabbed interface to view different motorcycle specifications with animated transitions
- **Premium Animations**: Staggered entrance animations, hover effects, and micro-interactions throughout
- **Responsive Design**: Adapts beautifully to different screen sizes
- **Performance Optimized**: Hardware-accelerated animations with will-change properties

## File Structure

```
WEB/
├── index.html        # Main HTML structure
├── style.css         # All styling and animations
├── script.js         # Interactive functionality
├── README.md         # This file
└── assets/           # Image assets
    ├── red_moto.png
    ├── yellow.png
    ├── green_moto.png
    ├── white-moto.png
    └── brown-moto.png
```

## How to Run

1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. No build process or dependencies required - pure HTML/CSS/JS

## Technical Details

### Animations & Effects

- **Hero Entrance**: Motorcycle flies in from left with rotation and scale effects
- **Text Stagger**: Hero copy elements animate in sequence for premium feel
- **Color Transitions**: Smooth fade/scale transitions when changing colors
- **Parallax**: Horizontal mouse-driven movement with subtle rotation
- **Micro-interactions**: Hover effects on buttons, color dots, and spec tabs

### CSS Custom Properties

```css
:root {
  --theme-color: #e30613; /* Primary Ducati red */
  --off-white: #f5f5f5; /* Background */
  --deep-black: #1a1a1a; /* Text */
  --text-gray: #666; /* Secondary text */
  --transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); /* Shared easing */
  --hero-ease: cubic-bezier(0.16, 1, 0.3, 1); /* Hero entrance */
}
```

### JavaScript Functionality

- `changeBikeColor()`: Handles color selection, updates images, theme color, and dynamic text
- Hero parallax: Mouse movement drives horizontal translation of bike track
- Spec tabs: Active state switching with transform animations
- Text swap: Smooth transition when updating hero copy based on color selection

## Customization

### Adding New Colors

1. Add new image to assets folder (naming convention: `[color]_[moto|moto].png`)
2. Add new color option in both hero and specs sections:
   ```html
   <div
     class="color-option"
     onclick="changeBikeColor('#HEXCODE', 'image-name.png', this)"
     data-hero-kicker="BRAND TEXT"
     data-hero-overline="SUBTITLE"
     data-hero-title="MODEL NAME"
     data-hero-subtitle="DESCRIPTION"
     data-hero-copy="FULL DESCRIPTION"
   >
     <div class="color-dot dot-[color-name]"></div>
   </div>
   ```
3. Add corresponding CSS color dot:
   ```css
   .dot-[color-name] {
     background-color: #HEXCODE;
   }
   ```

### Adjusting Animation Timing

Modify the animation durations and delays in `style.css`:

- Hero entrance: Look for `.body.hero-ready .bike-container` animation
- Text animations: Check `.body.hero-ready .hero-*` elements
- Transition speed: Adjust `--transition` variable in :root

## Browser Support

Works in all modern browsers that support:

- CSS Custom Properties
- CSS Animations
- CSS Transformations
- Flexbox Layout
- `backdrop-filter` (falls back gracefully)

## Credits

Built as an interactive showcase demonstrating advanced CSS animations and vanilla JavaScript techniques for product configurators.
