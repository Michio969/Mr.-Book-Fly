import { FileText, Download, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Dashboard() {
  const orders = [
    {
      id: "ORD-98234",
      date: "Oct 24, 2026",
      service: "Flight Reservation",
      status: "Completed",
      amount: "$15.00",
      passenger: "John Doe",
      destination: "LHR to JFK"
    },
    {
      id: "ORD-87123",
      date: "Oct 15, 2026",
      service: "Hotel Booking",
      status: "Completed",
      amount: "$15.00",
      passenger: "John Doe",
      destination: "Paris, France"
    },
    {
      id: "ORD-76452",
      date: "Sep 02, 2026",
      service: "Invitation Letter",
      status: "Processing",
      amount: "$25.00",
      passenger: "John Doe",
      destination: "Business Visa - USA"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, John</h1>
            <p className="text-slate-600">Manage your visa bookings and download documents.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            New Booking
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">3</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Completed Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">2</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">1</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>View and download your verifiable documents.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                  <tr>
                    <th className="px-6 py-3 font-medium">Order ID / Date</th>
                    <th className="px-6 py-3 font-medium">Service Details</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="bg-white border-b hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{order.id}</div>
                        <div className="text-slate-500">{order.date}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{order.service}</div>
                        <div className="text-slate-500">{order.destination}</div>
                      </td>
                      <td className="px-6 py-4">
                        {order.status === "Completed" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                            <Clock className="w-3 h-3 mr-1" /> Processing
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {order.status === "Completed" ? (
                          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                            <Download className="w-4 h-4 mr-2" /> Download PDF
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled>
                            <FileText className="w-4 h-4 mr-2" /> Generating...
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

