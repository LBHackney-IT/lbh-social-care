import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import Button from 'components/Button/Button';
import { EmailInput } from 'components/Form';
import WorkerRecap from 'components/WorkerView/WorkerRecap';
import AllocatedCases from 'components/AllocatedCases/AllocatedCases';
import Spinner from 'components/Spinner/Spinner';
import { useWorker } from 'utils/api/workers';

interface FormValues {
  email: string;
}

const WorkerSearch = (): React.ReactElement | null => {
  const [params, setParams] = useState<FormValues>();
  const { data, error } = useWorker(params);
  const { register, handleSubmit, errors } = useForm();

  return (
    <div>
      <form
        role="form"
        onSubmit={handleSubmit((formData: FormValues) => setParams(formData))}
      >
        <div
          className="govuk-grid-row"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <div className="govuk-grid-column-one-half">
            <EmailInput
              error={errors.email}
              name="email"
              hint="Email address must contain @hackney.gov.uk"
              label="Worker's email address:"
              labelSize="s"
              placeholder="Email"
              rules={{ required: 'Enter a valid worker email' }}
              register={register}
            />
          </div>
          <div className="govuk-grid-column-one-half">
            <Button label={'Search'} type="submit" className="govuk-button" />
          </div>
        </div>
      </form>
      {params && !data && !error && <Spinner />}
      {error?.response?.status == 404 && (
        <>
          <h3>Worker&apos;s email address not found</h3>
          <p className="govuk-body govuk-!-margin-top-5">
            The email address is not in the system.
          </p>
          <p className="govuk-body govuk-!-margin-top-5">
            You can search again on a different email address
          </p>
          <p className="govuk-body govuk-!-margin-top-5">
            Please be sure the email address is correct before you use it to{' '}
            <Link href={'/workers/add'}>
              <a className="govuk-link">create a new worker in the system</a>
            </Link>
          </p>
        </>
      )}
      {data && data[0] && (
        <>
          <WorkerRecap {...data[0]} />
          <h2 className="gov-weight-lighter">Current Allocations</h2>
          <AllocatedCases id={data?.[0].id} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Link href="/">
                <a className="lbh-link">Cancel</a>
              </Link>
            </div>
            <Button
              wideButton
              className="govuk-!-margin-left-1"
              label="Update worker's details"
              route={`/workers/${data[0].id}/edit`}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default WorkerSearch;
