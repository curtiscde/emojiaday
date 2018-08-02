import createHistory from 'history/createBrowserHistory'
import ReactGA from 'react-ga';

const history = createHistory();

history.listen((location, action) => {
  ReactGA.pageview(location.pathname + location.search);
});

export default history;