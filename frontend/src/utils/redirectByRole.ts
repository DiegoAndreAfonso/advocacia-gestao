export function getRouteByRole(roles: string[]): string {
  const normalized = roles.map((r) => r.toLowerCase());

  if (normalized.includes("admin")) return "/dashboard";
  if (normalized.includes("advogado")) return "/dashboard";
  if (normalized.includes("funcionario")) return "/dashboard";
  if (normalized.includes("cliente")) return "/meu-caso";

  return "/login"; // fallback
}
