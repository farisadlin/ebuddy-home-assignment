declare module '@mui/material' {
  import * as React from 'react';
  
  export interface SxProps {
    [key: string]: unknown;
  }
  
  export interface ButtonProps {
    children?: React.ReactNode;
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    disabled?: boolean;
    disableElevation?: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    endIcon?: React.ReactNode;
    fullWidth?: boolean;
    href?: string;
    size?: 'small' | 'medium' | 'large';
    startIcon?: React.ReactNode;
    sx?: SxProps;
    variant?: 'text' | 'outlined' | 'contained';
    type?: 'button' | 'submit' | 'reset';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }
  
  export interface BoxProps {
    children?: React.ReactNode;
    sx?: SxProps;
    display?: string;
    alignItems?: string;
    justifyContent?: string;
    flexDirection?: string;
    width?: string | number;
    height?: string | number;
    minHeight?: string | number;
    bgcolor?: string;
    textAlign?: string;
    mb?: number;
    mt?: number;
    mr?: number;
    ml?: number;
    p?: number;
  }
  
  export interface CardProps {
    children?: React.ReactNode;
    sx?: SxProps;
    variant?: 'outlined' | 'elevation';
    elevation?: number;
  }
  
  export interface CardContentProps {
    children?: React.ReactNode;
    sx?: SxProps;
  }
  
  export interface ContainerProps {
    children?: React.ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
    sx?: SxProps;
  }
  
  export interface TypographyProps {
    children?: React.ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline';
    component?: React.ElementType;
    gutterBottom?: boolean;
    paragraph?: boolean;
    color?: string;
    sx?: SxProps;
  }
  
  export interface CircularProgressProps {
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
    size?: number | string;
    thickness?: number;
    value?: number;
    variant?: 'determinate' | 'indeterminate';
  }
  
  export interface AlertProps {
    children?: React.ReactNode;
    severity?: 'error' | 'warning' | 'info' | 'success';
    sx?: SxProps;
  }
  
  export interface PaperProps {
    children?: React.ReactNode;
    elevation?: number;
    sx?: SxProps;
  }
  
  export interface GridProps {
    children?: React.ReactNode;
    container?: boolean;
    item?: boolean;
    xs?: number | 'auto' | boolean;
    sm?: number | 'auto' | boolean;
    md?: number | 'auto' | boolean;
    lg?: number | 'auto' | boolean;
    xl?: number | 'auto' | boolean;
    spacing?: number;
    sx?: SxProps;
  }
  
  export interface DividerProps {
    sx?: SxProps;
  }
  
  export interface AppBarProps {
    children?: React.ReactNode;
    position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
    color?: 'default' | 'inherit' | 'primary' | 'secondary' | 'transparent';
    sx?: SxProps;
  }
  
  export interface ToolbarProps {
    children?: React.ReactNode;
    sx?: SxProps;
  }
  
  export interface IconButtonProps {
    children?: React.ReactNode;
    color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default';
    disabled?: boolean;
    edge?: 'start' | 'end' | false;
    size?: 'small' | 'medium' | 'large';
    sx?: SxProps;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }
  
  export interface TextFieldProps {
    fullWidth?: boolean;
    label?: string;
    name?: string;
    type?: string;
    value?: unknown;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    margin?: 'none' | 'dense' | 'normal';
    variant?: 'standard' | 'filled' | 'outlined';
    error?: boolean;
    helperText?: React.ReactNode;
    disabled?: boolean;
    sx?: SxProps;
  }
  
  export const Button: React.ComponentType<ButtonProps>;
  export const Box: React.ComponentType<BoxProps>;
  export const Card: React.ComponentType<CardProps>;
  export const CardContent: React.ComponentType<CardContentProps>;
  export const Container: React.ComponentType<ContainerProps>;
  export const Typography: React.ComponentType<TypographyProps>;
  export const CircularProgress: React.ComponentType<CircularProgressProps>;
  export const Alert: React.ComponentType<AlertProps>;
  export const Paper: React.ComponentType<PaperProps>;
  export const Grid: React.ComponentType<GridProps>;
  export const Divider: React.ComponentType<DividerProps>;
  export const AppBar: React.ComponentType<AppBarProps>;
  export const Toolbar: React.ComponentType<ToolbarProps>;
  export const IconButton: React.ComponentType<IconButtonProps>;
  export const TextField: React.ComponentType<TextFieldProps>;
  
  export function useMediaQuery(query: string): boolean;
}

declare module '@mui/material/styles' {
  import * as React from 'react';
  
  export interface ThemeOptions {
    [key: string]: unknown;
  }
  
  export interface Theme {
    breakpoints: {
      down: (key: string) => string;
      up: (key: string) => string;
      between: (start: string, end: string) => string;
    };
    palette: {
      [key: string]: unknown;
    };
    typography: {
      [key: string]: unknown;
    };
    spacing: (factor: number) => number | string;
    [key: string]: unknown;
  }
  
  export interface ThemeProviderProps {
    theme: Theme;
    children: React.ReactNode;
  }
  
  export const ThemeProvider: React.ComponentType<ThemeProviderProps>;
  
  export function createTheme(options?: ThemeOptions): Theme;
}

declare module '@mui/material/CssBaseline' {
  import * as React from 'react';
  
  export interface CssBaselineProps {
    children?: React.ReactNode;
  }
  
  const CssBaseline: React.ComponentType<CssBaselineProps>;
  export default CssBaseline;
}

declare module '@mui/icons-material/Logout' {
  import * as React from 'react';
  
  const LogoutIcon: React.ComponentType<{
    color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
    fontSize?: 'inherit' | 'small' | 'medium' | 'large';
    sx?: {
      [key: string]: unknown;
    };
  }>;
  
  export default LogoutIcon;
}

declare module '@mui/icons-material/Refresh' {
  import * as React from 'react';
  
  const RefreshIcon: React.ComponentType<{
    color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
    fontSize?: 'inherit' | 'small' | 'medium' | 'large';
    sx?: {
      [key: string]: unknown;
    };
  }>;
  
  export default RefreshIcon;
}

declare module '@mui/icons-material/Person' {
  import * as React from 'react';
  
  const PersonIcon: React.ComponentType<{
    color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
    fontSize?: 'inherit' | 'small' | 'medium' | 'large';
    sx?: {
      [key: string]: unknown;
    };
  }>;
  
  export default PersonIcon;
}
