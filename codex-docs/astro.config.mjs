// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://javajack.github.io',
  base: '/rambo/codex-docs',
  outDir: './dist',
  devToolbar: { enabled: false },
  integrations: [
    starlight({
      title: 'Rambo Codex Research',
      tagline: 'Relentless, cited, adversarial research for a local-first, agent-native API client.',
      description:
        'Codex-generated product, market, competitive, technical, and business research for Rambo: a local-first, closed-source, agent-native API client.',
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
            { label: 'Executive Verdict', slug: 'overview/executive-verdict' },
            { label: 'Methodology', slug: 'overview/methodology' },
            { label: 'Research Map', slug: 'overview/research-map' },
          ],
        },
        { label: 'Research Findings', autogenerate: { directory: 'research' } },
        { label: 'Market', autogenerate: { directory: 'market' } },
        { label: 'Competition', autogenerate: { directory: 'competition' } },
        { label: 'Pain Ledger', autogenerate: { directory: 'pain' } },
        { label: 'Product Strategy', autogenerate: { directory: 'product' } },
        { label: 'Business Case', autogenerate: { directory: 'business' } },
        { label: 'Enterprise', autogenerate: { directory: 'enterprise' } },
        { label: 'Architecture', autogenerate: { directory: 'architecture' } },
        { label: 'GTM', autogenerate: { directory: 'gtm' } },
        { label: 'Risks', autogenerate: { directory: 'risks' } },
        { label: 'Evidence', autogenerate: { directory: 'evidence' } },
      ],
    }),
  ],
});
