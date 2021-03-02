import { useCallback, forwardRef } from 'react';
import cx from 'classnames';
import { Controller, Control } from 'react-hook-form';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import {
  convertFormat,
  isDateValid,
  stringDateToObject,
  objectDateToString,
} from 'utils/date';

import { DateInput as IDateInput } from 'components/Form/types';

interface InputProps extends Omit<IDateInput, 'control'> {
  value?: string;
  onChange: (arg0: string | null) => void;
}

interface Props extends IDateInput {
  control: Control;
}

// eslint-disable-next-line react/display-name
const DateInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      labelSize = 'm',
      error,
      hint,
      value,
      name,
      onChange,
      required,
      format,
      ...otherProps
    }: InputProps,
    ref
  ) => {
    const date = stringDateToObject(value, format);
    const setNewDate = useCallback(
      (newDate) =>
        onChange?.(objectDateToString({ ...date, ...newDate }, format)),
      [date, format, onChange]
    );
    return (
      <div
        className={cx('govuk-form-group', {
          'govuk-form-group--error': error,
        })}
      >
        <fieldset
          className="govuk-fieldset"
          role="group"
          aria-describedby={`${name}-hint`}
        >
          <legend
            className={`govuk-fieldset__legend govuk-fieldset__legend--${labelSize}`}
          >
            {label} {required && <span className="govuk-required">*</span>}
          </legend>
          <span id={`${name}-hint`} className="govuk-hint">
            {hint}
          </span>
          {error && <ErrorMessage label={error.message} />}
          <div className="govuk-date-input" id={name}>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label
                  className="govuk-label govuk-date-input__label"
                  htmlFor={`${name}-day`}
                >
                  Day
                </label>
                <input
                  className={cx(
                    'govuk-input govuk-date-input__input govuk-input--width-2',
                    {
                      'govuk-input--error': error,
                    }
                  )}
                  id={`${name}-day`}
                  name={`${name}-day`}
                  pattern="^\d{2}$"
                  inputMode="numeric"
                  defaultValue={date.day}
                  onChange={({ target: { value } }) =>
                    setNewDate({ day: value })
                  }
                  ref={ref}
                  {...otherProps}
                />
              </div>
            </div>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label
                  className="govuk-label govuk-date-input__label"
                  htmlFor={`${name}-month`}
                >
                  Month
                </label>
                <input
                  className={cx(
                    'govuk-input govuk-date-input__input govuk-input--width-2',
                    {
                      'govuk-input--error': error,
                    }
                  )}
                  id={`${name}-month`}
                  name={`${name}-month`}
                  pattern="^\d{2}$"
                  inputMode="numeric"
                  defaultValue={date.month}
                  onChange={({ target: { value } }) =>
                    setNewDate({ month: value })
                  }
                  {...otherProps}
                />
              </div>
            </div>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label
                  className="govuk-label govuk-date-input__label"
                  htmlFor={`${name}-year`}
                >
                  Year
                </label>
                <input
                  className={cx(
                    'govuk-input govuk-date-input__input govuk-input--width-4',
                    {
                      'govuk-input--error': error,
                    }
                  )}
                  id={`${name}-year`}
                  name={`${name}-year`}
                  pattern="^\d{4}$"
                  inputMode="numeric"
                  defaultValue={date.year}
                  onChange={({ target: { value } }) =>
                    setNewDate({ year: value })
                  }
                  {...otherProps}
                />
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    );
  }
);

const ControlledDateInput = ({
  control,
  name,
  rules,
  format = 'US',
  ...otherProps
}: Props): React.ReactElement => (
  <Controller
    render={({ onChange, value }) => (
      <DateInput
        name={name}
        value={value}
        onChange={onChange}
        format={format}
        {...otherProps}
      />
    )}
    name={name}
    rules={{
      ...rules,
      validate: {
        valid: (value) =>
          value &&
          (isDateValid(format === 'US' ? value : convertFormat(value)) ||
            'Must be a valid Date'),
        ...rules?.validate,
      },
    }}
    control={control}
    defaultValue={null}
  />
);

export default ControlledDateInput;