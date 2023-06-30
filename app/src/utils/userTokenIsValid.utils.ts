import { IGlobalUser } from "../contexts/user/user.context";

export function userTokenIsValid(globalUser: IGlobalUser | string): boolean {
    if (typeof globalUser === 'string') {
      return globalUser.trim() !== '';
    };
    return !!globalUser?.token && globalUser.token.trim() !== '';
};