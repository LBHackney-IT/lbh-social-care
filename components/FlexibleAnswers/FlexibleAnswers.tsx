import { useState } from 'react';
import {
  StepAnswers,
  FlexibleAnswers as FlexibleAnswersT,
  RepeaterGroupAnswer as RepeaterGroupAnswerT,
} from 'data/flexibleForms/forms.types';
import DownArrow from '../Icons/DownArrow';

const RepeaterGroupAnswer = ({
  answers,
}: {
  answers: RepeaterGroupAnswerT;
}): React.ReactElement => (
  <ul className="govuk-list lbh-list">
    {Object.entries(answers).map(([questionName, answer]) => (
      <li key={questionName}>
        <strong>{questionName}:</strong>{' '}
        {Array.isArray(answer) ? answer.join(', ') : answer}
      </li>
    ))}
  </ul>
);

const RepeaterGroupAnswers = ({
  answers,
}: {
  answers: (string | RepeaterGroupAnswerT)[];
}): React.ReactElement => (
  <ul className="govuk-list lbh-list">
    {answers.length > 1 &&
      answers.map((item, i) => (
        <li key={i}>
          {typeof item === 'string' ? (
            item
          ) : (
            <RepeaterGroupAnswer answers={item} />
          )}
        </li>
      ))}
  </ul>
);

const FlexibleAnswersStep = ({
  stepName,
  stepAnswers,
}: {
  stepName: string;
  stepAnswers: StepAnswers;
}): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <section key={stepName} className="lbh-collapsible govuk-!-margin-bottom-8">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="lbh-collapsible__button"
      >
        <h2 className="lbh-heading-h2 lbh-collapsible__heading">{stepName}</h2>
        <DownArrow />
      </button>

      {open && (
        <dl className="govuk-summary-list lbh-summary-list lbh-collapsible__content">
          {Object.entries(stepAnswers).map(([questionName, answerGroup]) => (
            <div className="govuk-summary-list__row" key={questionName}>
              <dt className="govuk-summary-list__key">{questionName}</dt>
              <dd className="govuk-summary-list__value">
                {typeof answerGroup === 'string' ? (
                  answerGroup
                ) : (
                  <RepeaterGroupAnswers answers={answerGroup} />
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
};

interface Props {
  answers: FlexibleAnswersT;
}

const FlexibleAnswers = ({ answers }: Props): React.ReactElement => {
  return (
    <div>
      {Object.entries(answers).map(([stepName, stepAnswers]) => (
        <FlexibleAnswersStep
          key={stepName}
          stepName={stepName}
          stepAnswers={stepAnswers}
        />
      ))}
    </div>
  );
};

export default FlexibleAnswers;