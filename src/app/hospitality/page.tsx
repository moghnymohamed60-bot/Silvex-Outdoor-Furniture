'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Droplets,
  Sun,
  Layers,
  Award,
  Loader2,
  MailCheck,
} from 'lucide-react';

export default function HospitalityPage() {
  const [formData, setFormData] = useState({
    contactName: '',
    companyName: '',
    email: '',
    projectType: 'Luxury Hotel / Resort',
    projectLocation: '',
    estimatedVolume: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/hospitality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmittedData(data.data);
      } else {
        alert(data.error || 'Failed to submit application.');
      }
    } catch (err) {
      alert('Network error submitting trade application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-20 pb-24">
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden bg-stone-900">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1800&auto=format&fit=crop"
          alt="Silvex Hospitality Resort Deck"
          className="absolute inset-0 w-full h-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full text-white space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-500/20 backdrop-blur-md border border-sand-500/30 text-sand-300 text-xs uppercase tracking-widest font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            Contract & Hospitality Division
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl leading-tight">
            Elevating Outdoor Spaces for World-Class Destinations
          </h1>
          <p className="text-stone-300 max-w-xl text-xs sm:text-sm leading-relaxed">
            Silvex collaborates with premier hoteliers, Michelin-starred restauranteurs, landscape architects, and yacht designers to create enduring outdoor sanctuaries.
          </p>
        </div>
      </section>

      {/* Hospitality Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-3">
            <ShieldCheck className="w-6 h-6 text-silvex-600" />
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white">Commercial Grade Durability</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">Tested to EN 581-1/2/3 and ANSI/BIFMA outdoor hospitality standards for rigorous high-traffic use.</p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-3">
            <Droplets className="w-6 h-6 text-silvex-600" />
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white">Saltwater & Chlorine Proof</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">Marine-grade 316 stainless steel joinery and sealed anti-corrosion coatings suited for beach clubs.</p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-3">
            <Layers className="w-6 h-6 text-silvex-600" />
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white">Custom Finishes & COM</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">Custom frame powder coatings, bespoke timber staining, and Customer's Own Material (COM) upholstery.</p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-3">
            <Award className="w-6 h-6 text-silvex-600" />
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white">Dedicated Project Management</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">Single point-of-contact concierge, tiered volume trade discounts, white-glove installation, and CAD/3D BIM library.</p>
          </div>
        </div>
      </section>

      {/* Trade Application Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-stone-900 p-8 sm:p-12 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-luxury space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest font-bold text-silvex-600">
              Direct Inquiries
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              Apply for Silvex Trade & Contract Program
            </h2>
            <p className="text-xs text-stone-500">
              Receive trade volume pricing, physical material swatches, and dedicated project management.
            </p>
          </div>

          {submittedData ? (
            <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mx-auto text-emerald-600">
                <MailCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-emerald-900 dark:text-emerald-200">
                Trade Application Confirmed
              </h3>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{submittedData.contactName}</strong>. A confirmation email has been dispatched to <strong>{submittedData.email}</strong>. A Silvex Hospitality Director will contact you within 24 hours.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSubmittedData(null)}
                  className="px-6 py-2.5 rounded-full bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4">
              <div className="space-y-1">
                <label className="font-bold text-stone-700 dark:text-stone-300">Contact Name</label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white"
                  placeholder="e.g. Sarah Jenkins"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 dark:text-stone-300">Design Firm / Hotel Group</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white"
                  placeholder="e.g. Jenkins Luxury Architecture"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 dark:text-stone-300">Professional Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white"
                  placeholder="sarah@jenkinsarch.com"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 dark:text-stone-300">Project Type</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white"
                >
                  <option>Luxury Hotel / Resort</option>
                  <option>Private Beach Club</option>
                  <option>Michelin Restaurant Terrace</option>
                  <option>Residential Estate Architecture</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-stone-700 dark:text-stone-300">Project Location & Estimated Volume</label>
                <textarea
                  rows={3}
                  value={formData.projectLocation}
                  onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white"
                  placeholder="e.g. 24 cabana daybeds and 80 dining chairs for terrace opening in June 2026..."
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-forest-900 hover:bg-forest-800 text-white text-xs uppercase tracking-widest font-bold shadow-luxury transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    'Submit Trade Application'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
