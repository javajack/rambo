// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// GitHub Pages project site: https://javajack.github.io/rambo
// For local dev the site is served at http://localhost:4321/rambo/
const SITE = 'https://javajack.github.io';
const BASE = '/rambo';
const OG_IMAGE = `${SITE}${BASE}/og-image.png`;
const GA_ID = 'G-G986QLPFZ1';

// Structured data (SEO + LLM discoverability): the site + author attribution.
const JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'Rambo',
      url: `${SITE}${BASE}/`,
      description:
        'A local-first, closed-source, agent-native API client competing with Postman, Insomnia, Bruno, Yaak and Hoppscotch — strategy, market, business model, and validated feature deep-dives.',
      author: { '@id': '#rakesh' },
    },
    {
      '@type': 'Person',
      '@id': '#rakesh',
      name: 'Rakesh Waghela',
      url: 'https://www.linkedin.com/in/rakeshwaghela',
      jobTitle: 'Tech & KYC Solutions Architect',
      sameAs: [
        'https://x.com/webiyo',
        'https://www.linkedin.com/in/rakeshwaghela',
        'https://topmate.io/rakeshwaghela',
      ],
    },
  ],
});

// Google Consent Mode v2 defaults (GDPR-aware via a timezone heuristic). Runs before
// gtag.js loads, and sets window.__isGDPRRegion which cookie-consent.js reads to decide
// whether to show the banner (denied-by-default in GDPR regions, granted elsewhere).
const CONSENT_DEFAULT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
function isGDPRRegion(){
  try {
    var tz = (Intl.DateTimeFormat().resolvedOptions().timeZone) || '';
    return ['Europe/','Atlantic/Reykjavik','Atlantic/Azores','Atlantic/Madeira'].some(function(z){return tz.indexOf(z)===0;});
  } catch (e) { return false; }
}
var isGDPR = isGDPRRegion();
window.__isGDPRRegion = isGDPR;
gtag('consent','default',{
  'ad_storage':'denied',
  'ad_user_data':'denied',
  'ad_personalization':'denied',
  'analytics_storage': isGDPR ? 'denied' : 'granted',
  'wait_for_update': 500
});
`.trim();

const GTAG_CONFIG = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { 'anonymize_ip': true, 'cookie_flags': 'SameSite=None;Secure' });
`.trim();

export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [
    starlight({
      title: 'Rambo',
      tagline: 'A local-first, agent-native API client — built to beat the incumbents at their own game.',
      description:
        'Strategy, market, business model, and validated feature deep-dives for Rambo: a local-first, closed-source, agent-native API client competing with Postman, Insomnia, Bruno, Yaak and Hoppscotch.',
      social: {
        github: 'https://github.com/javajack/rambo',
        twitter: 'https://x.com/webiyo',
        linkedin: 'https://www.linkedin.com/in/rakeshwaghela',
      },
      // Append author attribution beneath Starlight's default footer.
      components: {
        Footer: './src/components/Footer.astro',
      },
      // Extra <head> tags. Starlight already emits og:title/description/type/url/locale/
      // site_name and twitter:card=summary_large_image — so we add only what's missing.
      head: [
        // SEO / search-engine verification
        { tag: 'meta', attrs: { name: 'yandex-verification', content: '5281e40eca9463d2' } },
        // Open Graph image (Facebook / LinkedIn / Slack link previews)
        { tag: 'meta', attrs: { property: 'og:image', content: OG_IMAGE } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        // Twitter / X card extras
        { tag: 'meta', attrs: { name: 'twitter:site', content: '@webiyo' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: OG_IMAGE } },
        // Structured data (SEO + LLM discoverability)
        { tag: 'script', attrs: { type: 'application/ld+json' }, content: JSON_LD },
        // Google Consent Mode defaults — must run before gtag.js
        { tag: 'script', content: CONSENT_DEFAULT },
        // Google Analytics 4 (gtag.js)
        { tag: 'script', attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}` } },
        { tag: 'script', content: GTAG_CONFIG },
        // Cloudflare Web Analytics (hostname-scoped beacon)
        {
          tag: 'script',
          attrs: {
            defer: true,
            src: 'https://static.cloudflareinsights.com/beacon.min.js',
            'data-cf-beacon': '{"token": "7ce325bb227e4b42a8406f369ff4e788"}',
          },
        },
        // Cookie-consent banner (GDPR) + GA consent update
        { tag: 'script', attrs: { defer: true, src: `${BASE}/cookie-consent.js` } },
      ],
      lastUpdated: true,
      pagefind: true,
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'The Idea', slug: 'overview/the-idea' },
            { label: 'Executive Summary', slug: 'overview/executive-summary' },
            { label: 'Why Now', slug: 'overview/why-now' },
            { label: 'How This Was Built', slug: 'overview/methodology' },
          ],
        },
        { label: 'The Opportunity', autogenerate: { directory: 'opportunity' } },
        { label: 'The Product', autogenerate: { directory: 'product' } },
        { label: 'Feature Deep Dives', autogenerate: { directory: 'features' }, collapsed: true },
        { label: 'Business Model', autogenerate: { directory: 'business' } },
        { label: 'Go-To-Market', autogenerate: { directory: 'gtm' } },
        { label: 'Enterprise & Multi-Tenancy', autogenerate: { directory: 'enterprise' }, collapsed: true },
        { label: 'Architecture & Implementation', autogenerate: { directory: 'architecture' } },
        { label: 'Engineering Specs', autogenerate: { directory: 'specs' }, collapsed: true },
        { label: 'Backend & Infrastructure', autogenerate: { directory: 'backend' }, collapsed: true },
        { label: 'Strategy & Decisions', autogenerate: { directory: 'strategy' } },
        { label: 'Evidence', autogenerate: { directory: 'evidence' } },
        { label: '★ The Complete Workout', items: [{ label: 'One-Page Compendium (long read)', slug: 'compendium' }] },
      ],
    }),
  ],
});
