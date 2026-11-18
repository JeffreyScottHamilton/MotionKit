"use client";

import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/registry/ui/image-comparison";

const svg = (body: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">${body}</svg>`
  )}`;

const dayPanel = svg(
  `<defs><linearGradient id="d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7dd3fc"/><stop offset="1" stop-color="#fde68a"/></linearGradient></defs><rect width="800" height="500" fill="url(#d)"/><circle cx="600" cy="130" r="70" fill="#fbbf24"/><path d="M0 380 L200 260 L380 360 L560 240 L800 380 L800 500 L0 500 Z" fill="#65a30d"/>`
);

const nightPanel = svg(
  `<defs><linearGradient id="n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f172a"/><stop offset="1" stop-color="#312e81"/></linearGradient></defs><rect width="800" height="500" fill="url(#n)"/><circle cx="600" cy="130" r="60" fill="#e2e8f0"/><circle cx="160" cy="90" r="3" fill="#e2e8f0"/><circle cx="330" cy="60" r="2" fill="#e2e8f0"/><circle cx="450" cy="170" r="2" fill="#e2e8f0"/><path d="M0 380 L200 280 L380 370 L560 260 L800 380 L800 500 L0 500 Z" fill="#1e1b4b"/>`
);

export default function Demo(props: Record<string, unknown>) {
  const enableHover = props.enableHover === true;
  return (
    <div className="flex w-full justify-center">
      <ImageComparison
        enableHover={enableHover}
        className="h-64 w-full max-w-lg rounded-md border border-zinc-200 dark:border-zinc-800"
      >
        <ImageComparisonImage position="left" src={dayPanel} alt="Daytime landscape panel" />
        <ImageComparisonImage position="right" src={nightPanel} alt="Night landscape panel" />
        <ImageComparisonSlider className="bg-white">
          <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-300 bg-white shadow" />
        </ImageComparisonSlider>
      </ImageComparison>
    </div>
  );
}
