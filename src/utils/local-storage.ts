export const getAccessToken = (): string | null => {
  try {
    const stored = localStorage.getItem("user-storage");
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed?.state?.token ?? null;
  } catch {
    return null;
  }
};
