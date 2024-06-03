export const metadata = {
  title: "The Mixology Nook",
  description: "Welcome to The Mixology Nook, your destination for all things home bar! Cheers to creating unforgettable moments, one drink at a time!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
