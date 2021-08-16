import { store } from "@store";

export const checkPermission = (permission: string | undefined | string[]) => {
  const permissions = store?.getState()?.auth?.permissions;
  if (permissions?.includes("all")) return true;
  if (!permission) return true;
  if (Array.isArray(permission))
    return permission?.some(x => permissions?.includes(x));

  return permissions?.includes(permission!);
};
