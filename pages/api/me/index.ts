import { StatusCodes } from 'http-status-codes';

import { isAuthorised } from 'utils/auth';
import { getWorkerByEmail } from 'lib/workers';
import { getAllocationsByWorker } from 'lib/allocatedWorkers';

import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

const endpoint: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const user = isAuthorised(req);
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
  if (!user.isAuthorised) {
    return res.status(StatusCodes.FORBIDDEN).end();
  }
  switch (req.method) {
    case 'GET':
      try {
        const workerData = await getWorkerByEmail(user.email, {
          context_flag: user.permissionFlag,
        });
        if (!workerData) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: 'User Not Found' });
        }
        const allocations = await getAllocationsByWorker(workerData.id, {
          context_flag: user.permissionFlag,
        });
        res
          .status(StatusCodes.OK)
          .json({ ...workerData, ...allocations, auth: user });
      } catch (error) {
        console.log('User get error:', error?.response?.data);
        error?.response?.status === StatusCodes.NOT_FOUND
          ? res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'User Not Found' })
          : res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to get the User' });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
      console.log(res.status);
  }
};

export default endpoint;
