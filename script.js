'use strict';

// Add your real details here when ready. Leave unknown values empty.
// Images and videos can be stored in assets/ using any filenames you choose.
const SITE = {
  email: '',
  phone: '',
  whatsapp: '', // International digits only, e.g. 919876543210.
  formEndpoint: '', // Optional HTTPS endpoint accepting JSON via POST.
  founderPhoto: 'assets/founder.png',
  socials: { Instagram: '', Facebook: '', LinkedIn: '', YouTube: '' },
  reviews: {
    umesh: { text: '', url: '', photo: '' },
    zarna: { text: '', url: '', photo: '' },
    rajesh: { text: '', url: '', photo: '' }
  },
  // Add only genuine, authorised videos: { src: 'assets/story.mp4', caption: '...' }.
  videos: []
};

const TEAM = [
  { name: 'Vishal', role: 'Marketing', photo: '' },
  { name: 'Kuldeep', role: 'SEO Lead', photo: 'assets/kuldeep.jpg' },
  { name: 'Kishor', role: 'Performance Marketer', photo: 'assets/kishor.jpeg' },
  { name: 'Deepanshi', role: 'SEO Executive', photo: '' },
  { name: 'Hema', role: 'Social Media', photo: 'assets/hema.jpg' },
  { name: 'Komal', role: 'Video Editor', photo: '' },
  { name: 'Nidhi', role: 'Social Media Executive', photo: '' },
  { name: 'Naresh', role: 'Video Grapher', photo: 'assets/naresh.jpg' }
];

const GALLERY = [
  { title: 'Our Office', subtitle: 'Office interiors and workspace.', category: 'office', symbol: '▥', photo: '' },
  { title: 'Team at Work', subtitle: 'Team members working on campaigns.', category: 'team', symbol: '◉', photo: '' },
  { title: 'Strategy Meetings', subtitle: 'Planning and brainstorming.', category: 'office', symbol: '◎', photo: '' },
  { title: 'Creative Production', subtitle: 'Graphics, video and content production.', category: 'creative', symbol: '✳', photo: '' },
  { title: 'Professional Shoots', subtitle: 'Behind-the-scenes shoot moments.', category: 'creative', symbol: '▣', photo: '' },
  { title: 'Team Culture', subtitle: 'Team celebrations and everyday moments.', category: 'team', symbol: '✧', photo: '' }
];

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function safeLink(value) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
  } catch { return ''; }
}

function externalLink(label, url, className) {
  const link = element('a', className, label);
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  return link;
}

function addPhoto(parent, src, alt, className = '') {
  const image = element('img', className);
  image.src = src;
  image.alt = alt;
  image.loading = 'lazy';
  image.decoding = 'async';
  // If a photo is not found, preserve the designed initials / illustration.
  image.addEventListener('error', () => {
    image.remove();
    parent.classList.remove('has-photo');
  });
  parent.append(image);
  parent.classList.add('has-photo');
}

const teamGrid = document.querySelector('#team-grid');
const teamPhotos = element('div', 'team-photo-row');
const teamRoster = element('div', 'team-name-row');
teamGrid.append(teamPhotos, teamRoster);
TEAM.forEach(member => {
  const card = element('article', `team-card ${member.photo ? 'team-card-photo' : 'team-card-name'}`);
  if (member.photo) {
    const portrait = element('div', 'team-portrait');
    const initials = element('span', 'team-initials', member.name.charAt(0));
    initials.setAttribute('aria-hidden', 'true');
    portrait.append(initials);
    addPhoto(portrait, member.photo, member.name);
    card.append(portrait);
  }
  card.append(element('h3', '', member.name), element('span', 'team-role', member.role));
  (member.photo ? teamPhotos : teamRoster).append(card);
});

if (SITE.founderPhoto) addPhoto(document.querySelector('#founder-portrait'), SITE.founderPhoto, 'Dr. Kunika Jonwal, founder of KJ MediBoost', 'founder-photo');

const cultureGrid = document.querySelector('#culture-grid');
GALLERY.forEach(item => {
  const tile = element('article', 'culture-tile');
  tile.dataset.category = item.category;
  const symbol = element('span', 'culture-icon', item.symbol);
  symbol.setAttribute('aria-hidden', 'true');
  tile.append(symbol);
  if (item.photo) addPhoto(tile, item.photo, item.title);
  tile.append(element('strong', '', item.title), element('small', '', item.subtitle));
  cultureGrid.append(tile);
});
if (GALLERY.every(item => item.photo)) document.querySelectorAll('.gallery-caption')[1].hidden = true;

