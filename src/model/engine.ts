import { baseUrl } from '../constants/constants';
import { EngineStatus } from '../types/types';

const basePath = `${baseUrl}/engine/`;

export const startStopEngine = async (id: number, status: EngineStatus) => {
  const url = `${basePath}?id=${id}&status=${status}`;
  let response;
  try {
    response = await fetch(url, { method: 'PATCH' });
    const data = await response.json();
    return data;
  } catch {
    return response?.status;
  }
};

export const switchToDrive = async (id: number) => {
  const url = `${basePath}?id=${id}&status=drive`;
  let response;
  try {
    response = await fetch(url, { method: 'PATCH' });
    return response;
  } catch {
    return response;
  }
};
