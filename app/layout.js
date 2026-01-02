import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata = {
  title: 'DemoTech',
  description: 'A Next.js portfolio website showcasing my projects and skills',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const html = document.documentElement;
                const theme = localStorage.getItem('theme') || 'light';
                
                // Always set localStorage to ensure it exists
                localStorage.setItem('theme', theme);
                
                // Forcefully apply the theme
                if (theme === 'dark') {
                  html.classList.add('dark');
                } else {
                  html.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-black text-black dark:text-white">
        <Navbar />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  )
}
