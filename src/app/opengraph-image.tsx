import { ImageResponse } from "next/server";

export const runtime = "edge";

export const alt = "evnt.sh";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const interSemiBold = fetch(
  new URL("../fonts/Inter-SemiBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        <div tw="text-7xl mb-6">evnt.sh</div>
        <div tw="text-3xl text-gray-600 mb-4">
          Streamline the process of tracking and displaying updates, enabling
          collaboration and project management.
        </div>
        <div tw="text-xl text-gray-500 italic">Powered by Event Sourcing.</div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await interSemiBold,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
