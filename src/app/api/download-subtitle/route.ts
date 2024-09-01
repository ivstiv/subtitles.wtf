import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const urlParam = req.nextUrl.searchParams.get("url");
  const fileNameParam = req.nextUrl.searchParams.get("fileName");

  if (!urlParam || !fileNameParam) {
    return NextResponse.json(
      { error: "Missing URL or fileName parameter" },
      { status: 400 },
    );
  }

  let url: URL;
  try {
    url = new URL(urlParam);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  if (
    url.hostname !== "www.opensubtitles.com" ||
    !url.pathname.startsWith("/download/")
  ) {
    return NextResponse.json(
      {
        error:
          "Invalid URL: must be from www.opensubtitles.com and start with /download/",
      },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const stream = response.body;
    const headers = new Headers();
    headers.set("Content-Type", "text/plain; charset=utf-8");
    headers.set(
      "Content-Disposition",
      `attachment; filename="${fileNameParam}"`,
    );

    return new NextResponse(stream, {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error("Error fetching subtitle:", error);
    return NextResponse.json(
      { error: "Failed to fetch subtitle" },
      { status: 500 },
    );
  }
}
