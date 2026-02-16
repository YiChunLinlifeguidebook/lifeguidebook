import { createHealthResponse } from './utils/response.js';

export async function onRequest(context) {
  return createHealthResponse();
}
