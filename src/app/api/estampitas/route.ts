import fs from "fs/promises";

export async function GET() {
  return fs.readFile("public/data.json", "utf-8").then((data) => {
    return Response.json(JSON.parse(data));
  });
}
