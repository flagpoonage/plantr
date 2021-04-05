import '../reset.css';
import { render } from 'react-dom';
import { isAuthenticated } from '../shared/authentication';
import { Login } from './Login';

if (isAuthenticated()) {
  window.location.href = '/';
} else {
  render(<Login />, document.getElementById('root'));
}
