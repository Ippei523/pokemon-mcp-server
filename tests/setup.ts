

import { jest, beforeEach, afterEach } from '@jest/globals';

jest.setTimeout(30000);

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.resetAllMocks();
});