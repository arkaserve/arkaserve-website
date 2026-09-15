import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Products from './components/Products'
import About from './components/About'
import CtaBand from './components/CtaBand'
import Footer from './components/Footer'
import NotFound from './pages/NotFound'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Careers from './pages/Careers'

function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Products />
        <About />
        <CtaBand />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
