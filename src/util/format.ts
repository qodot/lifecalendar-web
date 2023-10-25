export function formatDateKorean(date: string): string {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatNumberComma(value: number): string {
  return value.toLocaleString("en-US");
}