document.querySelectorAll('[data-gallery]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-gallery]').forEach(filter => {
      const selected = filter === button;
      filter.classList.toggle('active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('.culture-tile').forEach(tile => {
      tile.hidden = button.dataset.gallery !== 'all' && tile.dataset.category !== button.dataset.gallery;
    });
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
window.matchMedia('(min-width: 1051px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

// Native <details> stays keyboard accessible without extra ARIA or dependencies.
document.querySelectorAll('.faq-list details').forEach(detail => {
  detail.addEventListener('toggle', () => {
    if (detail.open) document.querySelectorAll('.faq-list details').forEach(other => {
      if (other !== detail) other.open = false;
    });
  });
});

const contactLinks = document.querySelector('#contact-links');
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(SITE.email) ? SITE.email : '';
const phone = SITE.phone.replace(/[^+\d]/g, '');
const whatsapp = SITE.whatsapp.replace(/\D/g, '');
if (email) {
  const link = element('a', '', email);
  link.href = `mailto:${email}`;
  contactLinks.append(link);
}
if (phone) {
  const link = element('a', '', SITE.phone);
  link.href = `tel:${phone}`;
  contactLinks.append(link);
}
if (whatsapp) contactLinks.append(externalLink('Connect on WhatsApp ↗', `https://wa.me/${whatsapp}`));
document.querySelectorAll('.whatsapp-cta').forEach(link => {
  if (whatsapp) {
    link.href = `https://wa.me/${whatsapp}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  } else {
    link.setAttribute('aria-describedby', 'booking-note');
    link.addEventListener('click', () => {
      document.querySelector('#form-status').textContent = 'Our WhatsApp contact details will be available shortly. Please check back soon.';
    });
  }
});

Object.entries(SITE.socials).forEach(([name, url]) => {
  const href = safeLink(url);
  if (href) document.querySelector('#social-links').append(externalLink(name, href));
});
if (Object.values(SITE.socials).some(url => safeLink(url))) document.querySelector('#social-pending').hidden = true;

Object.entries(SITE.reviews).forEach(([client, review]) => {
  const slot = document.querySelector(`[data-client="${client}"]`);
  const portrait = document.querySelector(`[data-client-photo="${client}"]`);
  if (portrait && review.photo) addPhoto(portrait, review.photo, portrait.parentElement.querySelector('h3').textContent);
  if (!slot || !review.text) return;
  slot.replaceChildren(element('blockquote', '', review.text));
  const href = safeLink(review.url);
  if (href) slot.append(externalLink('Read original review ↗', href, 'text-link'));
});

if (SITE.videos.length) {
  const stories = document.querySelector('#video-stories');
  stories.replaceChildren();
  SITE.videos.forEach(story => {
    const figure = element('figure');
    figure.style.margin = '0 0 20px';
    const video = element('video');
    video.controls = true;
    video.preload = 'metadata';
    video.playsInline = true;
    video.src = story.src;
    video.setAttribute('aria-label', story.caption || 'Doctor testimonial');
    if (story.poster) video.poster = story.poster;
    figure.append(video, element('figcaption', '', story.caption || ''));
    stories.append(figure);
  });
}

const form = document.querySelector('#consultation-form');
const formStatus = document.querySelector('#form-status');
const endpoint = safeLink(SITE.formEndpoint);
const bookingReady = Boolean(endpoint || email || whatsapp);
const submitButton = form.querySelector('button[type="submit"]');
if (bookingReady) document.querySelector('#booking-note').textContent = 'Your enquiry is used only to discuss your healthcare marketing needs.';
if (!endpoint && whatsapp) submitButton.firstChild.textContent = 'Continue on WhatsApp ';
else if (!endpoint && email) submitButton.firstChild.textContent = 'Prepare email enquiry ';

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form).entries());
  if (data.website) return;
  if (!bookingReady) {
    formStatus.textContent = 'Online consultation requests are not open yet. Please check back soon, or visit our Ahmedabad office. Your details have not been sent or saved.';
    return;
  }
  const message = `Free strategy consultation request\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nPractice: ${data.practice}\nCity: ${data.city}\nService: ${data.service}\nGoals: ${data.message || 'Let’s discuss'}\n\nI agree to be contacted about this enquiry.`;
  if (endpoint) {
    submitButton.disabled = true;
    form.setAttribute('aria-busy', 'true');
    formStatus.textContent = 'Sending your consultation request…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal
      });
      if (!response.ok) throw new Error('Request failed');
      formStatus.textContent = 'Thank you. Your consultation request has been sent. Our team will be in touch.';
      form.reset();
    } catch {
      formStatus.textContent = 'We couldn’t send your request. Please try again or use the contact options alongside the form. Your entries are still here.';
    } finally {
      clearTimeout(timeout);
      submitButton.disabled = false;
      form.removeAttribute('aria-busy');
    }
  } else if (whatsapp) {
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
    formStatus.replaceChildren(document.createTextNode('Your enquiry is ready. '), externalLink('Open WhatsApp to review and send it.', url));
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    const url = `mailto:${email}?subject=${encodeURIComponent('Free healthcare marketing consultation')}&body=${encodeURIComponent(message)}`;
    const link = element('a', '', 'Open your email app to review and send it.');
    link.href = url;
    formStatus.replaceChildren(document.createTextNode('Your enquiry is ready. '), link);
    window.location.href = url;
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();

// Content starts visible. Motion is added only when the browser supports it.
if ('IntersectionObserver' in window) {
  const sections = document.querySelectorAll('main > section[id]');
  const navLinks = [...navigation.querySelectorAll('a[href^="#"]')];
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -60% 0px' });
  sections.forEach(section => activeObserver.observe(section));

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.section-heading, .service-feature, .why-layout, .founder-layout, .pillar, .team-card, .client-card').forEach(node => {
      node.classList.add('reveal');
      revealObserver.observe(node);
    });
  }
}
