export const safeParse = <T>(data: string | null): T | null => {
  try {
    return data ? (JSON.parse(data) as T) : null;
  } catch {
    return null;
  }
};