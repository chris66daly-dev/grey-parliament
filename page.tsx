@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

:root {
  --grey: #2a2a2a;
  --gold: #c9a84c;
  --cream: #f5f0e8;
  --dark: #1a1a1a;
  --mid: #4a4a4a;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Source Serif 4', Georgia, serif;
  background: var(--cream);
  color: var(--dark);
  line-height: 1.6;
}

.playfair { font-family: 'Playfair Display', serif; }
