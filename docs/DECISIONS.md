**Framework: Next.js**\
We want to have a Fullstack framework like Next.js mainly for SSR.
Since this would be under an auth layer, we don't care much about SEO at this point.


**UI Library: Shadcn**\
We will cover accessibility with this headless UI. Also it's easy to build styles on top of it with Tailwind CSS.
It's maintained but also the gist of it is that it clones the components into our own repo to maintain them and tweak them.

**Theming with Tailwind CSS**
It works really well with headless libs like Shadcn. Also it's easy to do a mobile-first approach.

- Transactions can be cached


### Components

- Decorative images like logos or stylistic icons, do not need `alt` attribute.
- Icons are treated as components to reuse them and change their colors easily. I preferred a simple approach like creating the icon manually but there are more sophisticated solutions like svgr library.