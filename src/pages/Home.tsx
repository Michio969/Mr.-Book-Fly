import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import {
  ShieldCheck, Clock, FileText, CheckCircle2, Star, Plane, Building,
  Calendar, Mail, ArrowRight, Lock, MessageCircle, Heart, Globe,
  Ticket, CalendarDays, BadgeCheck, Zap, Users, ChevronDown, ChevronUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useSEO } from "@/lib/seo"

// ─── TRANSLATIONS ────────────────────────────────────────────────
const LANGUAGE_GROUPS = [
  {
    group: "🌍 International",
    langs: [
      { code: "en", label: "English", flag: "🇬🇧" },
      { code: "fr", label: "Français", flag: "🇫🇷" },
      { code: "de", label: "Deutsch", flag: "🇩🇪" },
      { code: "es", label: "Español", flag: "🇪🇸" },
      { code: "mx", label: "Español (MX)", flag: "🇲🇽" },
      { code: "ru", label: "Русский", flag: "🇷🇺" },
      { code: "pt", label: "Português", flag: "🇧🇷" },
      { code: "tr", label: "Türkçe", flag: "🇹🇷" },
      { code: "zh", label: "中文", flag: "🇨🇳" },
      { code: "ja", label: "日本語", flag: "🇯🇵" },
      { code: "ko", label: "한국어", flag: "🇰🇷" },
      { code: "id", label: "Bahasa", flag: "🇮🇩" },
      { code: "ms", label: "Melayu", flag: "🇲🇾" },
    ],
  },
  {
    group: "🌙 Middle East",
    langs: [
      { code: "ar", label: "العربية", flag: "🇦🇪" },
      { code: "ur", label: "اردو", flag: "🇵🇰" },
      { code: "fa", label: "فارسی", flag: "🇮🇷" },
    ],
  },
  {
    group: "🇮🇳 Indian Languages",
    langs: [
      { code: "hi", label: "हिंदी", flag: "🇮🇳" },
      { code: "bn", label: "বাংলা", flag: "🇮🇳" },
      { code: "te", label: "తెలుగు", flag: "🇮🇳" },
      { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
      { code: "mr", label: "मराठी", flag: "🇮🇳" },
      { code: "gu", label: "ગુજરાતી", flag: "🇮🇳" },
      { code: "kn", label: "ಕನ್ನಡ", flag: "🇮🇳" },
      { code: "ml", label: "മലയാളം", flag: "🇮🇳" },
      { code: "pa", label: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
      { code: "or", label: "ଓଡ଼ିଆ", flag: "🇮🇳" },
    ],
  },
]

const ALL_LANGUAGES = LANGUAGE_GROUPS.flatMap(g => g.langs)

const T: Record<string, Record<string, string>> = {
  hero_badge: {
    en: "100% Embassy Acceptable Documents",
    fr: "Documents acceptés à 100% par l'ambassade",
    de: "100% botschaftsakzeptable Dokumente",
    es: "Documentos aceptados 100% por la embajada",
    mx: "Documentos aceptados al 100% por la embajada",
    ru: "Документы, принятые посольством на 100%",
    pt: "Documentos aceitos 100% pela embaixada",
    tr: "Büyükelçilik tarafından %100 kabul edilen belgeler",
    zh: "100%领事馆认可的文件",
    ja: "大使館100%受理可能な書類",
    ko: "대사관 100% 수락 서류",
    id: "Dokumen 100% diterima kedutaan",
    ms: "Dokumen diterima 100% oleh kedutaan",
    ar: "وثائق مقبولة 100% من السفارة",
    ur: "100% سفارت قبول شدہ دستاویزات",
    fa: "اسناد 100٪ قابل قبول سفارت",
    hi: "100% दूतावास स्वीकार्य दस्तावेज़",
    bn: "100% দূতাবাস গ্রহণযোগ্য নথি",
    te: "100% దూతావాస ఆమోద పత్రాలు",
    ta: "100% தூதரக ஏற்றுக்கொள்ளப்பட்ட ஆவணங்கள்",
    mr: "100% दूतावास स्वीकार्य कागदपत्रे",
    gu: "100% એમ્બેસી સ્વીકાર્ય દસ્તાવેજો",
    kn: "100% ರಾಯಭಾರ ಕಚೇರಿ ಸ್ವೀಕಾರಾರ್ಹ ದಾಖಲೆಗಳು",
    ml: "100% എംബസി സ്വീകാര്യ രേഖകൾ",
    pa: "100% ਦੂਤਾਵਾਸ ਮਨਜ਼ੂਰ ਦਸਤਾਵੇਜ਼",
    or: "100% ଦୂତାବାସ ଗ୍ରହଣୀୟ ଦଲିଲ",
  },
  hero_h1a: {
    en: "Get Verified Visa Bookings in",
    fr: "Obtenez des réservations visa vérifiées en",
    de: "Erhalten Sie verifizierte Visa-Buchungen in",
    es: "Obtén reservas de visa verificadas en",
    mx: "Obtén reservas de visa verificadas en",
    ru: "Получите подтверждённые визовые бронирования за",
    pt: "Obtenha reservas de visto verificadas em",
    tr: "Onaylı vize rezervasyonlarınızı alın",
    zh: "在几分钟内获得签证预订",
    ja: "数分でビザ予約を取得",
    ko: "몇 분 안에 비자 예약 확인",
    id: "Dapatkan pemesanan visa terverifikasi dalam",
    ms: "Dapatkan tempahan visa yang disahkan dalam",
    ar: "احصل على حجوزات فيزا موثقة في",
    ur: "منٹوں میں تصدیق شدہ ویزا بکنگ پائیں",
    fa: "در چند دقیقه رزرو ویزای تأییدشده دریافت کنید",
    hi: "मिनटों में सत्यापित वीज़ा बुकिंग पाएं",
    bn: "মিনিটে যাচাইকৃত ভিসা বুকিং পান",
    te: "నిమిషాల్లో ధృవీకరించిన వీసా బుకింగ్ పొందండి",
    ta: "நிமிடங்களில் சரிபார்க்கப்பட்ட விசா முன்பதிவு பெறுங்கள்",
    mr: "मिनिटांत सत्यापित व्हिसा बुकिंग मिळवा",
    gu: "મિનિટોમાં ચકાસાયેલ વિઝા બુકિંગ મેળવો",
    kn: "ನಿಮಿಷಗಳಲ್ಲಿ ದೃಢೀಕರಿಸಿದ ವೀಸಾ ಬುಕಿಂಗ್ ಪಡೆಯಿರಿ",
    ml: "മിനിറ്റുകൾക്കുള്ളിൽ സ്ഥിരീകരിച്ച വിസ ബുക്കിംഗ് നേടുക",
    pa: "ਮਿੰਟਾਂ ਵਿੱਚ ਤਸਦੀਕਸ਼ੁਦਾ ਵੀਜ਼ਾ ਬੁਕਿੰਗ ਪਾਓ",
    or: "ମିନିଟ୍‌ ମଧ୍ୟରେ ଯାଞ୍ଚ ହୋଇଥିବା ଭିସା ବୁକିଂ ପାଆନ୍ତୁ",
  },
  hero_h1b: {
    en: "Minutes", fr: "Minutes", de: "Minuten", es: "Minutos", mx: "Minutos",
    ru: "Минуты", pt: "Minutos", tr: "Dakikalar", zh: "分钟", ja: "分", ko: "분",
    id: "Menit", ms: "Minit", ar: "دقائق", ur: "منٹ", fa: "دقیقه",
    hi: "मिनट", bn: "মিনিট", te: "నిమిషాలు", ta: "நிமிடங்கள்", mr: "मिनिटे",
    gu: "મિનિટ", kn: "ನಿಮಿಷಗಳು", ml: "മിനിറ്റ്", pa: "ਮਿੰਟ", or: "ମିନିଟ୍",
  },
  hero_sub: {
    en: "Trusted by 10,000+ visa applicants worldwide. Fast, secure, and fully compliant dummy tickets and hotel reservations.",
    fr: "Approuvé par plus de 10 000 demandeurs de visa dans le monde. Billets fictifs et réservations d'hôtel rapides et sécurisés.",
    de: "Von über 10.000 Visaantragstellern weltweit vertraut. Schnelle, sichere und konforme Dummy-Tickets und Hotelreservierungen.",
    es: "Con la confianza de más de 10.000 solicitantes de visa en todo el mundo. Boletos y reservas rápidas, seguras y compatibles.",
    mx: "Con la confianza de más de 10.000 solicitantes de visa. Boletos y reservas rápidas, seguras y conformes.",
    ru: "Доверие более 10 000 соискателей визы по всему миру. Быстрые, безопасные бронирования для визы.",
    pt: "Com a confiança de mais de 10.000 solicitantes de visto. Passagens e reservas rápidas, seguras e compatíveis.",
    tr: "Dünya genelinde 10.000'den fazla vize başvurusu sahibi tarafından güvenilmektedir. Hızlı ve güvenli dummy biletler.",
    zh: "全球超过10,000名签证申请人信赖。快速、安全的机票和酒店预订。",
    ja: "世界中の10,000人以上のビザ申請者に信頼されています。迅速・安全な予約。",
    ko: "전 세계 10,000명 이상의 비자 신청자가 신뢰합니다. 빠르고 안전한 예약.",
    id: "Dipercaya oleh lebih dari 10.000 pemohon visa di seluruh dunia. Tiket dan reservasi cepat dan aman.",
    ms: "Dipercayai oleh lebih 10,000 pemohon visa di seluruh dunia. Tiket dan tempahan yang cepat dan selamat.",
    ar: "موثوق به من قِبَل أكثر من 10,000 متقدم للتأشيرة حول العالم. حجوزات آمنة وسريعة.",
    ur: "دنیا بھر میں 10,000 سے زیادہ ویزا درخواست دہندگان کا اعتماد۔ تیز اور محفوظ بکنگ۔",
    fa: "مورد اعتماد بیش از 10,000 متقاضی ویزا در سراسر جهان. بلیط و رزرو سریع و امن.",
    hi: "दुनिया भर में 10,000+ वीज़ा आवेदकों द्वारा विश्वसनीय। तेज़, सुरक्षित डमी टिकट और होटल बुकिंग।",
    bn: "বিশ্বজুড়ে ১০,০০০+ ভিসা আবেদনকারীদের বিশ্বাস। দ্রুত, নিরাপদ ডামি টিকিট এবং হোটেল বুকিং।",
    te: "ప్రపంచవ్యాప్తంగా 10,000+ వీసా దరఖాస్తుదారులు విశ్వసిస్తున్నారు. వేగంగా, సురక్షితంగా బుకింగ్.",
    ta: "உலகெங்கிலும் 10,000+ விசா விண்ணப்பதாரர்களால் நம்பப்படுகிறது. வேகமான, பாதுகாப்பான முன்பதிவுகள்.",
    mr: "जगभरात 10,000+ व्हिसा अर्जदारांनी विश्वास ठेवलेला. जलद, सुरक्षित डमी तिकीट आणि हॉटेल बुकिंग.",
    gu: "વિશ્વભરમાં 10,000+ વિઝા અરજદારો દ્વારા વિશ્વાસ. ઝડપી, સુરક્ષિત ડમી ટિકિટ અને હોટેલ બુકિંગ.",
    kn: "ಜಗತ್ತಿನಾದ್ಯಂತ 10,000+ ವೀಸಾ ಅರ್ಜಿದಾರರ ನಂಬಿಕೆ. ವೇಗವಾದ, ಸುರಕ್ಷಿತ ಬುಕಿಂಗ್.",
    ml: "ലോകമെമ്പാടും 10,000+ വിസ അപേക്ഷകർ വിശ്വസിക്കുന്നു. വേഗത്തിലും സുരക്ഷിതമായും ബുക്കിംഗ്.",
    pa: "ਦੁਨੀਆਭਰ ਵਿੱਚ 10,000+ ਵੀਜ਼ਾ ਅਰਜ਼ੀਕਾਰਾਂ ਦਾ ਭਰੋਸਾ। ਤੇਜ਼, ਸੁਰੱਖਿਅਤ ਡਮੀ ਟਿਕਟ ਅਤੇ ਹੋਟਲ ਬੁਕਿੰਗ।",
    or: "ବିଶ୍ୱ ଜୁଡ଼ା 10,000+ ଭିସା ଆବେଦନକାରୀଙ୍କ ଭରସା। ଦ୍ରୁତ, ସୁରକ୍ଷିତ ବୁକିଂ।",
  },
  book_now: {
    en: "Book Now", fr: "Réserver maintenant", de: "Jetzt buchen", es: "Reservar ahora",
    mx: "Reservar ahora", ru: "Забронировать", pt: "Reservar agora", tr: "Şimdi Rezervasyon Yap",
    zh: "立即预订", ja: "今すぐ予約", ko: "지금 예약", id: "Pesan Sekarang", ms: "Tempah Sekarang",
    ar: "احجز الآن", ur: "ابھی بک کریں", fa: "همین الان رزرو کنید",
    hi: "अभी बुक करें", bn: "এখনই বুক করুন", te: "ఇప్పుడే బుక్ చేయండి", ta: "இப்போதே பதிவு செய்யுங்கள்",
    mr: "आता बुक करा", gu: "હવે બુક કરો", kn: "ಈಗಲೇ ಬುಕ್ ಮಾಡಿ", ml: "ഇപ്പോൾ ബുക്ക് ചെയ്യൂ",
    pa: "ਹੁਣੇ ਬੁੱਕ ਕਰੋ", or: "ଏବେ ବୁକ୍ କରନ୍ତୁ",
  },
  delivery_note: {
    en: "Get your booking within 30 minutes",
    fr: "Recevez votre réservation en 30 minutes",
    de: "Erhalten Sie Ihre Buchung innerhalb von 30 Minuten",
    es: "Obtén tu reserva en 30 minutos",
    mx: "Obtén tu reserva en 30 minutos",
    ru: "Получите бронирование в течение 30 минут",
    pt: "Receba sua reserva em 30 minutos",
    tr: "Rezervasyonunuzu 30 dakika içinde alın",
    zh: "30分钟内获得您的预订", ja: "30分以内に予約を取得",
    ko: "30분 이내에 예약 확인", id: "Dapatkan pemesanan dalam 30 menit",
    ms: "Dapatkan tempahan dalam 30 minit",
    ar: "احصل على حجزك خلال 30 دقيقة",
    ur: "30 منٹ میں بکنگ حاصل کریں",
    fa: "در 30 دقیقه رزرو خود را دریافت کنید",
    hi: "30 मिनट में बुकिंग पाएं", bn: "৩০ মিনিটের মধ্যে বুকিং পান",
    te: "30 నిమిషాల్లో బుకింగ్ పొందండి", ta: "30 நிமிடங்களில் முன்பதிவு பெறுங்கள்",
    mr: "30 मिनिटांत बुकिंग मिळवा", gu: "30 મિનિટમાં બુકિંગ મેળવો",
    kn: "30 ನಿಮಿಷದಲ್ಲಿ ಬುಕಿಂಗ್ ಪಡೆಯಿರಿ", ml: "30 മിനിറ്റിനുള്ളിൽ ബുക്കിംഗ് നേടൂ",
    pa: "30 ਮਿੰਟਾਂ ਵਿੱਚ ਬੁਕਿੰਗ ਪਾਓ", or: "30 ମିନିଟ୍‌ ମଧ୍ୟରେ ବୁକିଂ ପାଆନ୍ତୁ",
  },
  services_h: {
    en: "Our Visa Support Services", fr: "Nos services de soutien visa", de: "Unsere Visa-Unterstützungsdienste",
    es: "Nuestros servicios de apoyo de visa", mx: "Nuestros servicios de apoyo de visa",
    ru: "Наши визовые услуги", pt: "Nossos serviços de suporte de visto",
    tr: "Vize Destek Hizmetlerimiz", zh: "我们的签证支持服务", ja: "ビザサポートサービス",
    ko: "비자 지원 서비스", id: "Layanan Dukungan Visa Kami", ms: "Perkhidmatan Sokongan Visa Kami",
    ar: "خدمات دعم التأشيرة لدينا", ur: "ہماری ویزا سپورٹ سروسز",
    fa: "خدمات پشتیبانی ویزای ما",
    hi: "हमारी वीज़ा सहायता सेवाएं", bn: "আমাদের ভিসা সহায়তা সেবা",
    te: "మా వీసా సహాయ సేవలు", ta: "எங்கள் விசா ஆதரவு சேவைகள்",
    mr: "आमच्या व्हिसा समर्थन सेवा", gu: "અમારી વિઝા સપોર્ટ સેવાઓ",
    kn: "ನಮ್ಮ ವೀಸಾ ಬೆಂಬಲ ಸೇವೆಗಳು", ml: "ഞങ്ങളുടെ വിസ സപ്പോർട്ട് സേവനങ്ങൾ",
    pa: "ਸਾਡੀਆਂ ਵੀਜ਼ਾ ਸਹਾਇਤਾ ਸੇਵਾਵਾਂ", or: "ଆମର ଭିସା ସହାୟତା ସେବା",
  },
  how_works_h: {
    en: "How It Works", fr: "Comment ça fonctionne", de: "Wie es funktioniert",
    es: "Cómo funciona", mx: "Cómo funciona", ru: "Как это работает",
    pt: "Como funciona", tr: "Nasıl Çalışır", zh: "如何运作", ja: "仕組み",
    ko: "작동 방식", id: "Cara Kerjanya", ms: "Cara Ia Berfungsi",
    ar: "كيف يعمل", ur: "یہ کیسے کام کرتا ہے", fa: "چطور کار می‌کند",
    hi: "यह कैसे काम करता है", bn: "এটি কীভাবে কাজ করে",
    te: "ఇది ఎలా పని చేస్తుంది", ta: "இது எவ்வாறு செயல்படுகிறது",
    mr: "हे कसे कार्य करते", gu: "આ કેવી રીતે કામ કરે છે",
    kn: "ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ", ml: "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    pa: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ", or: "ଏହା କିପରି କାମ କରେ",
  },
  reviews_h: {
    en: "What Our Clients Say", fr: "Ce que disent nos clients", de: "Was unsere Kunden sagen",
    es: "Lo que dicen nuestros clientes", mx: "Lo que dicen nuestros clientes",
    ru: "Отзывы наших клиентов", pt: "O que nossos clientes dizem",
    tr: "Müşterilerimiz Ne Diyor", zh: "客户评价", ja: "お客様の声",
    ko: "고객 후기", id: "Apa Kata Klien Kami", ms: "Apa Yang Pelanggan Kami Katakan",
    ar: "ماذا يقول عملاؤنا", ur: "ہمارے کلائنٹ کیا کہتے ہیں",
    fa: "مشتریان ما چه می‌گویند",
    hi: "हमारे ग्राहक क्या कहते हैं", bn: "আমাদের ক্লায়েন্টরা কী বলেন",
    te: "మా క్లయింట్లు ఏమి చెప్తున్నారు", ta: "எங்கள் வாடிக்கையாளர்கள் என்ன சொல்கிறார்கள்",
    mr: "आमचे ग्राहक काय म्हणतात", gu: "અમારા ક્લાયન્ટ શું કહે છે",
    kn: "ನಮ್ಮ ಗ್ರಾಹಕರು ಏನು ಹೇಳುತ್ತಾರೆ", ml: "ഞങ്ങളുടെ ക്ലയന്റുകൾ എന്ത് പറയുന്നു",
    pa: "ਸਾਡੇ ਗਾਹਕ ਕੀ ਕਹਿੰਦੇ ਹਨ", or: "ଆମ ଗ୍ରାହକ କ'ଣ କୁହନ୍ତି",
  },
  faq_h: {
    en: "Frequently Asked Questions", fr: "Questions fréquemment posées", de: "Häufig gestellte Fragen",
    es: "Preguntas frecuentes", mx: "Preguntas frecuentes", ru: "Часто задаваемые вопросы",
    pt: "Perguntas frequentes", tr: "Sık Sorulan Sorular", zh: "常见问题", ja: "よくある質問",
    ko: "자주 묻는 질문", id: "Pertanyaan yang Sering Diajukan", ms: "Soalan Lazim",
    ar: "الأسئلة الشائعة", ur: "اکثر پوچھے گئے سوالات", fa: "سوالات متداول",
    hi: "अक्सर पूछे जाने वाले प्रश्न", bn: "সাধারণত জিজ্ঞাসিত প্রশ্ন",
    te: "తరచుగా అడిగే ప్రశ్నలు", ta: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    mr: "वारंवार विचारले जाणारे प्रश्न", gu: "વારંવાર પૂછાતા પ્રશ્નો",
    kn: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು", ml: "പതിവ് ചോദ്യങ്ങൾ",
    pa: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ", or: "ବାରମ୍ବାର ପଚରାଯାଉଥିବା ପ୍ରଶ୍ନ",
  },
  cta_h: {
    en: "Need Your Documents Urgently?", fr: "Besoin de vos documents d'urgence?", de: "Dokumente dringend benötigt?",
    es: "¿Necesitas tus documentos urgentemente?", mx: "¿Necesitas tus documentos urgente?",
    ru: "Срочно нужны документы?", pt: "Precisa dos seus documentos urgentemente?",
    tr: "Belgelerinize acil ihtiyacınız mı var?", zh: "紧急需要您的文件？",
    ja: "書類が急ぎですか？", ko: "서류가 급하게 필요하신가요?",
    id: "Butuh Dokumen Anda Segera?", ms: "Perlukan Dokumen Anda Segera?",
    ar: "هل تحتاج وثائقك بشكل عاجل؟", ur: "کیا آپ کو فوری دستاویزات چاہئیں؟",
    fa: "آیا فوری به مدارک نیاز دارید؟",
    hi: "क्या आपको दस्तावेज़ तुरंत चाहिए?", bn: "আপনার নথি দ্রুত দরকার?",
    te: "మీ పత్రాలు అత్యవసరంగా కావాలా?", ta: "உங்கள் ஆவணங்கள் அவசரமாக வேண்டுமா?",
    mr: "तुम्हाला कागदपत्रे तातडीने हवी आहेत का?", gu: "શું તમને તમારા દસ્તાવેજો તાત્કાલિક જોઈએ છે?",
    kn: "ನಿಮ್ಮ ದಾಖಲೆಗಳು ತುರ್ತಾಗಿ ಬೇಕೇ?", ml: "നിങ്ങളുടെ രേഖകൾ അടിയന്തരമായി വേണോ?",
    pa: "ਕੀ ਤੁਹਾਨੂੰ ਤੁਰੰਤ ਦਸਤਾਵੇਜ਼ ਚਾਹੀਦੇ ਹਨ?", or: "ଆପଣଙ୍କ ଦଲିଲ ଜରୁରୀ ଦରକାର?",
  },
  whatsapp: {
    en: "Chat on WhatsApp", fr: "Chatter sur WhatsApp", de: "Auf WhatsApp chatten",
    es: "Chatear en WhatsApp", mx: "Chatear en WhatsApp", ru: "Написать в WhatsApp",
    pt: "Conversar no WhatsApp", tr: "WhatsApp'ta Sohbet Et", zh: "WhatsApp聊天",
    ja: "WhatsAppでチャット", ko: "WhatsApp 채팅", id: "Chat di WhatsApp",
    ms: "Chat di WhatsApp", ar: "تحدث على واتساب", ur: "WhatsApp پر چیٹ کریں",
    fa: "چت در واتساپ",
    hi: "WhatsApp पर चैट करें", bn: "WhatsApp-এ চ্যাট করুন",
    te: "WhatsApp లో చాట్ చేయండి", ta: "WhatsApp-ல் அரட்டை",
    mr: "WhatsApp वर चॅट करा", gu: "WhatsApp પર ચેટ કરો",
    kn: "WhatsApp ನಲ್ಲಿ ಚಾಟ್ ಮಾಡಿ", ml: "WhatsApp-ൽ ചാറ്റ് ചെയ്യൂ",
    pa: "WhatsApp ਤੇ ਚੈਟ ਕਰੋ", or: "WhatsApp ରେ ଚ୍ୟାଟ୍ କରନ୍ତୁ",
  },
  start_booking: {
    en: "Start Booking Now", fr: "Commencer la réservation", de: "Jetzt mit Buchung beginnen",
    es: "Comenzar a reservar ahora", mx: "Comenzar reserva ahora",
    ru: "Начать бронирование", pt: "Começar a reservar agora",
    tr: "Şimdi Rezervasyon Başlat", zh: "立即开始预订", ja: "今すぐ予約開始",
    ko: "지금 예약 시작", id: "Mulai Pesan Sekarang", ms: "Mula Tempah Sekarang",
    ar: "ابدأ الحجز الآن", ur: "ابھی بکنگ شروع کریں",
    fa: "همین الان شروع به رزرو کنید",
    hi: "अभी बुकिंग शुरू करें", bn: "এখনই বুকিং শুরু করুন",
    te: "ఇప్పుడే బుకింగ్ ప్రారంభించండి", ta: "இப்போதே முன்பதிவு தொடங்குங்கள்",
    mr: "आत्ता बुकिंग सुरू करा", gu: "હમણાં બુકિંગ શરૂ કરો",
    kn: "ಈಗಲೇ ಬುಕಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ", ml: "ഇപ്പോൾ ബുക്കിംഗ് ആരംഭിക്കൂ",
    pa: "ਹੁਣੇ ਬੁਕਿੰਗ ਸ਼ੁਰੂ ਕਰੋ", or: "ଏବେ ବୁକିଂ ଆରମ୍ଭ କରନ୍ତୁ",
  },
}

function t(key: string, lang: string): string {
  return T[key]?.[lang] || T[key]?.["en"] || key
}

// ─── COUNTER ────────────────────────────────────────────────
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = Math.ceil(end / 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(start)
    }, 30)
    return () => clearInterval(timer)
  }, [end])
  return <span>{count.toLocaleString()}{suffix}</span>
}

