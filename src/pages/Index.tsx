import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Solution from "@/components/Solution";
import Dashboard from "@/components/Dashboard";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Problems />
        <section id="solucao">
          <Solution />
        </section>
        <Dashboard />
        <section id="precos">
          <Pricing />
        </section>
        <section id="depoimentos">
          <Testimonials />
        </section>
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
