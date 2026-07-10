export function normalizePermissions(user) {
  const source = user?.roles || user?.permissions || user?.permissionsList || [];

  if (Array.isArray(source)) {
    return source.map((item) => String(item).trim().toLowerCase());
  }

  if (typeof source === "string") {
    return [source.trim().toLowerCase()];
  }

  return [];
}

export function hasPermission(user, permission) {
  if (!permission) return true;

  const permissions = normalizePermissions(user);
  if (!permissions.length) return false;

  const normalizedPermission = String(permission).trim().toLowerCase();

  return permissions.includes(normalizedPermission) || permissions.includes("all") || permissions.includes("*");
}

export function hasAnyPermission(user, permissions = []) {
  if (!Array.isArray(permissions) || permissions.length === 0) return true;

  return permissions.some((permission) => hasPermission(user, permission));
}
