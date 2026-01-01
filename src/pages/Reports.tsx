import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { BarChart, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Reports = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/analytics/reports");
        setStats(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleDownload = async () => {
    try {
        const response = await api.get('/analytics/export', { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (e) {
        console.error("Download failed", e);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar language="ar" />
      <div className="container mx-auto p-8 pt-24">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2 text-primary">
          <BarChart className="h-8 w-8" />
          تقارير الأداء (Analytics Reports)
        </h1>

        {loading ? (
            <div>Loading...</div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                <CardHeader>
                    <CardTitle>إجمالي المشاهدات (Total Views)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">{stats?.totalViews || 0}</p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader>
                    <CardTitle>عمليات البحث (Searches)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">{stats?.totalSearches || 0}</p>
                </CardContent>
                </Card>
                <Card className="flex flex-col justify-center items-center p-6">
                    <Button size="lg" onClick={handleDownload} className="w-full h-full text-lg">
                        <Download className="mr-2 h-6 w-6" /> تصدير تقرير CSV
                    </Button>
                </Card>
            </div>
        )}
      </div>
      <Footer language="ar" />
    </div>
  );
};

export default Reports;
