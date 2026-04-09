"use client";

import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useLocale } from "@/lib/locale-context";
import { portfolioData } from "@/data/portfolio";

const { contact, socialLinks } = portfolioData;

export default function ContactSection() {
  const { locale, t } = useLocale();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // mailto fallback
    const subject = encodeURIComponent(
      `Portfolio Contact from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:${socialLinks.email}?subject=${subject}&body=${body}`;

    setNotification({
      type: "success",
      message:
        locale === "en"
          ? "Opening your email client..."
          : "Membuka email client...",
    });
    setFormData({ name: "", email: "", message: "" });
    setIsSending(false);
  };

  const socials = [
    { Icon: FaGithub, href: socialLinks.github, label: "GitHub" },
    { Icon: FaLinkedin, href: socialLinks.linkedin, label: "LinkedIn" },
  ];

  return (
    <section id="contact" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-3xl font-light tracking-tight text-black">
            {t(contact.heading)}
          </h2>
          <div className="mx-auto mb-4 h-px w-16 bg-black" />
          <p className="mx-auto max-w-xl font-light text-gray-600">
            {t(contact.subheading)}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm uppercase tracking-wider text-gray-600"
              >
                {locale === "en" ? "Name" : "Nama"}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="off"
                required
                className="w-full border border-gray-200 px-4 py-3 outline-none transition-colors duration-300 focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm uppercase tracking-wider text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                required
                className="w-full border border-gray-200 px-4 py-3 outline-none transition-colors duration-300 focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm uppercase tracking-wider text-gray-600"
              >
                {locale === "en" ? "Message" : "Pesan"}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                required
                className="w-full resize-none border border-gray-200 px-4 py-3 outline-none transition-colors duration-300 focus:border-black"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-black px-8 py-3 text-sm uppercase tracking-wider text-white transition-colors duration-300 hover:bg-gray-900 disabled:opacity-50"
            >
              {isSending
                ? locale === "en"
                  ? "Sending..."
                  : "Mengirim..."
                : locale === "en"
                  ? "Send Message"
                  : "Kirim Pesan"}
            </button>

            {notification && (
              <div
                className={`p-3 text-center text-sm ${
                  notification.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {notification.message}
              </div>
            )}
          </form>

          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h3 className="mb-6 text-sm uppercase tracking-wider text-gray-500">
                {locale === "en" ? "Contact Information" : "Informasi Kontak"}
              </h3>
              <div className="space-y-3">
                <p className="text-lg font-light">{socialLinks.email}</p>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-sm uppercase tracking-wider text-gray-500">
                Connect
              </h3>
              <div className="flex space-x-6">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-gray-600 transition-colors duration-300 hover:text-black"
                  >
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
