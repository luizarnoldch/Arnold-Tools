import { json } from "better-auth";

export async function POST(request: Request) {
  console.log(request.body);
  return new Response("Hello, Next.js!", {
    status: 200,
  });
}

export async function GET(request: Request) {
  console.log(request.body);

  return new Response("Hello, Next.js!", {
    status: 200,
  });
}
