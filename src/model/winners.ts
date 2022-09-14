import { STATUS, baseUrl } from '../constants/constants';
import {
  GetWinners, GetWinner, CreateWinner, DeleteWinner, UpdateWinner,
} from '../types/types';

const basePath = `${baseUrl}/winners/`;

export const getWinners: GetWinners = async (page, limit, sort, order) => {
  const url = `${basePath}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
  let response;
  try {
    response = await fetch(url);
  } catch {
    return null;
  }
  const data = await response.json();
  const count = (response.headers.get('X-Total-Count'))?.toString();
  return { data, count };
};

export const getWinner: GetWinner = async (id) => {
  const url = `${basePath}${id}`;
  let response;
  try {
    response = await fetch(url);
    const data = await response.json();
    if (response?.status === STATUS.notFound) {
      return null;
    }
    return data;
  } catch {
    return response?.status;
  }
};

export const createWinner: CreateWinner = async (winnerData) => {
  const url = basePath;
  const method = 'POST';
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify(winnerData);

  let response;
  try {
    response = await fetch(url, { method, headers, body });
    const data = await response.json();
    return { data };
  } catch {
    return response?.status;
  }
};

export const deleteWinner: DeleteWinner = async (id) => {
  const url = `${basePath}${id}`;

  let response;
  try {
    response = await fetch(url, { method: 'DELETE' });
    const { status } = response;
    return status;
  } catch {
    return response?.status;
  }
};

export const updateWinner: UpdateWinner = async (id, winnerData) => {
  const url = `${basePath}${id}`;
  const method = 'PUT';
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify(winnerData);
  let response;
  try {
    response = await fetch(url, { method, headers, body });
  } catch {
    return response?.status;
  }
  const data = response.json();
  return { data };
};
