export const routeDisplayNames: { [key: string]: string } = {
  '/': 'Home',
  '/about': 'About Us',
  '/collections': 'Collections',
  '/our-showrooms': 'Our Showrooms',
  // '/events': 'Events',
  '/why-us': 'Why Us',
  '/contact': 'Contact Us',
};

export const getRouteDisplayName = (pathname: string): string => {
  const matchedRoute = Object.keys(routeDisplayNames).find(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  );
  return matchedRoute ? routeDisplayNames[matchedRoute] : 'Page';
};
