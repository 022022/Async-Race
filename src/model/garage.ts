import { NewCar } from '../types/types';
import { baseUrl } from '../constants/constants';

const basePath = `${baseUrl}/garage/`;

export const getCars = async (limit: number, page: number) => {
  const url = `${basePath}?_limit=${limit}&_page=${page}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const count = (response.headers.get('X-Total-Count'))?.toString();
    return { data, count };
  } catch {
    return null;
  }
};

export const getCar = async (id: number) => {
  const url = `${basePath}${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch {
    return null;
  }
};

export const createCar = async (carData: NewCar) => {
  const url = basePath;
  const method = 'POST';
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify(carData);
  try {
    const response = await fetch(url, { method, headers, body });
    const data = await response.json();
    return { data };
  } catch {
    return null;
  }
};

export const deleteCar = async (id: number) => {
  const url = `${basePath}${id}`;
  try {
    const response = await fetch(url, { method: 'DELETE' });
    const { status } = response;
    return status;
  } catch {
    return null;
  }
};

export const updateCar = async (id: number, carData: NewCar) => {
  const url = `${basePath}${id}`;
  const method = 'PUT';
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify(carData);
  try {
    const response = await fetch(url, { method, headers, body });
    const data = response.json();
    return { data };
  } catch {
    return null;
  }
};
