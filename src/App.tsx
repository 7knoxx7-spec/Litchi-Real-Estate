import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AIDemo from "./pages/AIDemo";
import Maps from "./pages/Maps";
import AdamChat from "./pages/AdamChat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import { ChatSupport } from "@/components/ChatSupport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ai-demo" element={<AIDemo />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/adam" element={<AdamChat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatSupport />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
