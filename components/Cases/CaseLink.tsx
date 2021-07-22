import Link from 'next/link';
import forms from 'data/flexibleForms';
import * as form from 'data/forms';
import {
  AllocationCaseFormData,
  CaseFormData,
  DeallocationCaseFormData,
  WarningNoteCaseFormData,
} from 'types';

const getWarningNoteDetailsPageName = (form_name: string) => {
  switch (form_name) {
    case 'Warning Note Created':
      return 'note-created';
    case 'Warning Note Reviewed':
      return 'note-reviews';
    case 'Warning Note Ended':
      return 'note-end';
    default:
      return null;
  }
};

export const getLink = (
  recordId: string,
  { form_name_overall, ...caseFormData }: CaseFormData
): string | null => {
  const fileName = (form as Record<string, unknown>)[form_name_overall]
    ? form_name_overall
    : null;

  switch (form_name_overall) {
    case 'API_Allocation':
    case 'API_Deallocation':
      return `/people/${caseFormData.mosaic_id}/allocations/${
        (caseFormData as AllocationCaseFormData | DeallocationCaseFormData)
          .allocation_id
      }?recordId=${recordId}`;
    case fileName:
      return `/people/${caseFormData.mosaic_id}/records/${recordId}`;
    case 'Historical_Case_Note':
      return `/people/${caseFormData.mosaic_id}/records/${recordId}?is_historical=${caseFormData.is_historical}`;
    case 'Historical_Visit':
      return `/people/${caseFormData.mosaic_id}/visits/${recordId}?is_historical=${caseFormData.is_historical}`;
    case 'API_WarningNote':
      return `/people/${caseFormData.mosaic_id}/warning-notes/${
        (caseFormData as WarningNoteCaseFormData).warning_note_id
      }/view/${getWarningNoteDetailsPageName(caseFormData.form_name)}`;
    default:
      return null;
  }
};

interface Props {
  recordId: string;
  externalUrl?: string;
  caseFormData: CaseFormData;
  formName: string;
  personId: number;
  children?: React.ReactChild;
}

const CaseLink = ({
  formName,
  externalUrl,
  caseFormData,
  recordId,
  personId,
  children,
}: Props): React.ReactElement => {
  const form = formName ? forms?.find((form) => form.id === formName) : false;

  if (form)
    return (
      <Link href={`/people/${personId}/submissions/${recordId}`}>
        <a className="lbh-link">{form?.name || 'View'}</a>
      </Link>
    );

  if (externalUrl) {
    return (
      <a
        href={externalUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="lbh-link"
      >
        View
      </a>
    );
  }
  const internalLink = getLink(recordId, caseFormData);
  return internalLink ? (
    <Link href={internalLink}>
      <a className="lbh-link">{children || 'View'}</a>
    </Link>
  ) : (
    <>{formName}</>
  );
};

export default CaseLink;
