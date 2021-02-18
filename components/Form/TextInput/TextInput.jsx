import PropTypes from 'prop-types';
import cx from 'classnames';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

const TextInput = ({
  label,
  hint,
  name,
  register,
  rules,
  error,
  type = 'text',
  inputClassName,
  labelSize = 'm',
  required,
  width,
  ...otherProps
}) => (
  <div
    className={cx('govuk-form-group', {
      'govuk-form-group--error': error,
    })}
  >
    <label className={`govuk-label govuk-label--${labelSize}`} htmlFor={name}>
      {label} {required && <span className="govuk-required">*</span>}
    </label>
    {hint && (
      <span id={`${name}-hint`} className="govuk-hint">
        {hint}
      </span>
    )}
    {error && <ErrorMessage label={error.message} />}
    <input
      className={cx(`govuk-input`, inputClassName, {
        [`govuk-input--width-${width}`]: width,
        'govuk-input--error': error,
      })}
      id={name}
      data-testid={name}
      name={name}
      type={type}
      ref={rules ? register?.(rules) : register}
      aria-describedby={hint && `${name}-hint`}
      {...otherProps}
    />
  </div>
);

TextInput.propTypes = {
  label: PropTypes.string,
  labelSize: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
  hint: PropTypes.string,
  name: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  rules: PropTypes.shape({}),
  inputClassName: PropTypes.string,
  type: PropTypes.string,
  register: PropTypes.func,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  width: PropTypes.string,
};

export default TextInput;
