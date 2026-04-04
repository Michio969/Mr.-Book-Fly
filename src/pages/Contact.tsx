import { Mail, PhoneCall, MapPin, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Contact() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Have questions about our visa support services? Our team is here to help you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a message</CardTitle>
              <CardDescription>We'll get back to you within 2 hours.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea 
                    id="message" 
                    className="flex min-h-[120px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                    placeholder="Provide details about your inquiry..."
                  ></textarea>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Get in touch instantly</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 mr-4">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">WhatsApp Support</h4>
                    <p className="text-slate-600 mb-2">Fastest way to get help. Available 24/7.</p>
                    <a href="https://wa.me/447877679344" className="text-blue-600 font-medium hover:underline">
                      +44 7877 679344
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 mr-4">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Email Support</h4>
                    <p className="text-slate-600 mb-2">For detailed inquiries and document issues.</p>
                    <a href="mailto:92sweetflower@gmail.com" className="text-blue-600 font-medium hover:underline">
                      92sweetflower@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0 mr-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Office Location</h4>
                    <p className="text-slate-600">
                      123 Business Avenue, Suite 400<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Urgent Visa Deadline?</h3>
              <p className="text-slate-300 mb-6">
                If your visa appointment is within 24 hours, please use our WhatsApp support line for immediate priority processing.
              </p>
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold" asChild>
                <a href="https://wa.me/447877679344" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

