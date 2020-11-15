export const EMPTY_VALUE = null;

export function getCurrentRoute(): string {
  return window.location.href.replace(window.location.origin, '');
}
