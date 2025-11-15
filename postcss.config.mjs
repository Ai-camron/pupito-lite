// Turbopack sometimes executes this file in an environment where `process.env`
// is undefined, which breaks PostCSS plugins that read `process.env.DEBUG`.
// Ensure it's always at least an object so Tailwind's loader can initialize.
if (typeof process !== 'undefined' && typeof process.env === 'undefined') {
  process.env = {};
}

const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
