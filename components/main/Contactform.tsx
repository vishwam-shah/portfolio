"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Toaster, toast } from "sonner";
import {
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

const details = [
  {
    Icon: HiOutlineEnvelope,
    label: "Email",
    value: "vishwamshah007@gmail.com",
    href: "mailto:vishwamshah007@gmail.com",
  },
  {
    Icon: HiOutlinePhone,
    label: "Phone",
    value: "+91 79846 83397",
    href: "tel:+917984683397",
  },
  {
    Icon: HiOutlineMapPin,
    label: "Location",
    value: "Ahmedabad, India",
  },
];

const socials = [
  { Icon: FaGithub, href: "https://github.com/vishwam-shah" },
  { Icon: FaLinkedin, href: "https://www.linkedin.com/in/vishwam-shah/" },
  { Icon: FaXTwitter, href: "https://twitter.com/vishwamshah007" },
];

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    setSending(true);

    emailjs
      .sendForm(
        "service_2svnepu",
        "template_vmeyoep",
        form.current,
        "N27zaoCMdknIVor8g"
      )
      .then(() => {
        toast.success("Thanks for reaching out, I'll get back to you soon!");
        form.current?.reset();
      })
      .catch(() => {
        toast.error("Something went wrong. Please email me directly.");
      })
      .finally(() => setSending(false));
  };

  return (
    <section id="contact" className="mx-auto w-full max-w-7xl px-5 py-24">
      <SectionHeading
        reveal="unfold"
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build something{" "}
            <span className="text-gradient-aurora">great</span>
          </>
        }
        subtitle="Have a role, a project, or just an idea worth chasing? My inbox is open."
      />

      <Reveal stagger className="mt-14 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        {/* left: details */}
        <div className="glass flex flex-col justify-between gap-8 p-8">
          <div>
            <h3 className="font-display text-2xl font-semibold text-fg">
              Get in touch
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-fg3">
              I&apos;m open to full-time roles, freelance work and research
              collaborations. I usually reply within a day.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {details.map((d) => {
              const content = (
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white/60 text-aurora-violet">
                    <d.Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-fg4">
                      {d.label}
                    </div>
                    <div className="text-sm font-medium text-fg2">{d.value}</div>
                  </div>
                </div>
              );
              return d.href ? (
                <a key={d.label} href={d.href} className="transition-opacity hover:opacity-70">
                  {content}
                </a>
              ) : (
                <div key={d.label}>{content}</div>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {socials.map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/60 text-fg3 transition-all duration-300 hover:-translate-y-0.5 hover:text-fg"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        {/* right: form */}
        <div className="glass p-8">
          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name">
                <input
                  type="text"
                  name="from_name"
                  required
                  minLength={2}
                  maxLength={40}
                  placeholder="Jane Doe"
                  className="ipt"
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  name="from_email"
                  required
                  placeholder="jane@company.com"
                  className="ipt"
                />
              </Field>
            </div>
            <Field label="Message">
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={800}
                rows={6}
                placeholder="Tell me about the role or idea…"
                className="ipt resize-none"
              />
            </Field>
            <Button type="submit" variant="primary" disabled={sending}>
              {sending ? "Sending…" : "Send message"}
              <HiOutlinePaperAirplane className="h-4 w-4 -rotate-45" />
            </Button>
          </form>
        </div>
      </Reveal>

      <Toaster theme="light" position="bottom-right" richColors closeButton />

      <style jsx>{`
        :global(.ipt) {
          width: 100%;
          border-radius: 0.9rem;
          border: 1px solid rgba(16, 16, 24, 0.1);
          background: rgba(255, 255, 255, 0.7);
          padding: 0.8rem 1rem;
          font-size: 0.9rem;
          color: #18181b;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        :global(.ipt::placeholder) {
          color: #a1a1aa;
        }
        :global(.ipt:focus) {
          border-color: rgba(124, 92, 255, 0.6);
          box-shadow: 0 0 0 3px rgba(124, 92, 255, 0.14);
        }
      `}</style>
    </section>
  );
};

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <label className="flex flex-col gap-2">
    <span className="text-xs uppercase tracking-wider text-fg4">{label}</span>
    {children}
  </label>
);

export default Contact;
