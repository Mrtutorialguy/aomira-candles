"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "custom_scent" as "general" | "wholesale" | "custom_scent" | "event_gifting",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [inquiryId, setInquiryId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit inquiry. Please review fields.");
        return;
      }

      setStatus("success");
      setInquiryId(data.inquiryId);
      setFormData({
        fullName: "",
        email: "",
        subject: "custom_scent",
        message: "",
      });
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-[#382c22]/10 bg-[#fdfbf7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#c4682b]">
            Direct From The Chandler
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#231f1c]">
            Custom Fragrance &amp; Studio Inquiries
          </h2>
          <p className="text-sm text-[#6b635c]">
            Looking for bespoke event gifting, wedding favors, or custom scent formulation? Send our studio team a note below.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#382c22]/10 shadow-sm">
          {status === "success" ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#485343]/10 text-[#485343] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#231f1c]">
                Inquiry Received
              </h3>
              <p className="text-sm text-[#5a524a] max-w-md mx-auto">
                Thank you for contacting Aomira Studio. Your reference number is{" "}
                <span className="font-mono font-semibold text-[#231f1c]">{inquiryId}</span>.
                Our team reviews inquiries daily and will respond within one business day.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-4 px-5 py-2 text-xs font-medium rounded-full border border-[#382c22]/20 text-[#231f1c] hover:bg-[#f4eee3]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {status === "error" && (
                <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#231f1c]" htmlFor="fullName">
                    Your Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Eleanor Vance"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#382c22]/15 text-sm text-[#231f1c] focus:outline-none focus:ring-1 focus:ring-[#c4682b] bg-[#fdfbf7]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#231f1c]" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="eleanor@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#382c22]/15 text-sm text-[#231f1c] focus:outline-none focus:ring-1 focus:ring-[#c4682b] bg-[#fdfbf7]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#231f1c]" htmlFor="subject">
                  Inquiry Topic
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subject: e.target.value as "general" | "wholesale" | "custom_scent" | "event_gifting",
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#382c22]/15 text-sm text-[#231f1c] focus:outline-none focus:ring-1 focus:ring-[#c4682b] bg-[#fdfbf7]"
                >
                  <option value="custom_scent">Custom Scent Formulation</option>
                  <option value="event_gifting">Event Gifting and Wedding Favors</option>
                  <option value="wholesale">Boutique Wholesale Order</option>
                  <option value="general">General Candle Care or Question</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#231f1c]" htmlFor="message">
                  Message Details
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the scent profile or quantity you have in mind..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#382c22]/15 text-sm text-[#231f1c] focus:outline-none focus:ring-1 focus:ring-[#c4682b] bg-[#fdfbf7]"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 px-5 rounded-lg bg-[#231f1c] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#3d3630] transition-colors disabled:opacity-50"
              >
                {status === "loading" ? (
                  <span>Submitting Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
