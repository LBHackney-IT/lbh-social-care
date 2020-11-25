import PropTypes from 'prop-types';
import cx from 'classnames';

import { TextInput } from '..';

const EmailInput = (props) => (
  <div className={cx('govuk-form-group')}>
    <TextInput {...props} type="email"></TextInput>
  </div>
);

EmailInput.propTypes = {
  label: PropTypes.string,
  labelSize: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
  hint: PropTypes.string,
  name: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  inputClassName: PropTypes.string,
  type: PropTypes.string,
  register: PropTypes.func,
  required: PropTypes.bool,
  width: PropTypes.string,
};

export default EmailInput;
