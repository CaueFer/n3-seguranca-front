"use server";
import { JWTPayload, jwtVerify } from "jose";
import { type NextRequest, NextResponse } from "next/server";

const rawSecret = process.env.NEXT_PUBLIC_JWT_SECRET;
if (!rawSecret) {
  throw new Error("Variável NEXT_PUBLIC_JWT_SECRET não definida.");
}

const secret = new TextEncoder().encode(rawSecret);

async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const payload = await verifyToken(token);
  if (!payload) {
    const res = NextResponse.redirect(new URL("/login", request.url));
    res.cookies.delete("token");
    return res;
  }

  // TOKEN VALIDADO
  request.headers.set("x-user-id", String(payload.sub ?? ""));
  return NextResponse.next();
}

export const config = {
  // ROTAS EXCLUIDAS DO MIDDLEWARE
  matcher: ["/((?!_next|favicon.ico|images|assets|login|signup).*)"],
};
