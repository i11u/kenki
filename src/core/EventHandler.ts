import { err, ok, Result } from 'neverthrow'

export interface Event {
  name: string
}

function isPositive(n: number): Result<number, Error> {
  if (n >= 0) {
    return ok(n)
  }
  return err(new Error('number is negative'))
}

export interface EventListener {
  (event: Event): void
}

class EventHandler {
  private events: Event[] = []
}