// ─── FAQ ITEM ────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-slate-800 hover:bg-slate-50 transition-colors" onClick={() => setOpen(!open)}>
        {q}
        {open ? <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <p className="px-6 pb-4 text-slate-600 text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── MAIN HOME ────────────────────────────────────────────────
export function Home() {
  useSEO({
    title: "Mr. Book & Fly | Dummy Flight Tickets & Hotel Bookings for Visa",
    description: "Get 100% embassy-acceptable dummy flight tickets, hotel bookings and visa documents in 30 minutes. Trusted by 10,000+ customers worldwide. Schengen, UK, US, Canada visa support.",
    path: "/",
    noSuffix: true,
  })

  const [lang, setLang] = useState("en")
  const [showLangMenu, setShowLangMenu] = useState(false)

  useEffect(() => {
    const names = ["Rahul from India 🇮🇳", "Sarah from UK 🇬🇧", "Ahmed from UAE 🇦🇪", "Maria from Brazil 🇧🇷", "Fatima from Pakistan 🇵🇰", "Chen from China 🇨🇳", "Kwame from Ghana 🇬🇭"]
    const services = ["Flight Reservation", "Hotel Booking", "Schengen Visa Package", "Health Insurance", "Event Booking"]
    const interval = setInterval(() => {
      const name = names[Math.floor(Math.random() * names.length)]
      const service = services[Math.floor(Math.random() * services.length)]
      toast.success(`${name} just booked a ${service}!`, { description: "Verified for visa application.", icon: <ShieldCheck className="text-green-500" /> })
    }, 18000)
    return () => clearInterval(interval)
  }, [])

  const isRtl = lang === "ar" || lang === "ur" || lang === "fa"
  const currentLang = ALL_LANGUAGES.find(l => l.code === lang)

  return (
    <div className="flex flex-col min-h-screen" dir={isRtl ? "rtl" : "ltr"}>

      {/* ── Language Switcher ── */}
      <div className="bg-slate-900 py-1.5 border-b border-slate-700">
        <div className="container mx-auto px-4 flex justify-end">
          <div className="relative">
            <button onClick={() => setShowLangMenu(!showLangMenu)} className="flex items-center gap-2 text-sm text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors">
              <Globe className="w-4 h-4" />
              <span>{currentLang?.flag} {currentLang?.label}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {showLangMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 w-72 max-h-96 overflow-y-auto">
                {LANGUAGE_GROUPS.map(group => (
                  <div key={group.group}>
                    <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 sticky top-0">{group.group}</div>
                    <div className="grid grid-cols-2">
                      {group.langs.map(l => (
                        <button key={l.code} onClick={() => { setLang(l.code); setShowLangMenu(false) }}
                          className={`flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-blue-50 transition-colors ${lang === l.code ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-700"}`}>
                          <span>{l.flag}</span><span>{l.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white py-24 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center" />
        {/* Decorative circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-6 py-1.5 px-4 text-sm bg-amber-500/20 text-amber-400 border-amber-500/40 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 mr-2" /> {t("hero_badge", lang)}
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                {t("hero_h1a", lang)}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">{t("hero_h1b", lang)}</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                {t("hero_sub", lang)}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                <Link to="/order-form">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg h-14 px-10 rounded-xl shadow-lg shadow-amber-500/30">
                    {t("book_now", lang)} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <a href="https://wa.me/447877679344" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14 px-8 rounded-xl backdrop-blur-sm">
                    <MessageCircle className="w-5 h-5 mr-2 text-green-400" /> {t("whatsapp", lang)}
                  </Button>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-12">
                <Clock className="w-4 h-4 text-amber-400" /> {t("delivery_note", lang)}
              </div>

              {/* Trust bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                {[
                  { icon: <Star className="w-5 h-5 fill-amber-400 text-amber-400" />, val: "4.9/5", label: "Customer Rating" },
                  { icon: <Users className="w-5 h-5 text-blue-400" />, val: "10,000+", label: "Happy Clients" },
                  { icon: <ShieldCheck className="w-5 h-5 text-green-400" />, val: "100%", label: "Embassy Approved" },
                  { icon: <Zap className="w-5 h-5 text-purple-400" />, val: "30 Min", label: "Avg Delivery" },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    {s.icon}
                    <span className="text-white font-bold text-lg">{s.val}</span>
                    <span className="text-slate-400 text-xs">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-white border-b border-slate-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-slate-600">
            {[
              { icon: "🔒", text: "SSL Secured Checkout" },
              { icon: "✅", text: "100% Embassy Accepted" },
              { icon: "⚡", text: "30-Min Delivery Guarantee" },
              { icon: "🌍", text: "10,000+ Customers Worldwide" },
              { icon: "💳", text: "Secure Payment" },
              { icon: "🔄", text: "Money-Back Guarantee" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 font-medium">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-blue-600 py-10 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: 10000, suffix: "+", label: "Bookings Completed" },
              { val: 98, suffix: "%", label: "Visa Success Rate" },
              { val: 50, suffix: "+", label: "Countries Covered" },
              { val: 24, suffix: "/7", label: "Customer Support" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-4xl font-extrabold mb-1"><Counter end={s.val} suffix={s.suffix} /></div>
                <div className="text-blue-100 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200">Our Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("services_h", lang)}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Everything you need for your visa application — formatted to embassy standards and delivered fast.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { title: "Flight Reservations", desc: "Verifiable PNR-verified flight itineraries. Ready for Schengen, UK, US & more.", icon: <Plane className="w-7 h-7 text-blue-600" />, link: "/flight-reservation", price: "From $3 / ₹299", color: "blue" },
              { title: "Hotel Bookings", desc: "Confirmed hotel reservations in any destination worldwide. Embassy-safe.", icon: <Building className="w-7 h-7 text-green-600" />, link: "/hotel-booking", price: "From $6 / ₹499", color: "green" },
              { title: "Event Booking", desc: "Verifiable event tickets to prove purpose of visit to embassy.", icon: <Ticket className="w-7 h-7 text-purple-600" />, link: "/event-booking", price: "From $12 / ₹1199", color: "purple" },
              { title: "Health Insurance", desc: "Travel health insurance per day — add-on with any flight booking.", icon: <Heart className="w-7 h-7 text-red-500" />, link: "/flight-reservation", price: "$4 / ₹499 per day", color: "red" },
              { title: "Invitation Letters", desc: "Professionally drafted letters for tourist, business and family visas.", icon: <Mail className="w-7 h-7 text-amber-600" />, link: "/invitation-letter", price: "Contact WhatsApp", color: "amber" },
              { title: "Slot Booking", desc: "Embassy & VFS appointment slots for all major countries worldwide.", icon: <CalendarDays className="w-7 h-7 text-indigo-600" />, link: "/appointment-booking", price: "Contact WhatsApp", color: "indigo" },
              { title: "Valuable Deals", desc: "Complete visa file packages — flight, hotel, insurance, cover letter included.", icon: <BadgeCheck className="w-7 h-7 text-orange-600" />, link: "/valuable-deals", price: "From ₹24,999", color: "orange" },
              { title: "Flight + Hotel Bundle", desc: "Best value combo — flight itinerary + hotel reservation in one order.", icon: <Calendar className="w-7 h-7 text-teal-600" />, link: "/order-form", price: "From $5 / ₹449", color: "teal" },
            ].map((s, i) => {
              const colorMap: Record<string, string> = {
                blue: "bg-blue-50 group-hover:bg-blue-100",
                green: "bg-green-50 group-hover:bg-green-100",
                purple: "bg-purple-50 group-hover:bg-purple-100",
                red: "bg-red-50 group-hover:bg-red-100",
                amber: "bg-amber-50 group-hover:bg-amber-100",
                indigo: "bg-indigo-50 group-hover:bg-indigo-100",
                orange: "bg-orange-50 group-hover:bg-orange-100",
                teal: "bg-teal-50 group-hover:bg-teal-100",
              }
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <Link to={s.link} className="group block h-full">
                    <Card className="h-full border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-colors ${colorMap[s.color]}`}>
                          {s.icon}
                        </div>
                        <CardTitle className="text-base">{s.title}</CardTitle>
                        <CardDescription className="text-sm">{s.desc}</CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-3 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-800">{s.price}</span>
                        <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-green-50 text-green-700 border-green-200">Simple Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("how_works_h", lang)}</h2>
            <p className="text-slate-600">Get your visa-ready documents in 3 simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute top-14 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />
            {[
              { step: "01", title: "Choose Service", desc: "Pick flight, hotel, insurance or any visa document you need.", icon: <FileText className="w-8 h-8 text-blue-600" />, color: "bg-blue-50 border-blue-200" },
              { step: "02", title: "Secure Payment", desc: "Pay via UPI, PayPal or WhatsApp. Fast and fully secure.", icon: <Lock className="w-8 h-8 text-green-600" />, color: "bg-green-50 border-green-200" },
              { step: "03", title: "Receive on WhatsApp", desc: "Get your verified documents delivered to your email & WhatsApp within minutes.", icon: <MessageCircle className="w-8 h-8 text-amber-600" />, color: "bg-amber-50 border-amber-200" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative flex flex-col items-center text-center z-10">
                <div className={`w-28 h-28 rounded-full ${s.color} border-2 flex items-center justify-center mb-4 shadow-sm`}>
                  {s.icon}
                </div>
                <div className="absolute top-0 -left-2 w-8 h-8 bg-blue-600 text-white rounded-full text-xs font-bold flex items-center justify-center shadow-md">{s.step}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── URGENCY CTA ── */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074')] bg-cover bg-center" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("cta_h", lang)}</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Our team processes your booking within 30 minutes to 2 hours. Don't risk your visa with unverified documents.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/order-form">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg h-14 px-10 rounded-xl shadow-lg">
                  {t("start_booking", lang)} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="https://wa.me/447877679344" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700 h-14 px-8 rounded-xl font-bold">
                  <MessageCircle className="w-5 h-5 mr-2" /> {t("whatsapp", lang)}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ADDITIONAL SERVICES ── */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-950 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">More Visa Support Services</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">Beyond bookings — comprehensive documentation to make your visa application bulletproof.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-10">
            {[
              { emoji: "📝", title: "Cover Letter", desc: "Embassy-ready cover letters tailored to your visa type and destination.", wa: "I need a Cover Letter for my visa application." },
              { emoji: "🗺️", title: "Travel Itinerary", desc: "Detailed day-by-day travel plans showing your activities and accommodation.", wa: "I need a Travel Itinerary for my visa application." },
              { emoji: "📂", title: "Document Preparation", desc: "Complete visa checklist, file organisation and review service.", wa: "I need help with Document Preparation for my visa." },
              { emoji: "🌍", title: "Other Visa Services", desc: "Invitation letters, sponsorship letters, NOC letters, bank statement guidance.", wa: "I need other visa support services. Please guide me." },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/8 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/12 transition-all border border-white/10 hover:border-white/20">
                <div className="text-4xl mb-4">{s.emoji}</div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-slate-300 text-sm mb-5 leading-relaxed">{s.desc}</p>
                <a href={`https://wa.me/447877679344?text=${encodeURIComponent("Hi! " + s.wa)}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors gap-1">
                  💬 Enquire on WhatsApp <ArrowRight className="w-3 h-3" />
                </a>
              </motion.div>
            ))}
          </div>
          <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/447877679344" target="_blank" rel="noopener noreferrer">
              <Button className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg h-14 px-8 rounded-xl">💬 {t("whatsapp", lang)}</Button>
            </a>
            <a href="mailto:92sweetflower@gmail.com">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 font-bold text-lg h-14 px-8 rounded-xl">📧 Email Us</Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-amber-50 text-amber-700 border-amber-200">Reviews</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("reviews_h", lang)}</h2>
            <p className="text-slate-600">Trusted by thousands of travelers worldwide.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Anjali Sharma", loc: "New Delhi, India 🇮🇳", text: "The dummy ticket was accepted instantly for my Schengen visa. Saved me so much money and stress!", avatar: "AS", color: "bg-blue-600" },
              { name: "Kwame Mensah", loc: "Accra, Ghana 🇬🇭", text: "Fast and reliable service. I got my hotel booking in minutes and my UK visa was approved without issues.", avatar: "KM", color: "bg-green-600" },
              { name: "Elena Rodriguez", loc: "Sao Paulo, Brazil 🇧🇷", text: "Excellent support! They helped me with a custom invitation letter that was perfect for my US visa.", avatar: "ER", color: "bg-purple-600" },
              { name: "Fatima Al-Rashid", loc: "Dubai, UAE 🇦🇪", text: "Very professional service. Got my flight itinerary within 20 minutes. Highly recommended!", avatar: "FA", color: "bg-amber-600" },
              { name: "Ravi Kumar", loc: "Mumbai, India 🇮🇳", text: "Used for Canada visa. The team was so helpful on WhatsApp and documents were perfect. Got visa approved!", avatar: "RK", color: "bg-red-600" },
              { name: "James Osei", loc: "Nairobi, Kenya 🇰🇪", text: "Best service for visa documents. Cheap, fast and embassy-acceptable. Will use again for next trip.", avatar: "JO", color: "bg-indigo-600" },
            ].map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                  <CardHeader className="flex flex-row items-center gap-4 pb-3">
                    <div className={`w-12 h-12 rounded-full ${r.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>{r.avatar}</div>
                    <div>
                      <CardTitle className="text-base">{r.name}</CardTitle>
                      <CardDescription className="text-xs">{r.loc}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex text-amber-400 mb-3">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                    <p className="text-slate-600 text-sm italic">"{r.text}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-green-50 text-green-700 border-green-200">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Mr. Book & Fly Advantage</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: <ShieldCheck className="w-8 h-8 text-blue-600" />, title: "100% Embassy Approved", desc: "Every document is formatted specifically to meet embassy requirements.", bg: "bg-blue-50" },
              { icon: <Zap className="w-8 h-8 text-amber-600" />, title: "30 Min to 2 Hour Delivery", desc: "We process your booking and deliver via email and WhatsApp fast.", bg: "bg-amber-50" },
              { icon: <Globe className="w-8 h-8 text-green-600" />, title: "50+ Countries Covered", desc: "Schengen, UK, USA, Canada, UAE and all major visa destinations.", bg: "bg-green-50" },
              { icon: <MessageCircle className="w-8 h-8 text-purple-600" />, title: "24/7 WhatsApp Support", desc: "Real humans available round the clock to help you with your booking.", bg: "bg-purple-50" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-center p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
                  <div className={`w-16 h-16 ${s.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>{s.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-slate-100 text-slate-700 border-slate-200">FAQ</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t("faq_h", lang)}</h2>
            <p className="text-slate-600">Everything you need to know about our visa support services.</p>
          </div>
          <div className="space-y-3">
            {[
              { q: "Are these bookings acceptable by embassies?", a: "Yes. Our flight reservations and hotel bookings come with valid PNRs that can be verified on airline websites. They are designed to meet requirements for Schengen, UK, US, Canada and other visa applications." },
              { q: "Are these actual paid tickets?", a: "No. These are reserved itineraries (dummy tickets) made for visa purposes only. They hold a valid PNR reservation code but are not fully paid tickets. Do not use for actual travel." },
              { q: "How long are the bookings valid?", a: "Flight reservations range from 24 hours to 10 days depending on the validity plan you choose. Hotel bookings are valid until your check-out date. We recommend generating documents 1-2 days before your visa appointment." },
              { q: "How will I receive my documents?", a: "After payment confirmation, you share your UPI Transaction ID on WhatsApp. Our team delivers the verified documents to your email and WhatsApp within 30 minutes to 2 hours." },
              { q: "What payment methods do you accept?", a: "We accept UPI (Google Pay, PhonePe, Paytm), PayPal, and bank transfer. Payment details are confirmed via WhatsApp after booking." },
              { q: "What is your refund policy?", a: "We offer a full refund if your document is not delivered due to a technical issue on our end. Since we provide instant digital documents, refunds are not issued once a valid document has been delivered." },
            ].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
          <div className="mt-10 p-6 bg-amber-50 border border-amber-200 rounded-2xl text-center">
            <p className="text-sm text-amber-800 font-medium">⚠️ Legal Disclaimer: Mr. Book & Fly provides reservation itineraries strictly for visa application purposes. We do not sell actual travel tickets. Purchase real tickets after your visa is approved.</p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Your Visa Documents?</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">Join 10,000+ satisfied customers. Fast delivery, embassy-approved, 24/7 support.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/order-form">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg h-14 px-10 rounded-xl">
                {t("book_now", lang)} <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 h-14 px-8 rounded-xl font-bold">
                View All Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
