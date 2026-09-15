/**
 * Central place for identity + link data.
 * Edit these — everything on the site reads from here.
 */

export const site = {
  name: "Zhiyuan",
  domain: "zhiyuan.dev",
  title: "Zhiyuan — building things on the web",
  description:
    "Personal site of Zhiyuan. Notes, projects, and what I'm doing now.",
  // one-line identity, used on /dashboard and in meta tags
  role: "Software engineer & tinkerer",
  location: "Atlanta, GA",
  email: "zwu676@gatech.edu",
  // shown on the homepage under the photo — write this yourself, it's the
  // first thing anyone reads
  welcome:
    "Most things worth building look, from far enough away, like standing still and looking at something larger than you.",
  // put a real photo at public/photo.jpg and it replaces the monogram
  // automatically, no code change needed
  photo: "/photo.jpg",
} as const;

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Index", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Notes", href: "/notes" },
  { label: "Now", href: "/now" },
];

export type Social = { label: string; href: string; handle: string };

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/Geek96", handle: "@Geek96" },
  { label: "Email", href: "mailto:zwu676@gatech.edu", handle: "zwu676@gatech.edu" },
  { label: "RSS", href: "/rss.xml", handle: "/rss.xml" },
];
