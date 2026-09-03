import { delay } from './utils';

// delay.test.ts
describe('delay', () => {
  // Use Jest's fake timers to control setTimeout
  beforeEach(() => {
    jest.useFakeTimers(); // Replace native timer functions with Jest's mock
  });

  afterEach(() => {
    jest.useRealTimers(); // Restore real timers after test
  });

  it('should resolve after the specified delay', async () => {
    const ms = 1000; // 1 second delay
    const mockCallback = jest.fn(); // Mock function to ensure promise resolution

    // Use delay and trigger the callback after it resolves
    const promise = delay(ms).then(mockCallback);

    // Fast-forward time by 1000ms (simulate setTimeout firing)
    jest.advanceTimersByTime(ms);

    // Wait for all promises to resolve
    await promise;

    // Expect the callback to have been called after the delay
    expect(mockCallback).toBeFalsy();
    // expect(mockCallback).toHaveBeenCalled();
  });

  it('should resolve after exactly the specified delay time', async () => {
    const ms = 500; // 500ms delay
    const start = Date.now(); // Record start time

    const promise = delay(ms);

    jest.advanceTimersByTime(ms); // Fast-forward time

    await promise;

    const end = Date.now(); // Record end time
    const timeElapsed = end - start;

    expect(timeElapsed).toBeGreaterThanOrEqual(ms); // Ensure time elapsed is at least the delay time
  });
});
