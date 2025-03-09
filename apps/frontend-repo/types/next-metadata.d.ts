declare module 'next' {
  export interface Metadata {
    title?: string | { default: string; template?: string; absolute?: string };
    description?: string;
    applicationName?: string;
    authors?: { name: string; url?: string }[];
    generator?: string;
    keywords?: string[];
    referrer?: 'no-referrer' | 'origin' | 'no-referrer-when-downgrade' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';
    themeColor?: string;
    colorScheme?: 'normal' | 'only light' | 'only dark' | 'light dark' | 'dark light';
    viewport?: {
      width?: number | 'device-width';
      height?: number | 'device-height';
      initialScale?: number;
      minimumScale?: number;
      maximumScale?: number;
      userScalable?: boolean;
      viewportFit?: 'auto' | 'cover' | 'contain';
    };
    creator?: string;
    publisher?: string;
    robots?: string | {
      index?: boolean;
      follow?: boolean;
      nocache?: boolean;
      googleBot?: string | {
        index?: boolean;
        follow?: boolean;
        noimageindex?: boolean;
        'max-video-preview'?: number | -1;
        'max-image-preview'?: 'none' | 'standard' | 'large';
        'max-snippet'?: number;
      };
    };
    openGraph?: {
      title?: string;
      description?: string;
      url?: string;
      siteName?: string;
      images?: {
        url: string;
        alt?: string;
        width?: number;
        height?: number;
      }[];
      locale?: string;
      type?: string;
    };
    twitter?: {
      card?: 'summary' | 'summary_large_image' | 'app' | 'player';
      title?: string;
      description?: string;
      creator?: string;
      images?: string[];
    };
    verification?: {
      google?: string | string[];
      yandex?: string | string[];
      yahoo?: string | string[];
      other?: { [key: string]: string | string[] };
    };
    appleWebApp?: {
      capable?: boolean;
      title?: string;
      statusBarStyle?: 'default' | 'black' | 'black-translucent';
    };
    formatDetection?: {
      telephone?: boolean;
      date?: boolean;
      address?: boolean;
      email?: boolean;
      url?: boolean;
    };
    itunes?: {
      appId: string;
      appArgument?: string;
    };
    alternates?: {
      canonical?: string;
      languages?: { [locale: string]: string };
      media?: { [media: string]: string };
      types?: { [type: string]: string };
    };
    icons?: {
      icon?: string | string[] | { url: string; sizes?: string; type?: string }[];
      shortcut?: string | { url: string; sizes?: string; type?: string }[];
      apple?: string | { url: string; sizes?: string; type?: string }[];
      other?: { rel: string; url: string; sizes?: string; type?: string }[];
    };
    manifest?: string;
    archives?: string[];
    assets?: string[];
    bookmarks?: string[];
    category?: string;
    classification?: string;
  }
}
