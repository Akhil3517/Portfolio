import "./globals.css";

export const metadata = {
  title: "Akhil Kumar Reddy Ambati | Developer Portfolio",
  description: "Portfolio of Akhil Kumar Reddy Ambati, Final Year Computer Science Engineering Student. Building Web Applications, AI Solutions, and Scalable Digital Products.",
  keywords: ["Akhil Kumar Reddy Ambati", "Software Engineer", "Web Developer", "Next.js Portfolio", "React Three Fiber Portfolio", "Computer Science"],
  authors: [{ name: "Akhil Kumar Reddy Ambati" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#050816" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
