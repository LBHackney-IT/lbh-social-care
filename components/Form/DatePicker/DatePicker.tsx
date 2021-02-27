import { TextInput } from '..';

import type { TextInputNoType as Props } from 'components/Form/types';

const DateInput = (props: Props): React.ReactElement => (
  <TextInput {...props} type="date" />
);

export default DateInput;
