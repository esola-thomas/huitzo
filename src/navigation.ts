import { getPermalink } from "./utils/permalinks";

export const headerData = {
  links: [
    {
      text: "Home",
      href: getPermalink("/"),
    },
    {
      text: "Docs",
      links: [
        { text: "Documentation Home", href: getPermalink("/docs") },
        { text: "User Guide", href: getPermalink("/docs/users") },
        { text: "Developer Guide", href: getPermalink("/docs/developers") },
      ],
    },
    {
      text: "Roadmap",
      href: getPermalink("/roadmap"),
    },
    {
      text: "Plugins",
      href: getPermalink("/plugins"),
    },
    {
      text: "Report an issue",
      href: "https://github.com/esola-thomas/huitzo/issues/new",
      target: "_blank",
    },
  ],
  actions: [
    {
      text: "Launch CLI (COMING SOON)",
      href: "https://cli.huitzo.com",
      target: "_blank",
    },
  ],
};

export const footerData = {
  links: [
    {
      title: "Platform",
      links: [
        { text: "Roadmap", href: getPermalink("/roadmap") },
        { text: "Plugins", href: getPermalink("/plugins") },
        {
          text: "CLI Platform (COMING SOON)",
          href: "https://cli.huitzo.com",
          target: "_blank",
        },
      ],
    },
    {
      title: "Documentation",
      links: [
        { text: "User Guide", href: getPermalink("/docs/users") },
        { text: "Developer Guide", href: getPermalink("/docs/developers") },
        { text: "SDK Reference", href: getPermalink("/docs/developers/sdk-reference") },
      ],
    },
    {
      title: "Support",
      links: [
        {
          text: "Report an issue",
          href: "https://github.com/esola-thomas/huitzo/issues/new",
          target: "_blank",
        },
        { text: "Contact", href: "mailto:ernesto@solathomas.com" },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    {
      ariaLabel: "Github",
      icon: "tabler:brand-github",
      href: "https://github.com/esola-thomas/huitzo",
    },
  ],
  footNote: `
    © ${new Date().getFullYear()} Huitzo (By Sola-Thomas Solutions). All rights reserved. Built with Astro & Tailwind CSS
  `,
};
