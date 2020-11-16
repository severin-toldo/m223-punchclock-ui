import {User} from "../../model/user.model";

export const EMPTY_VALUE = null;

export function getCurrentRoute(): string {
  return window.location.href.replace(window.location.origin, '');
}

export function isBlankOrEmpty(s: string): boolean {
  return s && s.trim().length === 0;
}

export function formatUser(user: User): string {
  return user ? user.firstName + ', ' + user.lastName : '-';
}
