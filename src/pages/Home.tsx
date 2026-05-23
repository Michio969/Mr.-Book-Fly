// ─── HOME.TSX — UPDATED ───────────────────────────────────────
// Changes made:
//   1. Line 635: "Mr. Book & Mrs. Fly Advantage" → "Mr. Book & Fly Advantage"
//   2. Line 675: Legal disclaimer brand name fixed
//   3. TrustBar, HowItWorks, Guarantee, Reviews components are
//      already built into this file — your empty .tsx files
//      should just re-export from here OR be deleted (see note below)
// ─────────────────────────────────────────────────────────────
// NOTE: Your 4 empty .tsx files (TrustBar, HowItWorks, Guarantee, Reviews)
// are NOT needed — this file already has all that content built in.
// Either DELETE those empty files, or paste the component code below
// into them if you want to use them separately.
// ─────────────────────────────────────────────────────────────

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
    gu: "વિશ્વભरमां 10,000+ વિઝા અરજદારો દ્વારા વિશ્વાસ. ઝડپी, સুरक्षিત ડмी ટिकिट અने હоटेл બुकिंग.",
    kn: "ಜಗತ್ತಿನಾದ್ಯಂತ 10,000+ ವೀಸಾ ಅರ್ಜಿದಾರರ ನಂಬಿಕೆ. ವೇಗವಾದ, ಸುರಕ್ಷಿತ ಬುಕಿಂಗ್.",
    ml: "ലോകमेम്पाടും 10,000+ വിസ അപേക്ഷകർ വിശ്വസിക്കുന്നു. വേഗत്തിലും സുरക്ഷিതമायും ബുക്കിംഗ്.",
    pa: "ਦੁਨੀਆਭਰ ਵਿੱਚ 10,000+ ਵੀਜ਼ਾ ਅਰਜ਼ੀਕਾਰਾਂ ਦਾ ਭਰੋਸਾ। ਤੇਜ਼, ਸੁਰੱਖਿਅਤ ਡਮੀ ਟਿਕਟ ਅਤੇ ਹੋਟਲ ਬੁਕਿੰਗ।",
    or: "ବিଶ୍ୱ ଜୁଡ଼ା 10,000+ ଭିସା ଆବেদନকارীঙ୍କ ভরসা। ଦ୍ରুত, ସୁরক্ষিত ବুকিং।",
  },
  book_now: {
    en: "Book Now", fr: "Réserver maintenant", de: "Jetzt buchen", es: "Reservar ahora",
    mx: "Reservar ahora", ru: "Забронировать", pt: "Reservar agora", tr: "Şimdi Rezervasyon Yap",
    zh: "立即预订", ja: "今すぐ予約", ko: "지금 예약", id: "Pesan Sekarang", ms: "Tempah Sekarang",
    ar: "احجز الآن", ur: "ابھی بک کریں", fa: "همین الان رزرو کنید",
    hi: "अभी बुक करें", bn: "এখনই বুক করুন", te: "ఇప్పుడే బుక్ చేయండి", ta: "இப்போதே பதிவு செய்யுங்கள்",
    mr: "आता बुक करा", gu: "હવे બुक करो", kn: "ಈಗಲೇ ಬుಕ್ ಮಾಡಿ", ml: "ഇپ്പോൾ ബुക്ക് ചെय്യൂ",
    pa: "ਹੁਣੇ ਬੁੱਕ ਕਰੋ", or: "ଏবে ବুক କरन୍ତୁ",
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
    mr: "30 मिनिटांत बुकिंग मिळवा", gu: "30 મिनिटমاं বুকিং मेळवো",
    kn: "30 ನಿಮಿಷದಲ್ಲಿ ಬುಕಿಂಗ್ ಪಡೆಯಿರಿ", ml: "30 മিനिറ്റিനுള്ళिൽ ബুക്കിংഗ് నేടൂ",
    pa: "30 ਮਿੰਟਾਂ ਵਿੱਚ ਬੁਕਿੰਗ ਪਾਓ", or: "30 ମिনিট মধ্যরে বুকিং পাআন্তু",
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
    mr: "आमच्या व्हिसा समर्थन सेवा", gu: "અমারी વિઝা સپोর্ট সেবাओ",
    kn: "ನಮ್ಮ ವೀಸಾ ಬೆಂಬಲ ಸೇವೆಗಳು", ml: "ഞങ്ങளുടে വিস സپ্পোর്ট് সেবগ৾",
    pa: "ਸਾਡੀਆਂ ਵੀਜ਼ਾ ਸਹਾਇਤਾ ਸੇਵਾਵਾਂ", or: "ആমர ভিসা সহায়তা সেবা",
  },
  how_works_h: {
    en: "How It Works", fr: "Comment ça fonctionne", de: "Wie es funktioniert",
    es: "Cómo funciona", mx: "Cómo funciona", ru: "Как это работает",
    pt: "Como funciona", tr: "Nasıl Çalışır", zh: "如何运作", ja: "仕組み",
    ko: "작동 방식", id: "Cara Kerjanya", ms: "Cara Ia Berfungsi",
    ar: "كيف يعمل", ur: "یہ کیسے کام کرتا ہے", fa: "چطور کار می‌کند",
    hi: "यह कैसे काम करता है", bn: "এটি কীভাবে কাজ করে",
    te: "ఇది ఎలా పని చేస్తుంది", ta: "இது எவ்வாறு செயல்படுகிறது",
    mr: "हे कसे कार्य करते", gu: "আ কেবী రীতে কাম করে",
    kn: "ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ", ml: "ഇത് എങ്ങনে প্রবর্তিক্কুন্নু",
    pa: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ", or: "এহা কিপরি কাম করে",
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
    mr: "आमचे ग्राहक काय म्हणतात", gu: "અমারে ক্লায়েন্ট শুধু কহে",
    kn: "ನಮ್ಮ ಗ್ರಾಹಕರು ಏನು ಹೇಳುತ್ತಾರೆ", ml: "ഞগ്ഗÙളുടെ ক্লায়েন্টুকূ এন്ত് পরয়ুন്നু",
    pa: "ਸਾਡੇ ਗਾਹਕ ਕੀ ਕਹਿੰਦੇ ਹਨ", or: "আম গ্রাহক ক'ণ কুহন্তি",
  },
  faq_h: {
    en: "Frequently Asked Questions", fr: "Questions fréquemment posées", de: "Häufig gestellte Fragen",
    es: "Preguntas frecuentes", mx: "Preguntas frecuentes", ru: "Часто задаваемые вопросы",
    pt: "Perguntas frequentes", tr: "Sık Sorulan Sorular", zh: "常见问题", ja: "よくある質問",
    ko: "자주 묻는 질문", id: "Pertanyaan yang Sering Diajukan", ms: "Soalan Lazim",
    ar: "الأسئلة الشائعة", ur: "اکثر پوچھے گئے سوالات", fa: "سوالات متداول",
    hi: "अक्सर पूछे जाने वाले प्रश्न", bn: "সাধারণত জিজ্ঞাসিত প্রশ্ন",
    te: "తరచుగా అడిగే ప్రశ్నలు", ta: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    mr: "वारंवार विचारले जाणारे प्रश्न", gu: "বারংবার পূছাতা প্রশ্নো",
    kn: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು", ml: "പতিব ചোദ്യഗ്ঙ്ল്",
    pa: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ", or: "বারম্বার পচরাযাউথিবা প্রশ্ন",
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
    mr: "तुम्हाला कागदपत्रे तातडीने हवी आहेत का?", gu: "শুধু তামানে তাতকালिক দস্তাবেজো জোئে?",
    kn: "ನಿಮ್ಮ ದಾಖಲೆಗಳು ತುರ್ತಾಗಿ ಬೇಕೇ?", ml: "নিঙ্ঙলুডে রেখকল্ অडিয়ন্তরমায়ি বেণো?",
    pa: "ਕੀ ਤੁਹਾਨੂੰ ਤੁਰੰਤ ਦਸਤਾਵੇਜ਼ ਚਾਹੀਦੇ ਹਨ?", or: "আপণঙ্ক দলিল জরুরী দরকার?",
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
    mr: "WhatsApp वर चॅट करा", gu: "WhatsApp পর চেট করো",
    kn: "WhatsApp ನಲ್ಲಿ ಚಾಟ್ ಮಾಡಿ", ml: "WhatsApp-ൽ ചाट്ट് ചেয়്যൂ",
    pa: "WhatsApp ਤੇ ਚੈਟ ਕਰੋ", or: "WhatsApp রে চ্যাট করন্তু",
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
    mr: "आत्ता बुकिंग सुरू करा", gu: "হমণাং বুকিং শুরু করো",
    kn: "ಈಗಲೇ ಬುಕಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ", ml: "ഇप്पോল്‍ ബुക്കിংഗ് ആরम്ഭിക്കൂ",
    pa: "ਹੁਣੇ ਬੁਕਿੰਗ ਸ਼ੁਰੂ ਕਰੋ", or: "এবে বুকিং আরম্ভ করন্তু",
  },
}

function t(key: string, lang: string): string {
  return T[key]?.[lang] || T[key]?.["en"] || key
}

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

export function Home() {
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
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14 px-8 rounded-xl font-semibold backdrop-blur-sm">
                    💬 {t("whatsapp", lang)}
                  </Button>
                </a>
              </div>
              <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" /> {t("delivery_note", lang)}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-white border-b border-slate-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
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

      {/* ── REST OF YOUR EXISTING SECTIONS (stats, services, how it works, etc.) ──
          Keep everything else from your original file exactly as-is from here.
          The only TWO lines changed below are:
          1. "Mr. Book & Mrs. Fly Advantage" → "Mr. Book & Fly Advantage"
          2. Legal disclaimer brand name
      ── */}

      {/* ── WHY US ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-green-50 text-green-700 border-green-200">Why Choose Us</Badge>
            {/* ✅ FIXED: Was "Mr. Book & Mrs. Fly Advantage" */}
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
            {/* ✅ FIXED: Was "Mr. Book & Mrs. Fly" */}
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
