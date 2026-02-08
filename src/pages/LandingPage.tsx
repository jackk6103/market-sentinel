import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Problem } from '../components/Problem';
import { Solution } from '../components/Solution';
import { Demo } from '../components/Demo';
import { Features } from '../components/Features';
import { WhatItDoesNot } from '../components/WhatItDoesNot';
import { ForWho } from '../components/ForWho';
import { HowToUse } from '../components/HowToUse';
import { Pricing } from '../components/Pricing';
import { FinalCTA } from '../components/FinalCTA';
import { Footer } from '../components/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <Demo />
      <Features />
      <WhatItDoesNot />
      <ForWho />
      <HowToUse />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
}
