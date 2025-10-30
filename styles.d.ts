/**
 * Declare for all CSS files in the project (Side-Effect Imports)
 */

declare module '*.css' {
  // Catching regular CSS imports
}

// Declarations for CSS Modules
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

// Declaration for SCSS/SASS
declare module '*.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

// Declare for any other Swiper CSS module
declare module 'swiper/css*' {
  // The 'swiper/css*' syntax will catch all imports starting with 'swiper/css'
}
