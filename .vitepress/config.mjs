import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot  = resolve(__dirname, '..')

const CUSTOM_LAYOUTS = new Set(['console_commands', 'prefab'])

export default defineConfig({
  outDir: './vitepress-dist',

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
    'user/game_update.md',
  ],

  base: '/VRising-Mod-Wiki/',

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
        // @data → _data/; for import.meta.glob use '/_data/...' directly
        '@data': resolve(repoRoot, '_data'),
      },
    },
    server: {
      fs: {
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
          { text: 'Overview',     link: '/community/' },
          { text: 'Discord',      link: 'https://vrisingmods.com/discord' },
          { text: 'Thunderstore', link: 'https://thunderstore.io/c/v-rising/' },
          { text: 'Contributing', link: '/editing' },
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

      '/community/': [
        {
          text: 'Community',
          items: [
            { text: 'Overview',                  link: '/community/' },
            { text: 'Values of This Community',  link: '/community/values' },
            { text: 'Abandoned Mods',            link: '/community/abandoned-mods' },
            { text: 'Mod Monetization',          link: '/community/monetization' },
          ],
        },
      ],

      '/prefabs/': [
        {
          text: 'Prefabs',
          items: [
            { text: 'Overview',     link: '/prefabs/' },
            { text: 'All Prefabs',  link: '/prefabs/All' },
            { text: 'NPCs',         link: '/prefabs/CHAR' },
            { text: 'Items',        link: '/prefabs/Item' },
            { text: 'Tile Models',  link: '/prefabs/TM' },
            { text: 'VBlood Names', link: '/prefabs/VBloodNames' },
            { text: 'Remainders',   link: '/prefabs/Remainders' },
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
