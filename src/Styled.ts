import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    colors: {
      main: string;
      secondary: string;
    };
    fonts: string[];
    fontSizes: {
      extraSmall: string;
      small: string;
      medium: string;
      large: string;
      extraLarge: string;
    };
  }
}
