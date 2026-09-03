import { NextResponse } from 'next/server';

export async function middleware() {
  // const token = request.cookies.get(COOKIE_ACCESS_TOKEN_KEY)?.value;
  // const cookiesStore = await cookies();

  // if (!token) return NextResponse.redirect(new URL('/login', request.url));

  // const verified = await JWTHelper.verify(token!);

  // if (!verified) {
  //   cookiesStore.delete(COOKIE_ACCESS_TOKEN_KEY);
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // // Skip Next.js internals and all static files, unless found in search params
    // '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // // Always run for API routes
    // '/(api|trpc)(.*)',
    // '/!login|!signup',
    // '/dashboard/:path*',
  ],
};
