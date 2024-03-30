import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import '../styles/globals.css';
import '../../public/css/elegant-font-icons.css';
import '../../public/css/elegant-line-icons.css';
import '../../public/css/themify-icons.css';
import '../../public/css/barber-icons.css';
import '../../public/css/bootstrap.min.css';
import '../../public/css/main.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-calendar/dist/Calendar.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const theme = createTheme({
  palette: {
    primary: {
      main: '#9f6e0dd4',
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <ToastContainer />
    </ThemeProvider>
  );
}
