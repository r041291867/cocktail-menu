export const metadata = {
  title: "Take A Sip",
  description: "Welcome to Take A Sip! Click here to checkout the menu!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
