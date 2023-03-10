import data from '@/assets/data.json';

type Nav = typeof data.nav;
const createLinks = (navP: Nav) => {
  const nav: Nav = JSON.parse(JSON.stringify(navP));
  nav.forEach((navGroup) => {
    navGroup.links.forEach((navLink) => {
      navLink.groups?.forEach((navLinkGroup) => {
        navLinkGroup.url = navLink.url + navLinkGroup.url;
        navLinkGroup.links?.forEach((navLinkGroupLink) => {
          navLinkGroupLink.url = navLinkGroup.url + navLinkGroupLink.url;
        });
      });
    });
  });
  return nav;
};

export const appData = () => {
  if (data.isChanged) return data;

  data.nav = createLinks(data.nav);

  data.isChanged = true;
  return data;
};
