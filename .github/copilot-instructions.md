<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# PUPITO E-commerce Website - AI Development Guide

## Architecture Overview
This is a **Next.js 14+ App Router** e-commerce site for PUPITO anime streetwear brand. The architecture follows a **component-centric pattern** with strict **dark neon aesthetic**.

### Core Components Structure
- **Layout System**: `app/layout.tsx` → `GlobalHeader` → `Navigation` (with CSS modules)
- **Main Content**: `PupitoHomepage` (single-page design with sections)
- **Interactive Features**: `Chatbot`, `SignupPopup` with Framer Motion animations
- **API Layer**: Route handlers in `app/api/` for newsletter, chat, contact

### Critical Design System
**Brand Colors (use exactly these):**
```css
Charcoal Black: #0D0D0D (primary bg)
Neon Pink: #FF69B4 (primary brand)
Hot Pink: #FF1493 (hover states)
Hero Blue: #1E90FF (secondary brand)
Cyan: #00FFFF (accents)
Anime Yellow: #FFD700 (highlights)
```

**Gradient Patterns (copy existing style):**
- Buttons: `bg-linear-to-r from-[#FF69B4] to-[#FF1493]`
- Hover effects: `hover:from-[#1E90FF] hover:to-[#00FFFF]`
- Cards: `bg-linear-to-br from-[#1A1A1A] to-[#2A2A2A]`

## Development Patterns

### 1. Component Architecture
- **CSS Modules**: Navigation uses `Navigation.module.css` - follow this pattern for new components
- **Inline Tailwind**: Homepage and other components use utility classes with brand colors
- **Motion Components**: Wrap interactive elements with `motion.div` from Framer Motion

### 2. API Route Pattern
```typescript
// Follow /api/newsletter/route.ts structure
export async function POST(request: NextRequest) {
  // 1. Validate input with custom regex
  // 2. Read/write JSON data to /data directory
  // 3. Send branded emails with nodemailer
  // 4. Return NextResponse with success/error
}
```

### 3. Email System (Nodemailer)
- **Multi-provider support**: Gmail, Outlook, Hostinger configs in newsletter route
- **File-based storage**: Email lists saved to `data/email-list.json`
- **Branded templates**: HTML emails with PUPITO styling (see newsletter route)

### 4. Printful API Integration
- **Print-on-Demand**: All products use Printful for manufacturing and fulfillment
- **API Structure**: Create `/api/printful/` routes for products, orders, shipping
- **Product Sync**: Sync Printful catalog with local product data
- **Order Flow**: Frontend → API routes → Printful API → Order fulfillment

### 5. Printful API Pattern
```typescript
// Follow this structure for Printful API routes
export async function GET() {
  const response = await fetch('https://api.printful.com/products', {
    headers: {
      'Authorization': `Bearer ${process.env.PRINTFUL_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  return NextResponse.json(await response.json());
}
```

### 6. State Management Pattern
```typescript
// Use React hooks with proper typing
const [email, setEmail] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");

// Form submission pattern
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");
  try {
    const response = await fetch('/api/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    });
    // Handle response...
  } catch {
    setError("User-friendly error message");
  } finally {
    setIsLoading(false);
  }
};
```

## Project-Specific Rules

### Styling Requirements
1. **Always use dark theme**: Default bg should be `#0D0D0D`
2. **Neon glow effects**: Add `shadow-[0_0_20px_rgba(255,105,180,0.4)]` to interactive elements
3. **Anime aesthetic**: Include animated particles, glow effects, cyberpunk styling
4. **Mobile-first**: All components must be responsive with `sm:` and `lg:` breakpoints

### Animation Standards
- **Page transitions**: Use `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`
- **Hover effects**: `whileHover={{ y: -5, scale: 1.02 }}`
- **Button interactions**: Include glow shadow changes on hover

### Content Patterns
- **Brand voice**: Anime-inspired, energetic, use "Pup Squad" for community
- **Placeholder naming**: Use anime/gaming references (Galaxy Arc, Neon Kitsune, etc.)
- **Icons**: Lucide React icons with `w-4 h-4` or `w-5 h-5` sizing

## Development Workflows

### Adding New Pages
1. Create in `app/[page]/page.tsx` with layout.tsx if needed
2. Add navigation link to `Navigation.tsx` NAV_LINKS array
3. Follow existing responsive grid patterns from homepage sections

### API Integration
- **Newsletter**: Use existing `/api/newsletter` route pattern
- **Contact forms**: Follow newsletter validation/error handling
- **File storage**: Save data to `/data` directory as JSON
- **Printful**: Create `/api/printful/products`, `/api/printful/orders` routes following auth pattern
- **Product Data**: Cache Printful products locally, sync with external API calls

### Component Development
- **Reusable UI**: Extend `src/components/ui/` (shadcn/ui components)
- **Page sections**: Follow `Section` wrapper pattern from homepage
- **Interactive elements**: Always include loading states, error handling

## Key Files to Reference
- `src/components/PupitoHomepage.tsx` - Main component patterns & styling
- `src/components/Navigation.tsx` + `.module.css` - Navigation architecture  
- `src/app/api/newsletter/route.ts` - API route & email patterns
- `src/app/globals.css` - Tailwind configuration & CSS variables
- `src/components/Chatbot.tsx` - Complex interactive component example

## Environment Setup
Required env vars: 
- **Email**: `EMAIL_USER`, `EMAIL_PASSWORD`, `EMAIL_PROVIDER` (gmail/outlook/hostinger), `NOTIFICATION_EMAIL`
- **Printful**: `PRINTFUL_API_TOKEN` (from Printful dashboard)