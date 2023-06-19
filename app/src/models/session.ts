import { ROUTE_PATHS } from "../constants/routesPaths/routePaths";

export type Session = {
    isAuthenticated?: boolean;
    redirectPath: string;
};

export const initialSession: Session = {
    redirectPath:ROUTE_PATHS.LOGIN
};