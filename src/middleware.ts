export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/content", "/content/:path*"],
};
