import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// Now at the repo root — __dirname is .vitepress/, repoRoot is one level up
const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot  = resolve(__dirname, '..')

const CUSTOM_LAYOUTS = new Set(['console_commands', 'prefab'])

export default defineConfig({
  // srcDir defaults to '.' — the repo root, where all .md files live.
  // Jekyll's _* directories and dotfiles are already excluded by VitePress.
  outDir: './vitepress-dist',

  // Remap Jekyll custom layout names to 'doc' so VitePress renders the full
  // shell (nav + sidebar + footer). The original layout name is stashed in
  // `customLayout` so our theme can still inject the right Vue component.
  transformPageData(pageData) {
    const layout = pageData.frontmatter.layout
    if (CUSTOM_LAYOUTS.has(layout)) {
      pageData.frontmatter.customLayout = layout
      pageData.frontmatter.layout = 'doc'
    }
  },

  srcExclude: [
    'node_modules/**',
    'vitepress-dist/**',
    'README.md',
    'editing.md',
  ],

  title: 'V Rising Mod Wiki',
  description: 'Information about mods for the game V Rising: setup, modding, development, and prefab references.',

  appearance: 'dark',

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap', rel: 'stylesheet' }],
    ['link', { rel: 'icon', href: '/images/VRisingModdingLogoNew.png' }],
    ['meta', { property: 'og:image', content: '/images/VRisingModdingLogoNew.png' }],
    ['meta', { name: 'twitter:image', content: '/images/VRisingModdingLogoNew.png' }],
    ['meta', { property: 'og:description', content: 'Information about mods for the game V Rising.' }],
    ['script', { defer: '', 'data-domain': 'wiki.vrisingmods.com', src: 'https://traffic.dev.deca.gg/js/script.js' }],
  ],

  vite: {
    resolve: {
      alias: {
        // @data → _data/ in the repo root; usable in regular `import` statements.
        // For import.meta.glob, use the literal path '/_data/...' instead.
        '@data': resolve(repoRoot, '_data'),
      },
    },
    server: {
      fs: {
        // Allow Vite dev server to serve files from the repo root
        allow: [repoRoot],
      },
    },
  },

  themeConfig: {
    logo: '/images/VRisingModdingLogoNew.png',
    siteTitle: false,

    nav: [
      { text: 'Home',            link: '/' },
      { text: 'For Users',       link: '/user/' },
      { text: 'For Developers',  link: '/dev/' },
      { text: 'Prefabs',         link: '/prefabs/' },
      {
        text: 'Community',
        items: [
          { text: 'Discord',      link: 'https://vrisingmods.com/discord' },
          { text: 'Thunderstore', link: 'https://thunderstore.io/c/v-rising/' },
        ],
      },
    ],

    sidebar: {
      '/user/': [
        {
          text: 'For Users',
          items: [
            { text: 'Overview',                link: '/user/' },
            { text: 'BepInEx Install',         link: '/user/bepinex_install' },
            { text: 'Manual Mod Installation', link: '/user/Mod_Install' },
            { text: 'Using Server Mods',       link: '/user/Using_Server_Mods' },
            { text: 'Console Commands',        link: '/user/Console_Commands' },
            { text: 'Client Rollback',         link: '/user/client_rollback' },
          ],
        },
      ],

      '/dev/': [
        {
          text: 'For Developers',
          items: [
            { text: 'Overview',            link: '/dev/' },
            { text: 'Development Setup',   link: '/dev/development_setup' },
            { text: 'Template',            link: '/dev/template' },
            { text: 'Resources',           link: '/dev/resources' },
            { text: 'Open Source Mods',    link: '/dev/open source' },
            { text: 'Migration Guide',     link: '/dev/migration_guide' },
            { text: 'Thunderstore Upload', link: '/dev/upload_to_thunderstore' },
            { text: 'AI Usage',            link: '/dev/AI_Usage' },
          ],
        },
      ],

      '/prefabs/': [
        {
          text: 'Prefabs',
          items: [
            { text: 'Overview',     link: '/prefabs/' },
            { text: 'All Prefabs',  link: '/prefabs/All' },
            { text: 'Remainders',   link: '/prefabs/Remainders' },
            { text: 'VBlood Names', link: '/prefabs/VBloodNames' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/decaprime/vrising-modding' },
    ],

    editLink: {
      pattern: 'https://github.com/decaprime/vrising-modding/edit/main/:path',
      text: 'Edit this page on GitHub',
    },

    search: { provider: 'local' },

    outline: {
      label: 'Jump To',
    },

    footer: {
      message: 'Wiki maintained by <a href="https://github.com/decaprime/">deca</a> and contributors.',
    },

    lastUpdated: { text: 'Last updated' },
  },
})
