export function orderByObj(sort?: string): Record<string, "asc" | "desc"> {
  if (!sort) return { id: "asc" };

  const [field, direction] = sort.split("/");

  if (!field || (direction !== "asc" && direction !== "desc")) {
    return { id: "asc" };
  }

  return { [field]: direction };
}
