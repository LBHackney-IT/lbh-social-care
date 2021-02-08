import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import AllocatedWorkersTable from 'components/AllocatedWorkers/AllocatedWorkersTable';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import Button from 'components/Button/Button';
import { useAuth } from 'components/UserContext/UserContext';
import { getAllocatedWorkers } from 'utils/api/allocatedWorkers';

const AllocatedWorkers = ({ id }) => {
  const { data: { allocations } = {}, error } = getAllocatedWorkers(id);
  const { asPath } = useRouter();
  const { user } = useAuth();
  if (!allocations) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorMessage />;
  }
  return (
    <div className="govuk-!-margin-top-8 govuk-!-margin-bottom-8">
      {allocations && (
        <AllocatedWorkersTable
          records={allocations}
          hasAllocationsPermissions={user.hasAllocationsPermissions}
        />
      )}
      {user.hasAllocationsPermissions && (
        <div>
          <div className="lbh-table-header">
            <h3 className="govuk-fieldset__legend--m govuk-custom-text-color govuk-!-margin-top-0">
              ALLOCATED WORKER {allocations.length + 1}
            </h3>
            <Button
              label="Allocate worker"
              isSecondary
              route={`${asPath}/allocations/add`}
            />
          </div>
          <hr className="govuk-divider" />
          <p>
            <i>
              {allocations.length === 0 ? 'Currently unallocated' : 'Optional'}
            </i>
          </p>
        </div>
      )}
      {error && <ErrorMessage />}
    </div>
  );
};

AllocatedWorkers.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AllocatedWorkers;
