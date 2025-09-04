// src/utils/slugify.ts

/**
 * Converts a string into an SEO-friendly URL slug.
 * @param text The string to convert.
 * @returns A lowercase, hyphen-separated slug.
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '')    // Remove all non-word characters
    .replace(/--+/g, '-');      // Replace multiple hyphens with a single hyphen
};

/**
 * Converts a slug back into a human-readable string.
 * @param slug The slug to convert.
 * @returns A title-cased, space-separated string.
 */
export const unslugify = (slug: string): string => {
  return slug
    .split('-')                 // Split the string by hyphens
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' ');                 // Join the words with spaces
};