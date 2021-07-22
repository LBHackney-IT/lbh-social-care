import Link from 'next/link';
import { Case } from 'types';
import forms from 'data/flexibleForms';
import { getLink as generateLegacyUrl } from 'components/Cases/CaseLink';
import s from './index.module.scss';

interface Props {
  event: Case;
}

const EventLink = ({ event }: Props): React.ReactElement => {
  // 1. handle flexible forms
  const flexibleForm = event.formName
    ? forms?.find((form) => form.id === event.formName)
    : false;

  if (flexibleForm)
    return (
      <Link href={`/people/${event.personId}/submissions/${event.recordId}`}>
        <a className={`lbh-link ${s.eventLink}`}>{flexibleForm.name}</a>
      </Link>
    );

  // 2. handle external/google forms
  if (event.caseFormUrl)
    return (
      <a
        href={event.caseFormUrl}
        target="_blank"
        rel="noreferrer noopener"
        className={`lbh-link ${s.eventLink}`}
      >
        {event.formName}
      </a>
    );

  // 3. handle legacy forms
  const legacyUrl = generateLegacyUrl(event.recordId, event.caseFormData);
  if (legacyUrl)
    return (
      <Link href={legacyUrl}>
        <a className={`lbh-link ${s.eventLink}`}>{event.formName}</a>
      </Link>
    );

  // 4. handle anything else
  return <>{event.formName || 'Unknown event'}</>;
};

export default EventLink;
