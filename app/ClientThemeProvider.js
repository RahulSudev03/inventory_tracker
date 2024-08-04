// app/ClientThemeProvider.js
'use client'; // Ensure this component runs on the client side

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import your theme configuration

export default function ClientThemeProvider({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

