export function createCustomMarker(color: string): string {
  const svgMarker = `
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="${color}" stroke="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 4.25 7 13 7 13s7-8.75 7-13c0-3.87-3.13-7-7-7z"></path>
        <circle cx="12" cy="9" r="2.5" fill="white"></circle>
      </svg>
    `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgMarker)}`;
}
