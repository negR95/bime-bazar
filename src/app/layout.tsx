import type { Metadata } from "next";
import "./globals.css";
import local from "next/font/local";
import { twMerge } from "tailwind-merge";

export const metadata = {
  title: "بیمه بازار | Bimeh Bazar",
} satisfies Metadata;

const vazirmatn = local({
  src: "./fonts/Vazirmatn[wght].woff2",
  preload: true,
});

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="fa" dir="rtl" className="bg-(--bb-bg)">
      <body
        className={twMerge(
          "max-w-[360px] w-full min-h-dvh mx-auto bg-white",
          vazirmatn.className,
        )}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
