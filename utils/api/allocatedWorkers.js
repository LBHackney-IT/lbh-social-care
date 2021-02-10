import useSWR from 'swr';
import axios from 'axios';

export const getAllocatedWorkers = (id) =>
  useSWR(`/api/residents/${id}/allocated-workers`);

export const getTeams = () => useSWR(`/api/teams`);

export const getTeamWorkers = (teamId) =>
  useSWR(teamId ? `/api/teams/${teamId}/workers` : null);

export const getAllocationsByWorker = (workerId) =>
  useSWR(`/api/workers/${workerId}/allocations`);

export const deleteAllocatedWorker = async (residentId, body) => {
  const { data } = await axios.patch(
    `/api/residents/${residentId}/allocated-workers`,
    body
  );
  return data;
};

export const addAllocatedWorker = async (residentId, body) => {
  const { data } = await axios.post(
    `/api/residents/${residentId}/allocated-workers`,
    body
  );
  return data;
};
