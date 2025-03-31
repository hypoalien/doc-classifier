import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function limitTextForTokens(text: string, maxTokens: number) {
  // Approximate token count: ~4 characters per token for English text
  const approximateCharLimit = maxTokens * 4;

  if (text.length <= approximateCharLimit) {
    return text;
  }

  // Keep the first 60% and last 40% of the allowed text length
  const firstPartSize = Math.floor(approximateCharLimit * 0.6);
  const lastPartSize = Math.floor(approximateCharLimit * 0.4);

  const firstPart = text.substring(0, firstPartSize);
  const lastPart = text.substring(text.length - lastPartSize);

  return (
    firstPart + "\n\n[...Document truncated due to length...]\n\n" + lastPart
  );
}
