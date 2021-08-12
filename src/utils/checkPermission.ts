import { store } from "@store";

export const checkPermission = (permission: string | undefined | string[]) => {
  if (!permission) return true;
  if (Array.isArray(permission))
    return permission?.some(x =>
      store?.getState()?.auth?.permissions?.includes(x)
    );

  return store?.getState()?.auth?.permissions?.includes(permission!);
};
