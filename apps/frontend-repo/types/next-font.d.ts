declare module 'next/font/local' {
  interface FontOptions {
    src: string | Array<{ path: string; weight?: string; style?: string }>;
    weight?: string | string[];
    style?: string | string[];
    variable?: string;
    display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
    preload?: boolean;
    fallback?: string[];
    adjustFontFallback?: boolean | string;
  }

  type FontLoader = (options: FontOptions) => {
    className: string;
    style: { fontFamily: string };
    variable: string;
  };

  const localFont: FontLoader;
  export default localFont;
}
