import React, { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plane, Calendar as CalendarIcon, Users, CheckCircle2, ShieldCheck, Heart, MessageCircle } from "lucide-react"
import { motion } from "motion/react"
import { toast } from "sonner"

const WHATSAPP_NUMBER = "447877679344"

const generateOrderId = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let id = "FL-"
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)]
  return id
}

const AIRPORTS = [
  "Indira Gandhi International Airport (DEL) - New Delhi, India",
  "Chhatrapati Shivaji Maharaj International Airport (BOM) - Mumbai, India",
  "Kempegowda International Airport (BLR) - Bangalore, India",
  "Chennai International Airport (MAA) - Chennai, India",
  "Netaji Subhas Chandra Bose International Airport (CCU) - Kolkata, India",
  "Rajiv Gandhi International Airport (HYD) - Hyderabad, India",
  "Cochin International Airport (COK) - Kochi, India",
  "Dabolim Airport (GOI) - Goa, India",
  "Amritsar Airport (ATQ) - Amritsar, India",
  "Jaipur Airport (JAI) - Jaipur, India",
  "Lucknow Airport (LKO) - Lucknow, India",
  "Varanasi Airport (VNS) - Varanasi, India",
  "Srinagar Airport (SXR) - Srinagar, India",
  "Nagpur Airport (NAG) - Nagpur, India",
  "Coimbatore Airport (CJB) - Coimbatore, India",
  "Thiruvananthapuram Airport (TRV) - Thiruvananthapuram, India",
  "Bhopal Airport (BHO) - Bhopal, India",
  "Indore Airport (IDR) - Indore, India",
  "Patna Airport (PAT) - Patna, India",
  "Guwahati Airport (GAU) - Guwahati, India",
  "Bhubaneswar Airport (BBI) - Bhubaneswar, India",
  "Raipur Airport (RPR) - Raipur, India",
  "Vishakhapatnam Airport (VTZ) - Vishakhapatnam, India",
  "Mangalore Airport (IXE) - Mangalore, India",
  "Calicut Airport (CCJ) - Kozhikode, India",
  "Jodhpur Airport (JDH) - Jodhpur, India",
  "Udaipur Airport (UDR) - Udaipur, India",
  "Agra Airport (AGR) - Agra, India",
  "Gaggal Airport (DHM) - Dharamsala, India",
  "Chandigarh Airport (IXC) - Chandigarh, India",
  "Heathrow Airport (LHR) - London, United Kingdom",
  "Gatwick Airport (LGW) - London, United Kingdom",
  "Stansted Airport (STN) - London, UK",
  "Luton Airport (LTN) - London, UK",
  "Manchester Airport (MAN) - Manchester, United Kingdom",
  "Birmingham Airport (BHX) - Birmingham, UK",
  "Edinburgh Airport (EDI) - Edinburgh, UK",
  "Glasgow Airport (GLA) - Glasgow, UK",
  "Bristol Airport (BRS) - Bristol, UK",
  "East Midlands Airport (EMA) - Nottingham, UK",
  "Liverpool Airport (LPL) - Liverpool, UK",
  "Leeds Bradford Airport (LBA) - Leeds, UK",
  "Newcastle Airport (NCL) - Newcastle, UK",
  "Charles de Gaulle Airport (CDG) - Paris, France",
  "Orly Airport (ORY) - Paris, France",
  "Paris Beauvais Airport (BVA) - Paris, France",
  "Nice Cote d'Azur Airport (NCE) - Nice, France",
  "Lyon-Saint Exupery Airport (LYS) - Lyon, France",
  "Marseille Airport (MRS) - Marseille, France",
  "Toulouse-Blagnac Airport (TLS) - Toulouse, France",
  "Frankfurt Airport (FRA) - Frankfurt, Germany",
  "Munich Airport (MUC) - Munich, Germany",
  "Berlin Brandenburg Airport (BER) - Berlin, Germany",
  "Cologne Bonn Airport (CGN) - Cologne, Germany",
  "Hamburg Airport (HAM) - Hamburg, Germany",
  "Dusseldorf Airport (DUS) - Dusseldorf, Germany",
  "Stuttgart Airport (STR) - Stuttgart, Germany",
  "Nuremberg Airport (NUE) - Nuremberg, Germany",
  "Amsterdam Airport Schiphol (AMS) - Amsterdam, Netherlands",
  "Dubai International Airport (DXB) - Dubai, UAE",
  "Abu Dhabi International Airport (AUH) - Abu Dhabi, UAE",
  "Sharjah International Airport (SHJ) - Sharjah, UAE",
  "John F. Kennedy International Airport (JFK) - New York, USA",
  "Los Angeles International Airport (LAX) - Los Angeles, USA",
  "O'Hare International Airport (ORD) - Chicago, USA",
  "Hartsfield-Jackson Atlanta International Airport (ATL) - Atlanta, USA",
  "Dallas/Fort Worth International Airport (DFW) - Dallas, USA",
  "San Francisco International Airport (SFO) - San Francisco, USA",
  "Miami International Airport (MIA) - Miami, USA",
  "Denver International Airport (DEN) - Denver, USA",
  "Phoenix Sky Harbor Airport (PHX) - Phoenix, USA",
  "Minneapolis-St. Paul Airport (MSP) - Minneapolis, USA",
  "Detroit Metropolitan Airport (DTW) - Detroit, USA",
  "Baltimore/Washington Airport (BWI) - Baltimore, USA",
  "Washington Dulles Airport (IAD) - Washington DC, USA",
  "Ronald Reagan Washington Airport (DCA) - Washington DC, USA",
  "Charlotte Douglas Airport (CLT) - Charlotte, USA",
  "Portland International Airport (PDX) - Portland, USA",
  "Salt Lake City Airport (SLC) - Salt Lake City, USA",
  "New Orleans Airport (MSY) - New Orleans, USA",
  "Tampa International Airport (TPA) - Tampa, USA",
  "Orlando International Airport (MCO) - Orlando, USA",
  "Pittsburgh International Airport (PIT) - Pittsburgh, USA",
  "Kansas City Airport (MCI) - Kansas City, USA",
  "Indianapolis Airport (IND) - Indianapolis, USA",
  "Austin-Bergstrom Airport (AUS) - Austin, USA",
  "San Diego International Airport (SAN) - San Diego, USA",
  "Sacramento Airport (SMF) - Sacramento, USA",
  "Raleigh-Durham Airport (RDU) - Raleigh, USA",
  "Cleveland Hopkins Airport (CLE) - Cleveland, USA",
  "Nashville Airport (BNA) - Nashville, USA",
  "Memphis International Airport (MEM) - Memphis, USA",
  "Toronto Pearson International Airport (YYZ) - Toronto, Canada",
  "Vancouver International Airport (YVR) - Vancouver, Canada",
  "Montreal-Trudeau International Airport (YUL) - Montreal, Canada",
  "Ottawa MacDonald-Cartier Airport (YOW) - Ottawa, Canada",
  "Edmonton International Airport (YEG) - Edmonton, Canada",
  "Winnipeg James Richardson Airport (YWG) - Winnipeg, Canada",
  "Halifax Stanfield Airport (YHZ) - Halifax, Canada",
  "Sydney Airport (SYD) - Sydney, Australia",
  "Melbourne Airport (MEL) - Melbourne, Australia",
  "Brisbane Airport (BNE) - Brisbane, Australia",
  "Adelaide Airport (ADL) - Adelaide, Australia",
  "Perth Airport (PER) - Perth, Australia",
  "Cairns Airport (CNS) - Cairns, Australia",
  "Gold Coast Airport (OOL) - Gold Coast, Australia",
  "Auckland Airport (AKL) - Auckland, New Zealand",
  "Wellington Airport (WLG) - Wellington, New Zealand",
  "Christchurch Airport (CHC) - Christchurch, New Zealand",
  "Queenstown Airport (ZQN) - Queenstown, New Zealand",
  "Singapore Changi Airport (SIN) - Singapore",
  "Hong Kong International Airport (HKG) - Hong Kong",
  "Beijing Capital International Airport (PEK) - Beijing, China",
  "Shanghai Pudong International Airport (PVG) - Shanghai, China",
  "Guangzhou Baiyun Airport (CAN) - Guangzhou, China",
  "Shenzhen Bao'an Airport (SZX) - Shenzhen, China",
  "Chengdu Shuangliu Airport (CTU) - Chengdu, China",
  "Chongqing Jiangbei Airport (CKG) - Chongqing, China",
  "Kunming Changshui Airport (KMG) - Kunming, China",
  "Xian Xianyang Airport (XIY) - Xian, China",
  "Macau International Airport (MFM) - Macau",
  "Incheon International Airport (ICN) - Seoul, South Korea",
  "Busan Gimhae Airport (PUS) - Busan, South Korea",
  "Jeju International Airport (CJU) - Jeju, South Korea",
  "Narita International Airport (NRT) - Tokyo, Japan",
  "Haneda Airport (HND) - Tokyo, Japan",
  "Osaka Kansai International Airport (KIX) - Osaka, Japan",
  "Nagoya Chubu Centrair Airport (NGO) - Nagoya, Japan",
  "Sapporo New Chitose Airport (CTS) - Sapporo, Japan",
  "Fukuoka Airport (FUK) - Fukuoka, Japan",
  "Okinawa Naha Airport (OKA) - Okinawa, Japan",
  "Taipei Taoyuan International Airport (TPE) - Taipei, Taiwan",
  "Kuala Lumpur International Airport (KUL) - Kuala Lumpur, Malaysia",
  "Suvarnabhumi Airport (BKK) - Bangkok, Thailand",
  "Phuket International Airport (HKT) - Phuket, Thailand",
  "Chiang Mai International Airport (CNX) - Chiang Mai, Thailand",
  "Koh Samui Airport (USM) - Koh Samui, Thailand",
  "Ninoy Aquino International Airport (MNL) - Manila, Philippines",
  "Mactan-Cebu International Airport (CEB) - Cebu, Philippines",
  "Bali Ngurah Rai Airport (DPS) - Bali, Indonesia",
  "Jakarta Soekarno-Hatta Airport (CGK) - Jakarta, Indonesia",
  "Surabaya Juanda Airport (SUB) - Surabaya, Indonesia",
  "Noi Bai International Airport (HAN) - Hanoi, Vietnam",
  "Da Nang International Airport (DAD) - Da Nang, Vietnam",
  "Tan Son Nhat Airport (SGN) - Ho Chi Minh City, Vietnam",
  "Phnom Penh Airport (PNH) - Phnom Penh, Cambodia",
  "Siem Reap Airport (REP) - Siem Reap, Cambodia",
  "Yangon International Airport (RGN) - Yangon, Myanmar",
  "Vientiane Wattay Airport (VTE) - Vientiane, Laos",
  "Islamabad International Airport (ISB) - Islamabad, Pakistan",
  "Jinnah International Airport (KHI) - Karachi, Pakistan",
  "Lahore Allama Iqbal Airport (LHE) - Lahore, Pakistan",
  "Multan International Airport (MUX) - Multan, Pakistan",
  "Faisalabad Airport (LYP) - Faisalabad, Pakistan",
  "Sialkot Airport (SKT) - Sialkot, Pakistan",
  "Peshawar Airport (PEW) - Peshawar, Pakistan",
  "Hazrat Shahjalal International Airport (DAC) - Dhaka, Bangladesh",
  "Cox's Bazar Airport (CXB) - Cox's Bazar, Bangladesh",
  "Sylhet Osmani Airport (ZYL) - Sylhet, Bangladesh",
  "Tribhuvan International Airport (KTM) - Kathmandu, Nepal",
  "Pokhara Airport (PKR) - Pokhara, Nepal",
  "Bandaranaike International Airport (CMB) - Colombo, Sri Lanka",
  "Male Velana Airport (MLE) - Male, Maldives",
  "Paro Airport (PBH) - Paro, Bhutan",
  "Kabul International Airport (KBL) - Kabul, Afghanistan",
  "Cairo International Airport (CAI) - Cairo, Egypt",
  "OR Tambo International Airport (JNB) - Johannesburg, South Africa",
  "Cape Town International Airport (CPT) - Cape Town, South Africa",
  "Durban King Shaka Airport (DUR) - Durban, South Africa",
  "Jomo Kenyatta International Airport (NBO) - Nairobi, Kenya",
  "Kilimanjaro International Airport (JRO) - Kilimanjaro, Tanzania",
  "Dar es Salaam Julius Nyerere Airport (DAR) - Dar es Salaam, Tanzania",
  "Entebbe International Airport (EBB) - Entebbe, Uganda",
  "Kigali International Airport (KGL) - Kigali, Rwanda",
  "Addis Ababa Bole Airport (ADD) - Addis Ababa, Ethiopia",
  "Lagos Murtala Muhammed Airport (LOS) - Lagos, Nigeria",
  "Abuja Nnamdi Azikiwe Airport (ABV) - Abuja, Nigeria",
  "Accra Kotoka Airport (ACC) - Accra, Ghana",
  "Dakar Leopold Sedar Senghor Airport (DKR) - Dakar, Senegal",
  "Casablanca Mohammed V Airport (CMN) - Casablanca, Morocco",
  "Marrakech Menara Airport (RAK) - Marrakech, Morocco",
  "Tunis Carthage Airport (TUN) - Tunis, Tunisia",
  "Algiers Houari Boumediene Airport (ALG) - Algiers, Algeria",
  "Luanda Quatro de Fevereiro Airport (LAD) - Luanda, Angola",
  "Lusaka Kenneth Kaunda Airport (LUN) - Lusaka, Zambia",
  "Harare Robert Gabriel Mugabe Airport (HRE) - Harare, Zimbabwe",
  "Maputo International Airport (MPM) - Maputo, Mozambique",
  "Antananarivo Ivato Airport (TNR) - Antananarivo, Madagascar",
  "Mauritius Sir Seewoosagur Ramgoolam Airport (MRU) - Mauritius",
  "Seychelles International Airport (SEZ) - Mahe, Seychelles",
  "Windhoek Hosea Kutako Airport (WDH) - Windhoek, Namibia",
  "Gaborone Sir Seretse Khama Airport (GBE) - Gaborone, Botswana",
  "Lilongwe Kamuzu Airport (LLW) - Lilongwe, Malawi",
  "Djibouti Ambouli Airport (JIB) - Djibouti City, Djibouti",
  "Asmara International Airport (ASM) - Asmara, Eritrea",
  "Khartoum International Airport (KRT) - Khartoum, Sudan",
  "Kinshasa N'Djili Airport (FIH) - Kinshasa, DR Congo",
  "Douala International Airport (DLA) - Douala, Cameroon",
  "Yaounde Nsimalen Airport (NSI) - Yaounde, Cameroon",
  "Libreville Leon M'ba Airport (LBV) - Libreville, Gabon",
  "Bamako Modibo Keita Airport (BKO) - Bamako, Mali",
  "Conakry Gbessia Airport (CKY) - Conakry, Guinea",
  "N'Djamena Hassan Djamous Airport (NDJ) - N'Djamena, Chad",
  "Rome Fiumicino Airport (FCO) - Rome, Italy",
  "Milan Malpensa Airport (MXP) - Milan, Italy",
  "Venice Marco Polo Airport (VCE) - Venice, Italy",
  "Madrid Barajas Airport (MAD) - Madrid, Spain",
  "Barcelona El Prat Airport (BCN) - Barcelona, Spain",
  "Malaga Airport (AGP) - Malaga, Spain",
  "Lisbon Humberto Delgado Airport (LIS) - Lisbon, Portugal",
  "Porto Airport (OPO) - Porto, Portugal",
  "Faro Airport (FAO) - Faro, Portugal",
  "Zurich Airport (ZRH) - Zurich, Switzerland",
  "Geneva Airport (GVA) - Geneva, Switzerland",
  "Basel-Mulhouse Airport (BSL) - Basel, Switzerland",
  "Vienna International Airport (VIE) - Vienna, Austria",
  "Salzburg Airport (SZG) - Salzburg, Austria",
  "Brussels Airport (BRU) - Brussels, Belgium",
  "Copenhagen Airport (CPH) - Copenhagen, Denmark",
  "Oslo Gardermoen Airport (OSL) - Oslo, Norway",
  "Stockholm Arlanda Airport (ARN) - Stockholm, Sweden",
  "Helsinki-Vantaa Airport (HEL) - Helsinki, Finland",
  "Reykjavik Keflavik Airport (KEF) - Reykjavik, Iceland",
  "Warsaw Chopin Airport (WAW) - Warsaw, Poland",
  "Krakow John Paul II Airport (KRK) - Krakow, Poland",
  "Prague Vaclav Havel Airport (PRG) - Prague, Czech Republic",
  "Budapest Ferenc Liszt Airport (BUD) - Budapest, Hungary",
  "Bucharest Henri Coanda Airport (OTP) - Bucharest, Romania",
  "Sofia Airport (SOF) - Sofia, Bulgaria",
  "Zagreb Airport (ZAG) - Zagreb, Croatia",
  "Dubrovnik Airport (DBV) - Dubrovnik, Croatia",
  "Split Airport (SPU) - Split, Croatia",
  "Belgrade Nikola Tesla Airport (BEG) - Belgrade, Serbia",
  "Sarajevo International Airport (SJJ) - Sarajevo, Bosnia",
  "Skopje Alexander the Great Airport (SKP) - Skopje, North Macedonia",
  "Tirana International Airport (TIA) - Tirana, Albania",
  "Valletta International Airport (MLA) - Malta",
  "Larnaca International Airport (LCA) - Larnaca, Cyprus",
  "Riga International Airport (RIX) - Riga, Latvia",
  "Tallinn Airport (TLL) - Tallinn, Estonia",
  "Vilnius Airport (VNO) - Vilnius, Lithuania",
  "Luxembourg Airport (LUX) - Luxembourg",
  "Bratislava Airport (BTS) - Bratislava, Slovakia",
  "Ljubljana Airport (LJU) - Ljubljana, Slovenia",
  "Istanbul Airport (IST) - Istanbul, Turkey",
  "Istanbul Sabiha Gokcen Airport (SAW) - Istanbul, Turkey",
  "Ankara Esenboga Airport (ESB) - Ankara, Turkey",
  "Antalya Airport (AYT) - Antalya, Turkey",
  "Izmir Adnan Menderes Airport (ADB) - Izmir, Turkey",
  "Hamad International Airport (DOH) - Doha, Qatar",
  "King Abdulaziz International Airport (JED) - Jeddah, Saudi Arabia",
  "King Khalid International Airport (RUH) - Riyadh, Saudi Arabia",
  "Kuwait International Airport (KWI) - Kuwait City, Kuwait",
  "Bahrain International Airport (BAH) - Manama, Bahrain",
  "Muscat International Airport (MCT) - Muscat, Oman",
  "Amman Queen Alia Airport (AMM) - Amman, Jordan",
  "Beirut Rafic Hariri Airport (BEY) - Beirut, Lebanon",
  "Baghdad International Airport (BGW) - Baghdad, Iraq",
  "Tehran Imam Khomeini Airport (IKA) - Tehran, Iran",
  "Tbilisi International Airport (TBS) - Tbilisi, Georgia",
  "Yerevan Zvartnots Airport (EVN) - Yerevan, Armenia",
  "Baku Heydar Aliyev Airport (GYD) - Baku, Azerbaijan",
  "Tashkent International Airport (TAS) - Tashkent, Uzbekistan",
  "Almaty International Airport (ALA) - Almaty, Kazakhstan",
  "Astana International Airport (TSE) - Astana, Kazakhstan",
  "Bishkek Manas International Airport (FRU) - Bishkek, Kyrgyzstan",
  "Dushanbe Airport (DYU) - Dushanbe, Tajikistan",
  "Ashgabat International Airport (ASB) - Ashgabat, Turkmenistan",
  "Moscow Sheremetyevo International Airport (SVO) - Moscow, Russia",
  "St. Petersburg Pulkovo Airport (LED) - St. Petersburg, Russia",
  "Kyiv Boryspil Airport (KBP) - Kyiv, Ukraine",
  "Minsk National Airport (MSQ) - Minsk, Belarus",
  "São Paulo-Guarulhos International Airport (GRU) - São Paulo, Brazil",
  "Rio de Janeiro Galeao Airport (GIG) - Rio de Janeiro, Brazil",
  "Brasilia Airport (BSB) - Brasilia, Brazil",
  "Buenos Aires Ministro Pistarini Airport (EZE) - Buenos Aires, Argentina",
  "Lima Jorge Chavez Airport (LIM) - Lima, Peru",
  "Bogota El Dorado Airport (BOG) - Bogota, Colombia",
  "Santiago Arturo Merino Benitez Airport (SCL) - Santiago, Chile",
  "Quito Mariscal Sucre Airport (UIO) - Quito, Ecuador",
  "Caracas Simon Bolivar Airport (CCS) - Caracas, Venezuela",
  "Montevideo Carrasco Airport (MVD) - Montevideo, Uruguay",
  "Mexico City Benito Juarez Airport (MEX) - Mexico City, Mexico",
  "Cancun International Airport (CUN) - Cancun, Mexico",
  "Panama City Tocumen Airport (PTY) - Panama City, Panama",
  "Bogota El Dorado Airport (BOG) - Bogota, Colombia",
  "Nadi International Airport (NAN) - Nadi, Fiji",
  "Athens International Airport (ATH) - Athens, Greece",
  "Ulaanbaatar Chinggis Khaan Airport (ULN) - Ulaanbaatar, Mongolia",
  "Havana Jose Marti Airport (HAV) - Havana, Cuba",
  "Nassau Lynden Pindling Airport (NAS) - Nassau, Bahamas",
  "Barbados Grantley Adams Airport (BGI) - Bridgetown, Barbados",
  "Trinidad Piarco Airport (POS) - Port of Spain, Trinidad",
  "Auckland Airport (AKL) - Auckland, New Zealand",
  "Port Moresby Airport (POM) - Port Moresby, Papua New Guinea",
  "Abidjan Felix-Houphouet-Boigny Airport (ABJ) - Abidjan, Cote d'Ivoire",
  "Brazzaville Maya-Maya Airport (BZV) - Brazzaville, Congo",
  "Freetown Lungi Airport (FNA) - Freetown, Sierra Leone",
  "Ouagadougou Airport (OUA) - Ouagadougou, Burkina Faso",
]

