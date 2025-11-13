export const ROLES = Object.freeze({
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  EMPLOYEE: "EMPLOYEE",
});

//Option role rank
export const ROLE_RANK = { EMPLOYEE: 1, MANAGER: 2, ADMIN: 3 };
export const hasAtLeastRole = (userRole, require) => {
  ROLE_RANK[userRole] >= ROLE_RANK[require];
};
