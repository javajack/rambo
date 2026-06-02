// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// GitHub Pages project site: https://javajack.github.io/rambo
// For local dev the site is served at http://localhost:4321/rambo/
export default defineConfig({
  site: 'https://javajack.github.io',
  base: '/rambo',
  integrations: [
    starlight({
      title: 'Rambo',
      tagline: 'A local-first, agent-native API client — built to beat the incumbents at their own game.',
      description:
        'Strategy, market, business model, and validated feature deep-dives for Rambo: a local-first, closed-source, agent-native API client competing with Postman, Insomnia, Bruno, Yaak and Hoppscotch.',
      social: {
        github: 'https://github.com/javajack/rambo',
      },
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
      ],
    }),
  ],
});
