declare module 'next' {
  export interface NextConfig {
    reactStrictMode?: boolean;
    experimental?: {
      [key: string]: unknown;
    };
    webpack?: (config: Record<string, unknown>, options: Record<string, unknown>) => Record<string, unknown>;
    env?: {
      [key: string]: string;
    };
    images?: {
      domains?: string[];
      deviceSizes?: number[];
      imageSizes?: number[];
      path?: string;
      loader?: 'default' | 'imgix' | 'cloudinary' | 'akamai' | 'custom';
    };
    rewrites?: () => Promise<Record<string, unknown>[]> | Record<string, unknown>[];
    redirects?: () => Promise<Record<string, unknown>[]> | Record<string, unknown>[];
    headers?: () => Promise<Record<string, unknown>[]> | Record<string, unknown>[];
    [key: string]: unknown;
  }
}

declare module 'next/app' {
  import { AppProps } from 'next/app';
  import { NextPage } from 'next/types';
  import { ReactElement, ReactNode } from 'react';

  export type NextPageWithLayout<P = Record<string, unknown>> = NextPage<P> & {
    getLayout?: (page: ReactElement) => ReactNode;
  };

  export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
  };
}

declare module 'next/types' {
  import { ReactElement } from 'react';

  export type NextPage<P = Record<string, unknown>> = {
    (props: P): ReactElement;
    defaultProps?: Partial<P>;
    displayName?: string;
  };
}

declare module 'next/navigation' {
  export interface NavigateOptions {
    scroll?: boolean;
  }

  export interface AppRouterInstance {
    back(): void;
    forward(): void;
    refresh(): void;
    push(href: string, options?: NavigateOptions): void;
    replace(href: string, options?: NavigateOptions): void;
    prefetch(href: string): void;
  }

  export function useRouter(): AppRouterInstance;
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
}

declare module 'next/image' {
  import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

  export interface ImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
    objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    objectPosition?: string;
    loader?: (resolverProps: ImageLoaderProps) => string;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    unoptimized?: boolean;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
    quality?: number;
    sizes?: string;
  }

  export interface ImageLoaderProps {
    src: string;
    width: number;
    quality?: number;
  }

  const Image: React.FC<ImageProps>;
  export default Image;
}
