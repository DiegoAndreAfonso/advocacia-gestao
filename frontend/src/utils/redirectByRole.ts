export function getRouteByRole(roles: string[]): string {
  if (roles.includes("admin")) return "/dashboard";
  if (roles.includes("advogado")) return "/dashboard";
  if (roles.includes("funcionario")) return "/dashboard";
  if (roles.includes("cliente")) return "/meu-caso";

  return "/login"; // fallback
}