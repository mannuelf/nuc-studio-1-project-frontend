mport { setNavBar } from './components/setNavBar';
import MapBoxService from './services/map';

window.addEventListener('DOMContentLoaded', () => {
  setNavBar();
});

// Init global MapBox map
MapBoxService();
