import brainBg from './assets/medical-bg.webp'; 
import logoImage from './assets/logo.png'; 
import doctor from './assets/doctor.png';
import googlePlayBadge from './assets/google-play-badge.svg'; // 🟢 Replace placeholders with your actual asset imports
import appStoreBadge from './assets/app-store-badge.svg'; // 🟢 Replace placeholders with your actual asset imports
import React, { useEffect, useState } from 'react';

interface Review {
  _id?: string;
  patientName: string;
  comment: string;
  rating: number;
  reportType?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://healthalgorithm-a5aqe6ckgzdmb0cf.southindia-01.azurewebsites.net';



export default function App() {

  // 2. Initialize the state for reviews
 const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // 3. Fetch reviews from your backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // REPLACE this with your actual Azure App Service URL later
        const response = await fetch(`${API_URL}/api/reviews/approved`);
        const data = await response.json();
        setReviews(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading reviews:", error);
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const [submitting, setSubmitting] = useState(false);

const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSubmitting(true);

  const formData = new FormData(e.currentTarget);
  const reviewData = {
    patientName: formData.get('patientName'),
    rating: Number(formData.get('rating')),
    comment: formData.get('comment'),
    reportType: "General Analysis" // Placeholder
  };

  try {
    const response = await fetch(`${API_URL}/api/reviews/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });

    if (response.ok) {
      alert("Thank you! Your review has been sent for verification.");
      (e.target as HTMLFormElement).reset();
    }
  } catch (error) {
    console.error("Submission error:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    setSubmitting(false);
  }
};
  return (
    <div className="min-h-screen bg-white font-sans text-[#0f3a37] selection:bg-teal-100 scroll-smooth">
      
      {/* 🟢 1. NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-teal-50/50">
        <div className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Logo" className="w-8 h-8 object-contain" />
            <span className="font-bold text-[24px] tracking-tight text-[#134e4a]">Praman AI</span>
          </div>

          <div className="hidden md:flex space-x-8">
            {['PROCESS', 'EXPERTS', 'REVIEWS', 'PRICING'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="font-medium text-[11px] text-[#94A3B8] hover:text-teal-600 tracking-[1.2px] uppercase transition-colors">
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a href="#" className="h-8 transition-transform hover:scale-105" target="_blank" rel="noopener noreferrer">
              <img src={googlePlayBadge} alt="Get it on Google Play" className="h-full object-contain" />
            </a>
            <a href="#" className="h-8 transition-transform hover:scale-105" target="_blank" rel="noopener noreferrer">
              <img src={appStoreBadge} alt="Download on the App Store" className="h-full object-contain" />
            </a>
          </div>
        </div>
      </nav>

      {/* 🟢 2. HERO SECTION */}
      <header className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-b from-teal-50/30 via-white to-white">
        <div className="absolute inset-0 z-0">
          <img src={brainBg} className="w-full h-full object-cover opacity-80 scale-105" alt="" />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-50/60 via-white/20 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block px-3 py-1 bg-teal-50 border border-teal-100 rounded-full">
               <p className="font-semibold text-[10px] text-teal-600 uppercase tracking-[1.5px]">AI-Powered & Doctor Verified</p>
            </div>
            <h1 className="font-semibold text-[#134e4a] text-[40px] md:text-[56px] leading-[1.1] tracking-tight">
              Medical clarity <br/><span className="text-teal-500">simplified for you.</span>
            </h1>
            <p className="font-normal text-[15px] leading-[24px] text-slate-500 max-w-lg">
              Upload your medical reports for a dual-layer review. Our AI analyzes the data while board-certified specialists verify every detail.
            </p>
            
            <div className="flex flex-col gap-6 pt-2">
              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-teal-50 flex items-center gap-3">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                      <span className="font-bold text-[24px] text-[#134e4a]">₹500</span>
                      <span className="font-bold text-[11px] text-teal-500 uppercase">| AI</span>
                    </div>
                    <span className="font-normal text-[11px] text-[#94A3B8]">Per report analysis</span>
                  </div>
                </div>
              </div>

              {/* 🟢 Redesigned & Compact Hero Download Section */}
              <div className="bg-white/70 p-5 rounded-3xl border border-teal-50 shadow-inner flex flex-col md:flex-row items-center gap-4 md:gap-6 max-w-lg">
                
                {/* 🟢 Tighter Text Column (Left/First) */}
                <div className="text-center md:text-left flex-1 space-y-0.5">
                  <p className="font-normal text-slate-500 text-[13px]">Available now on</p>
                  <p className="font-bold text-[#134e4a] text-[18px]">PramanAI App</p>
                  <p className="font-medium text-teal-600 text-[11px]">AI Insights & Doctor Verification.</p>
                </div>

                {/* 🟢 Vertical Badges Column (Right/Second) */}
                <div className="flex flex-col gap-2.5 min-w-[160px]">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105">
                    <img src={googlePlayBadge} alt="Get it on Google Play" className="h-10 w-auto" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105">
                    <img src={appStoreBadge} alt="Download on the App Store" className="h-10 w-auto" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        {/* 🟢 3. MOBILE MOCKUP - Updated with "Active Analysis" UI */}
<div className="lg:col-span-5 flex justify-center lg:justify-end">
  <div className="w-[280px] h-[560px] bg-[#134e4a] rounded-[3rem] p-2.5 shadow-2xl border-[6px] border-white relative overflow-hidden">
    
    {/* Animated Scanning Line */}
    <div className="absolute top-0 left-0 w-full h-1 bg-teal-400/50 blur-sm z-20 animate-scan"></div>
    
    <div className="w-full h-full bg-white rounded-[2.5rem] p-6 flex flex-col relative z-10 overflow-hidden">
      {/* Notch */}
      <div className="w-16 h-1 bg-slate-200 rounded-full mx-auto mb-8" />
      
      {/* Report Preview Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
          <img src={logoImage} className="w-6 h-6 opacity-40" alt="" />
        </div>
        <div>
          <div className="h-3 w-20 bg-slate-100 rounded mb-1"></div>
          <div className="h-2 w-12 bg-slate-50 rounded"></div>
        </div>
      </div>

      {/* Analysis Card */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <p className="font-bold text-[12px] text-[#134e4a]">Patient Report.pdf</p>
          <span className="text-[10px] text-teal-600 font-bold">88% Scanned</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div className="w-[88%] h-full bg-teal-500 animate-pulse"></div>
        </div>

        {/* Mock Data Findings */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
            <div className="h-2 w-full bg-slate-200 rounded-full"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
            <div className="h-2 w-[90%] bg-slate-200 rounded-full"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
            <div className="h-2 w-[70%] bg-slate-100 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="mt-auto text-center pb-4">
        <p className="font-bold text-[13px] text-[#134e4a] mb-1">AI analyzing vitals...</p>
        <p className="text-[11px] text-slate-400">Waiting for doctor verification</p>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-teal-50 rounded-full blur-3xl opacity-50"></div>
    </div>
  </div>
</div>
        </div>
      </header>

      {/* 🟢 3. HOW IT WORKS */}
      <section id="process" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="font-semibold text-[24px] text-[#134e4a]">Precision in Every Step</h2>
            <div className="h-1 w-10 bg-teal-400 rounded-full mx-auto mt-2"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Upload Report", d: "Drop your PDF or Lab photos into our secure portal." },
              { t: "AI Verification", d: "AI cross-references data against global standards." },
              { t: "Doctor Feedback", d: "A specialist manually reviews the final summary." }
            ].map((step, i) => (
              <div key={i} className="bg-[#f8fcfc] p-8 rounded-[2rem] border border-transparent text-center space-y-3 relative transition-all hover:bg-white hover:border-teal-100 hover:shadow-lg hover:-translate-y-1 group">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-100 text-[#134e4a] font-bold px-3 py-0.5 rounded-full text-[10px]">Step 0{i+1}</span>
                <h4 className="font-bold text-[17px] text-[#134e4a]">{step.t}</h4>
                <p className="font-normal text-[13px] leading-[20px] text-slate-500">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🟢 4. MEET OUR EXPERTS (NEW SECTION) */}
      <section id="experts" className="py-16 bg-[#f8fcfc]">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-12">
      <h2 className="font-semibold text-[24px] text-[#134e4a]">Meet Our Verification Experts</h2>
      <p className="text-slate-500 text-[14px] mt-2">Every report is reviewed by board-certified medical professionals.</p>
    </div>
    <div className="grid md:grid-cols-4 gap-6">
      {[
        // 🟢 Added 'img' property only to the first doctor
        { n: "Dr. Vijay Neelakantam", s: "General Physician", e: "25+ Yrs Exp", img: doctor },
        { n: "Dr. Sarah Pathologist", s: "Pathologist", e: "10+ Yrs Exp" },
        { n: "Dr. James Wilson", s: "General Physician", e: "15+ Yrs Exp" },
        { n: "Dr. Priya Nair", s: "Cardiologist", e: "8+ Yrs Exp" }
      ].map((doc, i) => (
        <div key={i} className="bg-white p-6 rounded-3xl border border-teal-50 text-center space-y-3 transition-all hover:shadow-md flex flex-col items-center">
          
          {/* 🟢 Conditional Rendering Logic */}
          {doc.img ? (
            // If the doctor has an image, render it
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-teal-100/50 shadow-inner">
              <img 
                src={doc.img} 
                alt={doc.n} 
                className="w-full h-full object-cover" 
              />
            </div>
          ) : (
            // Otherwise, render the default letter circle (matching previous code)
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 font-bold text-xl">
              {doc.n.charAt(4)}
            </div>
          )}

          <div>
            <h4 className="font-bold text-[15px] text-[#134e4a]">{doc.n}</h4>
            <p className="text-teal-500 text-[12px] font-medium">{doc.s}</p>
            <p className="text-slate-400 text-[11px] mt-1">{doc.e}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* 🟢 6. PRICING */}
      <section id="pricing" className="py-16 bg-[#f8fcfc]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#134e4a] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="p-10 md:p-12 flex-1 text-white space-y-6">
              <h3 className="font-bold text-[22px]">Medical Second Opinion</h3>
              <ul className="space-y-3 font-normal text-[14px] opacity-90">
                <li className="flex items-center gap-3"><span className="text-teal-400">✓</span> Instant AI Identification</li>
                <li className="flex items-center gap-3"><span className="text-teal-400">✓</span> Doctor-Led Verification</li>
                <li className="flex items-center gap-3"><span className="text-teal-400">✓</span> Clear Health Summary</li>
              </ul>
            </div>
            <div className="bg-white/5 p-10 md:p-12 flex flex-col items-center justify-center border-l border-white/10 min-w-[280px]">
               <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-white font-bold text-[48px]">₹500</span>
                  <span className="text-teal-400 font-bold text-[12px]">/Report</span>
               </div>
               <div className="w-full space-y-3">
                 <button className="w-full bg-teal-400 text-[#134e4a] py-4 rounded-xl font-bold text-[15px] hover:bg-teal-300 transition-all">Analyze Now (Web Portal)</button>
                 <div className="flex items-center justify-center gap-3 opacity-80 pt-1">
                   <a href="#" className="h-7" target="_blank" rel="noopener noreferrer">
                     <img src={googlePlayBadge} alt="Get it on Google Play" className="h-full object-contain" />
                   </a>
                   <a href="#" className="h-7" target="_blank" rel="noopener noreferrer">
                     <img src={appStoreBadge} alt="Download on the App Store" className="h-full object-contain" />
                   </a>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

     {/* 🟢 5. REVIEWS - Now Dynamic */}
      <section id="reviews" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="font-bold text-[24px] text-[#134e4a] text-center mb-12">Patient Stories</h3>
          
          {/* Show a loading message if data hasn't arrived yet */}
          {loading ? (
            <p className="text-center text-slate-400">Loading stories...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
             {reviews.map((rev: Review, i: number) => (
  <div key={rev._id || i} className="p-7 rounded-3xl bg-[#f8fcfc] border border-teal-50 ...">
    {/* The errors on rev.rating, rev.comment, etc. will now disappear! */}
    <div className="flex gap-1 mb-3 text-teal-400 text-xs">
      {"★".repeat(rev.rating || 5)}
    </div>
    <p className="font-normal text-[13px] leading-[20px] text-slate-600 italic mb-4">
      "{rev.comment}"
    </p>
    <p className="font-bold text-[14px] text-[#134e4a]">
      {rev.patientName}
    </p>
  </div>
))}
            </div>
          )}
        </div>

        {/* --- Review Submission Form --- */}
<div className="mt-16 max-w-2xl mx-auto bg-[#f8fcfc] border border-teal-100 p-8 rounded-[2.5rem]">
  <h4 className="font-bold text-[20px] text-[#134e4a] text-center mb-6">Share Your Experience</h4>
  
  <form onSubmit={handleReviewSubmit} className="space-y-4">
    <div className="grid md:grid-cols-2 gap-4">
      <input 
        name="patientName"
        type="text" 
        placeholder="Your Name" 
        required
        className="w-full px-4 py-3 rounded-xl border border-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-[14px]"
      />
      <select 
        name="rating"
        className="w-full px-4 py-3 rounded-xl border border-teal-50 bg-white text-[14px]"
      >
        <option value="5">5 Stars (Excellent)</option>
        <option value="4">4 Stars (Great)</option>
        <option value="3">3 Stars (Good)</option>
      </select>
    </div>
    
    <textarea 
      name="comment"
      placeholder="How did PramanAI help you today?" 
      required
      rows={3}
      className="w-full px-4 py-3 rounded-xl border border-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-[14px]"
    ></textarea>

    <button 
      type="submit" 
      disabled={submitting}
      className="w-full bg-[#134e4a] text-white py-4 rounded-xl font-bold text-[14px] hover:bg-teal-900 transition-all disabled:opacity-50"
    >
      {submitting ? "Submitting..." : "Submit Review"}
    </button>
  </form>
</div>
      </section>

      {/* 🟢 7. FOOTER */}
      <footer className="py-10 bg-white border-t border-slate-100 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 opacity-50 grayscale">
             <img src={logoImage} alt="" className="w-5 h-5" />
             <span className="font-bold text-[16px]">Praman AI</span>
        </div>
        <p className="font-medium text-[11px] text-[#94A3B8]">© 2026 Praman AI. Focused on Medical Clarity.</p>
      </footer>
    </div>
  );
}