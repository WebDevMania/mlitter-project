"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/sidebar/Sidebar'
import Rightbar from '@/components/rightbar/Rightbar'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/redux/store'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <SessionProvider>
              <div className="container">
                <div className="wrapper">
                  <Sidebar />
                  {children}
                  <Rightbar />
                </div>
              </div>
            </SessionProvider>
          </PersistGate>
        </Provider>
      </body>
    </html >
  )
}
