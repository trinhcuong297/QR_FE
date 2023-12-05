import { Provider } from 'react-redux';
import { FooterWithLogo } from '@/components/footer';
import { StickyNavbar } from '@/components/navbar';
import { ThemeProvider } from "@material-tailwind/react";
import '@/styles/globals.css'
import store from '@/redux/store';
import 'react-quill/dist/quill.snow.css'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        {/* <StickyNavbar /> */}
        <Component {...pageProps} />
        {/* <FooterWithLogo /> */}
      </ThemeProvider>
    </Provider>
  );
}