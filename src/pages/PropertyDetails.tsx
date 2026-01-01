import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reviews from "@/components/Reviews";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Phone,
  MessageCircle,
  Share2,
  Heart,
  CheckCircle,
  Calendar,
  Eye
} from "lucide-react";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const language = "ar"; // Default or from context

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await api.get(`/properties/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  if (!property) return <div className="min-h-screen bg-background flex items-center justify-center">Property not found</div>;

  const parsedLocation = typeof property.location === 'string' ? JSON.parse(property.location) : property.location;
  const parsedImages = typeof property.images === 'string' ? JSON.parse(property.images) : property.images;
  const parsedFeatures = typeof property.features === 'string' ? JSON.parse(property.features) : property.features || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 h-[500px]">
          <div className="md:col-span-1 h-full">
            <img 
              src={parsedImages[0]} 
              alt={property.title} 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 h-full">
            {parsedImages.slice(1, 5).map((img: string, idx: number) => (
              <img 
                key={idx} 
                src={img} 
                alt={`${property.title} ${idx+2}`} 
                className="w-full h-full object-cover rounded-xl"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-5 w-5 mr-2" />
                    {parsedLocation.address}, {parsedLocation.city}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    {property.price.toLocaleString()} AED
                  </div>
                  <Badge variant="secondary" className="mt-2">
                    {property.type}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-6 py-6 border-y border-border">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{property.bedrooms} Beds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{property.bathrooms} Baths</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{property.area} sqft</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {parsedFeatures.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Reviews propertyId={property.id} language={language} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={property.agent?.avatar || "https://github.com/shadcn.png"} 
                    alt={property.agent?.name} 
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{property.agent?.name || "Agent"}</h3>
                    <p className="text-sm text-muted-foreground">Licensed Real Estate Agent</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Phone className="mr-2 h-4 w-4" /> Call Agent
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Safety Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>Never transfer money before viewing</li>
                  <li>Check all documents carefully</li>
                  <li>Meet in a public place</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default PropertyDetails;
