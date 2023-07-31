import type { AppProps } from 'next/app';

import '../styles/globals.css';
import '../../public/css/elegant-font-icons.css';
import '../../public/css/elegant-line-icons.css';
import '../../public/css/themify-icons.css';
import '../../public/css/barber-icons.css';
import '../../public/css/bootstrap.min.css';
import '../../public/css/animate.min.css';
import '../../public/css/venobox/venobox.css';
import '../../public/css/nice-select.css';
import '../../public/css/slicknav.min.css';
import '../../public/css/main.css';
import '../../public/css/responsive.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
