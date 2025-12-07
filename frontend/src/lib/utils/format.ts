import { formatUnits, parseUnits } from "viem";

/**
 * Format a bigint value to a human-readable string
 */
export function formatTokenAmount(value: bigint, decimals: number = 18): string {
  return formatUnits(value, decimals);
}

/**
 * Parse a string value to bigint
 */
export function parseTokenAmount(value: string, decimals: number = 18): bigint {
  return parseUnits(value, decimals);
}

/**
 * Format USDC (6 decimals)
 */
export function formatUSDC(value: bigint): string {
  return formatUnits(value, 6);
}

/**
 * Parse USDC (6 decimals)
 */
export function parseUSDC(value: string): bigint {
  return parseUnits(value, 6);
}

/**
 * Format price from tick (18 decimals)
 */
export function formatPrice(value: bigint): string {
  return formatUnits(value, 18);
}

/**
 * Format a number with commas
 */
export function formatNumber(num: number | string): string {
  return Number(num).toLocaleString();
}

/**
 * Format currency with symbol
 */
export function formatCurrency(value: bigint, decimals: number = 6, symbol: string = "$"): string {
  const formatted = formatUnits(value, decimals);
  return `${symbol}${Number(formatted).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Truncate address for display
 */
export function truncateAddress(address: string, start: number = 6, end: number = 4): string {
  if (!address) return "";
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

/**
 * Format time remaining
 */
export function formatTimeRemaining(seconds: bigint): string {
  const days = Number(seconds) / 86400;
  const hours = (Number(seconds) % 86400) / 3600;
  const minutes = (Number(seconds) % 3600) / 60;

  if (days >= 1) {
    return `${Math.floor(days)} day${Math.floor(days) !== 1 ? "s" : ""}`;
  }
  if (hours >= 1) {
    return `${Math.floor(hours)} hour${Math.floor(hours) !== 1 ? "s" : ""}`;
  }
  return `${Math.floor(minutes)} minute${Math.floor(minutes) !== 1 ? "s" : ""}`;
}

