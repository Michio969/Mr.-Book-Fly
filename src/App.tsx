import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout/Layout"
import { Home } from "./pages/Home"
import { HotelBooking } from "./pages/HotelBooking"
import { FlightReservation } from "./pages/FlightReservation"
import { EventBooking } from "./pages/EventBooking"
import { InvitationLetter } from "./pages/InvitationLetter"
import HealthInsurance from "./pages/HealthInsurance"
import SlotBooking from "./pages/SlotBooking"
import ValuableDeals from "./pages/ValuableDeals"
import { VisaSupport } from "./pages/VisaSupport"
import { Pricing } from "./pages/Pricing"
import { AboutUs } from "./pages/AboutUs"
import { Contact } from "./pages/Contact"
import { Dashboard } from "./pages/Dashboard"
import { TermsOfService } from "./pages/TermsOfService"
import { PrivacyPolicy } from "./pages/PrivacyPolicy"
import { RefundPolicy } from "./pages/RefundPolicy"
import OrderForm from "./pages/OrderForm"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="hotel-booking" element={<HotelBooking />} />
          <Route path="flight-reservation" element={<FlightReservation />} />
          <Route path="event-booking" element={<EventBooking />} />
          <Route path="invitation-letter" element={<InvitationLetter />} />
          <Route path="/health-insurance" element={<HealthInsurance />} />
          <Route path="/slot-booking" element={<SlotBooking />} />
          <Route path="/valuable-deals" element={<ValuableDeals />} />
          <Route path="order-form" element={<OrderForm />} />
          <Route path="visa-support" element={<VisaSupport />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="refund" element={<RefundPolicy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
