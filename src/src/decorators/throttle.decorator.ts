import { SetMetadata } from '@nestjs/common';

export const THROTTLE_KEY = 'throttle';

/**
 * Sets throttling metadata for a route or controller.
 *
 * This decorator can be used to limit the number of requests allowed within a given time window.
 * The configured metadata can then be consumed by a throttling guard or interceptor.
 *
 * @param limit Maximum number of allowed requests within the given TTL window.
 * @param ttl Time-to-live for the throttle window, **in seconds** (not milliseconds).
 *
 */
export const Throttle = (limit: number, ttl: number) =>
  SetMetadata(THROTTLE_KEY, { limit, ttl: ttl * 1000 });
