import { library, config } from "@fortawesome/fontawesome-svg-core";
import { faBorderAll, faList } from "@fortawesome/free-solid-svg-icons";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "highlight.js/styles/darcula.css";
import "styles/index.scss";

config.autoAddCss = false;
library.add(faList, faBorderAll);

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
