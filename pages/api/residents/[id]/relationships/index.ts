import { StatusCodes } from 'http-status-codes';

import { getRelationshipByResident } from 'lib/relationships';
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
    case 'GET':
      try {
        const data = await getRelationshipByResident(
          Number(req.query.id as string)
        );
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error('Relationships get error:', error?.response?.data);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: 'Unable to get the relationships' });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default endpoint;
