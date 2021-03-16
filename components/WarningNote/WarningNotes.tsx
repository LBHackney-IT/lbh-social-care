import cx from 'classnames';
import Link from 'next/link';

import { useWarningNotes } from 'utils/api/warningNotes';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { WarningNote } from 'types';

import styles from './WarningNotes.module.scss';

export interface Props {
  personId: number;
  notes: WarningNote[];
}

export const WarningBox = ({ notes, personId }: Props): React.ReactElement => {
  return (
    <div
      className={cx('govuk-error-summary', styles.container)}
      aria-labelledby="warning-note-title"
      role="alert"
      tabIndex={-1}
    >
      <h2 className="govuk-error-summary__title" id="warning-note-title">
        WARNING NOTE
      </h2>
      <div>
        <div className="govuk-error-summary__body">
          {notes.map((note) => (
            <div key={note.id} className={styles.note}>
              <dl className={styles.noteDetails}>
                {note.type && (
                  <>
                    <dt>Type</dt>
                    <dd>{note.type}</dd>
                  </>
                )}
                {note.createdDate && (
                  <>
                    <dt>Start Date</dt>
                    <dd>
                      {new Date(note.createdDate).toLocaleDateString('en-GB')}{' '}
                      <i>created by</i> {note.createdBy}
                    </dd>
                  </>
                )}
                {note.reviewedDate && (
                  <>
                    <dt>Review Date</dt>
                    <dd>
                      {new Date(note.reviewedDate).toLocaleDateString('en-GB')}{' '}
                      <i>last reviewed by</i> {note.reviewedBy}
                    </dd>
                  </>
                )}
              </dl>
              <Link href={`/people/${personId}/warning-notes/${note.id}`}>
                <a className="govuk-link govuk-link-underline">Review / end</a>
              </Link>
            </div>
          ))}
          <p>For further information see Warning Note in Records History</p>
        </div>
      </div>
    </div>
  );
};

const WarningNotes = ({ id }: { id: number }): React.ReactElement | null => {
  const { data: warningNotes, error } = useWarningNotes(id);
  if (error) {
    return <ErrorMessage />;
  }
  if (!warningNotes || warningNotes.length === 0) {
    return null;
  }
  return <WarningBox notes={warningNotes} personId={id} />;
};

export default WarningNotes;
