import '../styles/globals.css'

import { useEffect } from 'react'
import AOS from "aos";

import "aos/dist/aos.css";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas)

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: false,
      offset: 50,
    });
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
