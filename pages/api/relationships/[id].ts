import { StatusCodes } from 'http-status-codes';

import { removeRelationship } from 'lib/relationships';
import { isAuthorised } from 'utils/auth';

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
    case 'DELETE':
      try {
        await removeRelationship(req.query.id as string);
        res.status(StatusCodes.OK).end();
      } catch (error) {
        console.error('Relationship get error:', error?.response?.data);
        error?.response?.status === StatusCodes.NOT_FOUND
          ? res.status(StatusCodes.NOT_FOUND).json({
              message: `Relationship not found with ID: ${req.query.id}.`,
            })
          : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              message: `Unable to remove the relationship with ID: ${req.query.id}.`,
            });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default endpoint;
