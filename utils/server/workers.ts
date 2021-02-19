import axios from 'axios';

const { ENDPOINT_API, AWS_KEY } = process.env;

const headersWithKey = {
  'x-api-key': AWS_KEY,
};

export const getWorkers = async (
  params?: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.get(`${ENDPOINT_API}/workers`, {
    headers: headersWithKey,
    params,
  });
  return data;
};

export const getWorker = async (
  id: number,
  params?: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.get(`${ENDPOINT_API}/workers`, {
    headers: headersWithKey,
    params: { id, ...params },
  });
  return data;
};