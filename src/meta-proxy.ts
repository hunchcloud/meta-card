const PROXY = (<any>window).META_PROXY || "https://meta-proxy.herokuapp.com";

export const fetchMeta = async (url: string) =>
  await (await fetch(`${PROXY}/${url}`)).json();
