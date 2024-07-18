import { Cookies, useCookies } from "react-cookie";

const [setCookie, cookies, removecookie] = useCookies(["work"]);

// const cookies = new Cookies();

export const Cookie = (name: string, value: string, options?: any) => {};
