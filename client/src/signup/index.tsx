import '../reset.css';
import { render } from 'react-dom';
import { isAuthenticated } from '../shared/authentication';
import { Signup } from './Signup';

if (isAuthenticated()) {
  window.location.href = '/';
} else {
  render(<Signup />, document.getElementById('root'));
}
