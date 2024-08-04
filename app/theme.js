// app/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif', // Use the Roboto font
    },
    palette: {
        primary: {
            main: '#8B4513', // Darker brown color for buttons
            contrastText: '#FFFFFF', // White text for contrast
        },
        secondary: {
            main: '#000000', // Black color for secondary actions
            contrastText: '#FFFFFF', // White text for contrast
        },
        background: {
            default: '#EADDCA', // Creme brown background color
        },
    },
});

export default theme;