const VALIDITY_PLANS = [
  { label: "24–36 Hours", price_usd: 3, price_inr: 299 },
  { label: "96 Hours (4 Days)", price_usd: 9, price_inr: 999 },
  { label: "7 Days", price_usd: 14, price_inr: 1299 },
  { label: "1 Month", price_usd: 20, price_inr: 1599 },
]

const INSURANCE_RATE_USD = 4
const INSURANCE_RATE_INR = 499

export function FlightReservation() {
  const [tripType, setTripType] = useState("round-trip")
  const [step, setStep] = useState(1) // 1=form, 2=whatsapp confirm
  const [orderId, setOrderId] = useState("")
  const [selectedValidity, setSelectedValidity] = useState(0)
  const [addInsurance, setAddInsurance] = useState(false)
  const [insuranceDays, setInsuranceDays] = useState(1)
  const [fromSearch, setFromSearch] = useState("")
  const [toSearch, setToSearch] = useState("")
  const [showFromList, setShowFromList] = useState(false)
  const [showToList, setShowToList] = useState(false)
  const [formData, setFormData] = useState({
    from: "", to: "", departure: "", return: "",
    firstName: "", lastName: "", email: "", phone: "",
    passport: "", dob: "", gender: "", nationality: "",
  })

  const filteredFrom = useMemo(() => AIRPORTS.filter(a => a.toLowerCase().includes(fromSearch.toLowerCase())).slice(0, 8), [fromSearch])
  const filteredTo = useMemo(() => AIRPORTS.filter(a => a.toLowerCase().includes(toSearch.toLowerCase())).slice(0, 8), [toSearch])

  const validityPlan = VALIDITY_PLANS[selectedValidity]
  const insuranceCostUSD = addInsurance ? insuranceDays * INSURANCE_RATE_USD : 0
  const insuranceCostINR = addInsurance ? insuranceDays * INSURANCE_RATE_INR : 0
  const totalUSD = validityPlan.price_usd + insuranceCostUSD
  const totalINR = validityPlan.price_inr + insuranceCostINR

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.from || !formData.to || !formData.departure || !formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all required fields.")
      return
    }
    if (tripType === "round-trip" && !formData.return) {
      toast.error("Please provide a return date for round-trip.")
      return
    }
    setOrderId(generateOrderId())
    setStep(2)
  }

  const handleWhatsAppRedirect = () => {
    const msg = encodeURIComponent(
      `Hello! I'd like to book a flight reservation for my visa.\n\n` +
      `Order ID: ${orderId}\n` +
      `Trip Type: ${tripType === "round-trip" ? "Round Trip" : "One Way"}\n` +
      `From: ${formData.from}\n` +
      `To: ${formData.to}\n` +
      `Departure: ${formData.departure}\n` +
      `Return: ${formData.return || "N/A"}\n` +
      `Validity: ${validityPlan.label}\n` +
      `Insurance: ${addInsurance ? `${insuranceDays} day(s) (+$${insuranceCostUSD} / +₹${insuranceCostINR})` : "No"}\n` +
      `Total: $${totalUSD} / ₹${totalINR}\n` +
      `Name: ${formData.firstName} ${formData.lastName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Passport: ${formData.passport || "N/A"}\n` +
      `DOB: ${formData.dob || "N/A"}\n` +
      `Gender: ${formData.gender || "N/A"}\n` +
      `Nationality: ${formData.nationality || "N/A"}`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Flight Reservation for Visa</h1>
          <p className="text-lg text-slate-600 max-w-2xl">Get a verifiable flight itinerary with a valid PNR. Perfect for Schengen, UK, US, and Canada visa applications.</p>
        </div>

        {/* Info Note */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-800">
            <strong>How it works:</strong> Fill in your flight details below, then you'll be redirected to WhatsApp where our team will confirm your booking and send payment instructions. Flight reservation (PNR-verified) delivered within <strong>30 minutes to 2 hours</strong> of payment confirmation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-white border-b border-slate-100 pb-6">
                <CardTitle className="text-2xl flex items-center">
                  <Plane className="w-6 h-6 mr-2 text-blue-600" />
                  Flight Details
                </CardTitle>
                <CardDescription>Enter your travel information exactly as on your passport.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {step === 1 ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Tabs defaultValue="round-trip" onValueChange={setTripType}>
                      <TabsList className="grid w-full grid-cols-2 max-w-md">
                        <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
                        <TabsTrigger value="one-way">One Way</TabsTrigger>
                      </TabsList>
                    </Tabs>

                    {/* Airport From */}
                    <div className="space-y-2 relative">
                      <Label htmlFor="from">Flying From</Label>
                      <Input
                        id="from"
                        placeholder="Search airport or city..."
                        value={fromSearch || formData.from}
                        onChange={e => { setFromSearch(e.target.value); setFormData(p => ({ ...p, from: e.target.value })); setShowFromList(true) }}
                        onFocus={() => setShowFromList(true)}
                        autoComplete="off"
                      />
                      {showFromList && fromSearch && filteredFrom.length > 0 && (
                        <div className="absolute z-20 bg-white border border-slate-200 rounded-md shadow-lg w-full max-h-52 overflow-y-auto">
                          {filteredFrom.map((a, i) => (
                            <div key={i} className="px-3 py-2 text-sm cursor-pointer hover:bg-blue-50" onClick={() => { setFormData(p => ({ ...p, from: a })); setFromSearch(a); setShowFromList(false) }}>{a}</div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Airport To */}
                    <div className="space-y-2 relative">
                      <Label htmlFor="to">Flying To</Label>
                      <Input
                        id="to"
                        placeholder="Search airport or city..."
                        value={toSearch || formData.to}
                        onChange={e => { setToSearch(e.target.value); setFormData(p => ({ ...p, to: e.target.value })); setShowToList(true) }}
                        onFocus={() => setShowToList(true)}
                        autoComplete="off"
                      />
                      {showToList && toSearch && filteredTo.length > 0 && (
                        <div className="absolute z-20 bg-white border border-slate-200 rounded-md shadow-lg w-full max-h-52 overflow-y-auto">
                          {filteredTo.map((a, i) => (
                            <div key={i} className="px-3 py-2 text-sm cursor-pointer hover:bg-blue-50" onClick={() => { setFormData(p => ({ ...p, to: a })); setToSearch(a); setShowToList(false) }}>{a}</div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="departure">Departure Date</Label>
                        <div className="relative">
                          <Input id="departure" type="date" className="pl-10" value={formData.departure} onChange={handleInputChange} required />
                          <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                        </div>
                      </div>
                      {tripType === "round-trip" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                          <Label htmlFor="return">Return Date</Label>
                          <div className="relative">
                            <Input id="return" type="date" className="pl-10" value={formData.return} onChange={handleInputChange} />
                            <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Validity Plan */}
                    <div className="space-y-3 border-t border-slate-100 pt-4">
                      <Label className="text-base font-semibold">Select Ticket Validity</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {VALIDITY_PLANS.map((plan, i) => (
                          <div key={i} onClick={() => setSelectedValidity(i)} className={`cursor-pointer rounded-lg border-2 p-3 text-center transition-all ${selectedValidity === i ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300"}`}>
                            <div className="text-xs font-semibold text-slate-700">{plan.label}</div>
                            <div className="text-blue-700 font-bold mt-1">${plan.price_usd}</div>
                            <div className="text-xs text-slate-500">₹{plan.price_inr}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Health Insurance */}
                    <div className="space-y-3 border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" id="insurance" checked={addInsurance} onChange={e => setAddInsurance(e.target.checked)} className="w-4 h-4 accent-blue-600" />
                        <Label htmlFor="insurance" className="cursor-pointer flex items-center gap-2 text-base font-semibold">
                          <Heart className="w-4 h-4 text-red-500" /> Add Health Insurance
                          <span className="text-xs text-slate-500 font-normal">(₹{INSURANCE_RATE_INR} / ${INSURANCE_RATE_USD} per day)</span>
                        </Label>
                      </div>
                      {addInsurance && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 pl-7">
                          <Label className="text-sm">Number of days:</Label>
                          <Input type="number" min={1} max={365} value={insuranceDays} onChange={e => setInsuranceDays(Math.max(1, parseInt(e.target.value) || 1))} className="w-24 text-center" />
                          <span className="text-sm font-semibold text-blue-700">= ${insuranceCostUSD} / ₹{insuranceCostINR}</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Passenger Details */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <h3 className="font-semibold text-slate-900 flex items-center">
                        <Users className="w-5 h-5 mr-2 text-blue-600" /> Passenger Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="As per passport" value={formData.firstName} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="As per passport" value={formData.lastName} onChange={handleInputChange} required />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">WhatsApp Number</Label>
                          <Input id="phone" type="tel" placeholder="+91 9999999999" value={formData.phone} onChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="passport">Passport Number</Label>
                          <Input id="passport" placeholder="e.g. A1234567" value={formData.passport} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input id="dob" type="date" value={formData.dob} onChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <select
                            id="gender"
                            value={formData.gender}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData(p => ({ ...p, gender: e.target.value }))}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nationality">Nationality</Label>
                          <Input id="nationality" placeholder="e.g. Indian, British" value={formData.nationality} onChange={handleInputChange} />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg font-bold">
                      <MessageCircle className="w-5 h-5 mr-2" /> Continue to WhatsApp Booking
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-6 text-center">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <h3 className="text-xl font-bold text-slate-900 mb-1">Details Confirmed!</h3>
                      <p className="text-slate-600 mb-2">
                        Your flight from <strong>{formData.from.split(" - ")[1] || formData.from}</strong> to <strong>{formData.to.split(" - ")[1] || formData.to}</strong> is ready.
                      </p>
                      <p className="text-2xl font-bold text-blue-700">${totalUSD} <span className="text-slate-400 text-lg">/ ₹{totalINR}</span></p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5 text-left space-y-2 text-sm text-slate-600">
                      <p>✅ You'll be redirected to <strong>WhatsApp</strong> with your booking details pre-filled.</p>
                      <p>✅ Our team will confirm within <strong>30 minutes</strong> and send payment instructions.</p>
                      <p>✅ We accept UPI, Google Pay, PhonePe, and international payments.</p>
                      <p>✅ Flight reservation PDF delivered within <strong>30 minutes to 2 hours</strong> of payment.</p>
                    </div>

                    {/* Unpaid Invoice */}
                    <div className="bg-white border-2 border-dashed border-amber-300 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">INVOICE</p>
                          <p className="text-lg font-bold text-slate-900 font-mono">{orderId}</p>
                        </div>
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wide">Unpaid</span>
                      </div>
                      <div className="border-t border-slate-100 pt-3 space-y-2 text-sm text-left">
                        <div className="flex justify-between"><span className="text-slate-500">Service</span><span className="font-medium">Flight Reservation for Visa</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Route</span><span className="font-medium text-right max-w-[200px] truncate">{formData.from.match(/\(([^)]+)\)/)?.[1] || "—"} → {formData.to.match(/\(([^)]+)\)/)?.[1] || "—"}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Departure</span><span className="font-medium">{formData.departure}</span></div>
                        {formData.return && <div className="flex justify-between"><span className="text-slate-500">Return</span><span className="font-medium">{formData.return}</span></div>}
                        <div className="flex justify-between"><span className="text-slate-500">Validity</span><span className="font-medium">{validityPlan.label}</span></div>
                        {addInsurance && <div className="flex justify-between"><span className="text-slate-500">Insurance</span><span className="font-medium">{insuranceDays} day{insuranceDays !== 1 ? "s" : ""}</span></div>}
                        <div className="flex justify-between"><span className="text-slate-500">Passenger</span><span className="font-medium">{formData.firstName} {formData.lastName}</span></div>
                        <div className="flex justify-between border-t border-slate-100 pt-2 mt-2">
                          <span className="font-bold text-slate-900">Total Due</span>
                          <span className="font-bold text-blue-700 text-base">${totalUSD} / ₹{totalINR}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-3 text-center">Share this Order ID on WhatsApp — our team will send payment instructions</p>
                    </div>

                    <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg font-bold" onClick={handleWhatsAppRedirect}>
                      <MessageCircle className="w-5 h-5 mr-2" /> Open WhatsApp to Book Now
                    </Button>
                    <Button variant="ghost" className="w-full text-slate-500" onClick={() => setStep(1)}>← Edit Details</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-blue-100 shadow-md bg-white">
              <CardHeader className="bg-blue-50/50 border-b border-blue-100 pb-4">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Flight Ticket ({validityPlan.label})</span>
                  <span className="font-semibold">${validityPlan.price_usd} / ₹{validityPlan.price_inr}</span>
                </div>
                {addInsurance && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Health Insurance ({insuranceDays} day{insuranceDays > 1 ? "s" : ""})</span>
                    <span className="font-semibold text-red-600">${insuranceCostUSD} / ₹{insuranceCostINR}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm text-green-600">
                  <span>Instant Delivery</span><span>Free</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span className="text-blue-600">${totalUSD} / ₹{totalINR}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white border-none">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg flex items-center text-amber-400">
                  <ShieldCheck className="w-5 h-5 mr-2" /> Why Choose Us?
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  {["100% Embassy Acceptable", "Valid PNR for verification", "Instant PDF generation", "24/7 WhatsApp Support"].map((f, i) => (
                    <li key={i} className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-400 shrink-0" /><span>{f}</span></li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Button className="w-full bg-green-500 hover:bg-green-600 text-white" asChild>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">💬 Book via WhatsApp Directly</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightReservation
