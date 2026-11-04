const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');

// REPLACE WITH REAL CUSTOMER REVIEWS
const customerReviews = [
  {
    rating: 5,
    text: 'Friendly communication and careful attention to the details made this project feel straightforward.',
    firstName: 'First name',
    town: 'Glasgow area',
  },
  {
    rating: 5,
    text: 'The finished space feels brighter and more comfortable. A thoughtful experience from start to finish.',
    firstName: 'First name',
    town: 'Glasgow area',
  },
  {
    rating: 5,
    text: 'A helpful approach, clear conversations and a finish that feels just right for our home.',
    firstName: 'First name',
    town: 'Glasgow area',
  },
];

const reviewList = document.querySelector('#review-card-list');
customerReviews.forEach((review) => {
  const card = document.createElement('article');
  card.className = 'review-card';
  const stars = document.createElement('span');
  stars.className = 'review-stars';
  stars.setAttribute('role', 'img');
  stars.setAttribute('aria-label', `${review.rating} out of 5 stars`);
  stars.textContent = '★'.repeat(review.rating);
  const quote = document.createElement('blockquote');
  quote.textContent = review.text;
  const attribution = document.createElement('cite');
  const name = document.createElement('strong');
  name.textContent = review.firstName;
  const town = document.createElement('small');
  town.textContent = review.town;
  attribution.append(name, town);
  card.append(stars, quote, attribution);
  reviewList.append(card);
});

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a') && window.matchMedia('(max-width: 680px)').matches) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  }
});

const galleryItems = [...document.querySelectorAll('.gallery-item')];
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
const lightboxCount = document.querySelector('#lightbox-count');
const whatsappFloat = document.querySelector('#whatsapp-float');
const quoteForm = document.querySelector('#quote-form');
let currentImageIndex = 0;

function showGalleryImage(index) {
  currentImageIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[currentImageIndex];
  lightboxImage.src = item.dataset.gallerySrc;
  lightboxImage.alt = item.dataset.galleryAlt;
  lightboxCaption.textContent = item.dataset.galleryCaption;
  lightboxCount.textContent = `${currentImageIndex + 1} / ${galleryItems.length}`;
}

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    showGalleryImage(index);
    lightbox.showModal();
    whatsappFloat.hidden = true;
  });
});

document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('close', updateFloatingWhatsApp);
document.querySelector('.lightbox-previous').addEventListener('click', () => showGalleryImage(currentImageIndex - 1));
document.querySelector('.lightbox-next').addEventListener('click', () => showGalleryImage(currentImageIndex + 1));
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') showGalleryImage(currentImageIndex - 1);
  if (event.key === 'ArrowRight') showGalleryImage(currentImageIndex + 1);
});

quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const subject = `Quote enquiry — ${data.get('service')}`;
  const body = [
    `Name: ${data.get('name')}`,
    `Phone: ${data.get('phone')}`,
    `Service: ${data.get('service')}`,
    '',
    'Project details:',
    data.get('message'),
  ].join('\n');
  const mailto = `mailto:Spconstructionltd55@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#form-status').textContent = 'Your email app is opening with your enquiry ready to send.';
  window.location.href = mailto;
});

function updateFloatingWhatsApp() {
  const formBounds = quoteForm.getBoundingClientRect();
  const formIsVisible = formBounds.top < window.innerHeight && formBounds.bottom > 0;
  whatsappFloat.hidden = formIsVisible || lightbox.open;
}

window.addEventListener('scroll', updateFloatingWhatsApp, { passive: true });
window.addEventListener('resize', updateFloatingWhatsApp);
updateFloatingWhatsApp();

document.querySelector('#year').textContent = String(new Date().getFullYear());
