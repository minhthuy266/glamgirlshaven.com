"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageCircle, Send, MapPin } from 'lucide-react';

export default function Contact() {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <main className="bg-bg-light dark:bg-bg-dark min-h-screen pt-32 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl pb-24">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-6 block">Get in Touch</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-light dark:text-white mb-8 tracking-tight">
            We’d love to hear <span className="text-primary italic font-medium">from you.</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed">
            Have a question about a product, a collaboration inquiry, or just want to say hi? Reach out using the form below or through our direct channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-10 order-2 lg:order-1">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="text-primary" size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-text-light dark:text-white mb-1">General Inquiries</h4>
                  <p className="text-sm text-gray-500">hello@glamgirlshaven.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <MessageCircle className="text-primary" size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-text-light dark:text-white mb-1">Partnerships</h4>
                  <p className="text-sm text-gray-500">collabs@glamgirlshaven.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="text-primary" size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-text-light dark:text-white mb-1">Editorial Office</h4>
                  <p className="text-sm text-gray-500">New York, NY 10013</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-stone-50 dark:bg-gray-800/50 border border-border-light dark:border-border-dark rounded-sm">
              <h4 className="font-serif text-xl mb-4">Press Kit</h4>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                Are you an editor or brand representative? Download our latest media kit for audience insights and partnership options.
              </p>
              <button className="text-[9px] font-bold uppercase tracking-widest text-primary border-b border-primary pb-1 hover:text-primary-dark transition-colors">
                Download Media Kit (PDF)
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8 bg-white dark:bg-gray-900 border border-border-light dark:border-border-dark p-8 md:p-12 order-1 lg:order-2 shadow-sm min-h-[500px] flex flex-col justify-center">
            {!isSent ? (
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">FullName</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full bg-transparent border-b border-border-light dark:border-border-dark py-3 text-sm focus:border-primary outline-none transition-colors dark:text-white"
                      placeholder="E.g. Isabella Rose"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full bg-transparent border-b border-border-light dark:border-border-dark py-3 text-sm focus:border-primary outline-none transition-colors dark:text-white"
                      placeholder="hello@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Subject</label>
                  <select 
                    id="subject" 
                    className="w-full bg-transparent border-b border-border-light dark:border-border-dark py-3 text-sm focus:border-primary outline-none transition-colors dark:text-white appearance-none"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="partnership">Brand Partnership</option>
                    <option value="product">Product Review Request</option>
                    <option value="bug">Report an Issue</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Your Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    className="w-full bg-transparent border border-border-light dark:border-border-dark p-4 text-sm focus:border-primary outline-none transition-colors dark:text-white rounded-sm resize-none"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="consent" className="rounded border-gray-300 text-primary focus:ring-primary h-3 w-3" required />
                  <label htmlFor="consent" className="text-[10px] text-gray-400 font-medium">I agree to the Privacy Policy and Terms of Use.</label>
                </div>
                <button 
                  type="submit" 
                  className="inline-flex items-center justify-center gap-3 px-12 py-4 bg-text-light dark:bg-white text-white dark:text-text-light text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all w-full md:w-auto"
                >
                  Send Message <Send size={14} />
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                 <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Send className="text-primary" size={32} />
                 </div>
                 <h3 className="font-serif text-3xl mb-4">Message Sent.</h3>
                 <p className="text-gray-500 italic font-serif">Thank you for reaching out. Our editorial team will get back to you within 48 hours.</p>
                 <button onClick={() => setIsSent(false)} className="mt-10 text-[10px] font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-1">Send another message</button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
