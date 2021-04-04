import '../reset.css';
import { render } from 'react-dom';
import { Main } from './Main';
import { isAuthenticated } from '../shared/authentication';

if (!isAuthenticated()) {
  window.location.href = '/login';
} else {
  render(<Main />, document.getElementById('root'));
}
