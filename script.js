const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const chatBody = document.getElementById('chatBody');
const demoReplies = [
  { match: 'website', answer: 'Great! We can help plan a responsive website that explains your offer clearly and guides visitors toward contacting you. What kind of business do you run?' },
  { match: 'automate', answer: 'AI automation can help answer common questions, capture lead details, and route enquiries. We can map a workflow around your current customer journey.' },
  { match: 'ads', answer: 'We can help structure Facebook and Instagram campaigns around your audience, offer, and goals. A good starting point is understanding who you want to reach.' }
];
chatBody?.addEventListener('click', event => {
  const button = event.target.closest('button[data-reply]');
  if (!button) return;
  const reply = button.dataset.reply;
  const match = demoReplies.find(item => reply.toLowerCase().includes(item.match));
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-message user';
  userBubble.textContent = reply;
  chatBody.appendChild(userBubble);
  const botBubble = document.createElement('div');
  botBubble.className = 'chat-message bot';
  botBubble.textContent = match?.answer || 'Thanks for sharing. Tell us a little more and our team can help you choose a useful next step.';
  chatBody.appendChild(botBubble);
  chatBody.querySelector('.chat-choices')?.remove();
  chatBody.scrollTop = chatBody.scrollHeight;
});

const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const services = data.getAll('services');
  const subject = encodeURIComponent(`Business Graph enquiry from ${data.get('name')}`);
  const body = encodeURIComponent(
`Name: ${data.get('name')}
Business: ${data.get('business') || 'Not provided'}
Email: ${data.get('email')}
Phone: ${data.get('phone') || 'Not provided'}
Services: ${services.join(', ') || 'Not specified'}

Message:
${data.get('message') || 'No message provided'}`
  );
  // Replace the address below with your real business inbox before publishing.
  const recipient = 'hello@yourdomain.com';
  document.getElementById('formStatus').textContent =
    recipient.includes('yourdomain') ? 'Demo setup: replace hello@yourdomain.com in script.js with your real email before publishing.' : 'Opening your email app with the enquiry details…';
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});
