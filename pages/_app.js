import '../styles/globals.css'

import { useEffect } from 'react'
import AOS from "aos";

import "aos/dist/aos.css";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas)

import {Provider} from 'react-redux';
import withRedux from "next-redux-wrapper";
import store from '../store'

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/actions';

function MyApp({ Component, pageProps }) {

  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: false,
      offset: 50,
      disable: 'mobile'
    });

    // if (typeof localStorage !== 'undefined' && localStorage.getItem('unisec-mic-name')) {
    //   dispatch(setUser({
    //     uid : localStorage.getItem('unisec-mic-uid'),
    //     name : localStorage.getItem('unisec-mic-name')
    //   }));
    // }
    
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
