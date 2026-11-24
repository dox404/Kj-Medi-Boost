# KJ MediBoost

A responsive healthcare marketing landing page based on **KJ MediBoost.pdf**. Plain HTML, CSS and JavaScript. No framework, package installation or build required.

The public copy has been restored to the PDF's wording. See [CONTENT-CHECK.md](CONTENT-CHECK.md) for the section-by-section audit, verification results and pending assets. The visual design uses a cream and forest green palette, generous reading space, refined cards and 16px body text.

## Files

```text
index.html        Page content
style.css         Design and responsive layouts
script.js         Contact settings, team, gallery and interactions
assets/           Favicon and your future photos / videos
README.md         Setup and deployment notes
CONTENT-CHECK.md  PDF content audit and verification results
KJ MediBoost.pdf  Original brief (do not upload to your public website)
```

## Preview

Open `index.html` in your browser, or run:

```sh
python -m http.server 5500
```

Then visit http://localhost:5500. The page uses Google Fonts, with local system font fallbacks if offline. All illustrations and other visual elements are local HTML, CSS and SVG.

## Add your details

Edit the `SITE` settings at the top of `script.js`:

- `email`: your real business email.
- `phone`: your display phone number, including country code.
- `whatsapp`: international digits only, without `+` or spaces.
- `socials`: full links to your Instagram, Facebook, LinkedIn and YouTube profiles.
- `founderPhoto`: a path such as `assets/kunika.jpg`.
- `reviews`: exact approved review text, original review URL and an optional approved `photo` path for each doctor.
- `videos`: local video paths with captions and optional poster images.

Set each person's `photo` in `TEAM` and each gallery item's `photo` in `GALLERY`. Add the files to `assets/`. The design uses initials and abstract artwork until genuine photos are available; no stock person is presented as a real team member. Client reviews and videos stay marked as coming soon until supplied. The PDF and generated deployment ZIP are intentionally excluded from Git; the repository contains deployable source and documentation.

## Consultation form

Contact details were not supplied in the brief. The form validates fields but **does not send or save enquiries until you configure a destination**. It clearly tells visitors this; it never reports a fake submission.

Choose one of these options in `SITE`:

1. Set `formEndpoint` to your form service or backend's HTTPS URL. The form sends JSON via POST with `name`, `phone`, `email`, `practice`, `city`, `service`, `message`, `consent` and `website` (honeypot). Your endpoint must accept this JSON, allow your site's origin via CORS, validate input, apply spam/rate protection, and return a 2xx status only after accepting the enquiry. Keep API keys on the server.
2. Set `whatsapp`. If no endpoint is configured, the form prepares a WhatsApp message. The visitor reviews and sends it themselves.
3. Set `email`. If neither endpoint nor WhatsApp is configured, the form prepares a message in the visitor's email app. The visitor must send it.

For full background submission, use option 1. Email and WhatsApp handoffs do not claim delivery. Phone, social and WhatsApp links appear only when their details are provided. Please confirm the PDF's office address before launch.

## Deploy

Upload only these files to the public web root of any static host:

```text
index.html
style.css
script.js
assets/
```

- **cPanel / shared hosting:** place these files directly inside `public_html/` (or your chosen domain folder).
- **Netlify:** drag a folder containing these files into Netlify's manual deploy screen. No build command needed.
- **Cloudflare Pages / GitHub Pages:** publish the directory containing `index.html` as a static site; no build command.

Do not upload the source PDF, this README, or development utilities. There are no client-side routes, so no redirect rules are required. Use HTTPS. Add your real contact details and approved photos, reviews and videos before announcing the website.

## Content covered

Hero, five trust highlights, all 12 healthcare audiences, all 14 services, SEO/AEO/GEO, reasons to choose KJ MediBoost, founder and vision, all eight team roles, branding and lead generation, seven working steps, three named clients, authorised review/video slots, all six culture gallery categories, ten FAQs, consultation CTA and footer with Gujarat service areas.
