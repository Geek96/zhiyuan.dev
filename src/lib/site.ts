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
  // one-line identity shown in the hero
  role: "Software engineer & tinkerer",
  location: "Atlanta, GA",
  email: "zhiyuan.daniel06@gmail.com",
} as const;

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Index", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Notes", href: "/notes" },
  { label: "Now", href: "/now" },
];

export type Social = { label: string; href: string; handle: string };

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/", handle: "@zhiyuan" },
  { label: "Email", href: "mailto:zhiyuan.daniel06@gmail.com", handle: "zhiyuan.daniel06@gmail.com" },
  { label: "X", href: "https://x.com/", handle: "@zhiyuan" },
  { label: "RSS", href: "/rss.xml", handle: "/rss.xml" },
];
