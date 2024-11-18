export function createCustomMarker(color: string): string {
  const svgMarker = `
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
        <!-- Outer pin shape -->
        <path d="M12 2C8 2 5 5 5 9c0 5.5 7 13 7 13s7-7.5 7-13c0-4-3-7-7-7z" fill="${color}" />
        <!-- Inner circle -->
        <circle cx="12" cy="9" r="2.5" fill="#ffffff" />
        <!-- Glossy effect -->
        <path d="M12 3C9 3 6.5 5.5 6.5 9c0 3.3 5.5 9.8 5.5 9.8s5.5-6.5 5.5-9.8c0-3.5-2.5-6-5.5-6z" fill="rgba(255, 255, 255, 0.4)" />
      </svg>
    `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgMarker)}`;
}
