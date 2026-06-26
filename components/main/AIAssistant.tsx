"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Toaster, toast } from "sonner";
import SectionHeading from "@/components/ui/SectionHeading";
import { SparkleIcon, CheckIcon } from "@/components/ui/icons/AnimatedIcons";
import { AIInputWithLoading } from "@/components/ui/ai-input-with-loading";

type Msg = { role: "user" | "ai"; text: string };
type Step = "message" | "name" | "phone" | "done";

const GREETING =
  "Hi, I'm Vishwam's AI assistant. Tell me what you'd like to reach out about and I'll pass it straight to him.";

const QUICK = [
  "I'd like to hire you.",
  "Let's collaborate on a project.",
  "I have a quick question.",
];

const PLACEHOLDER: Record<Step, string> = {
  message: "Enter your message",
  name: "Your name",
  phone: "Your phone number",
  done: "Message sent",
};

const HINT: Record<Step, string> = {
  message: "Type your message and press Enter",
  name: "Just your name is fine",
  phone: "So Vishwam can reach you back",
  done: "Thanks for reaching out!",
};

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const AIAssistant = () => {
  const [messages, setMessages] = useState<Msg[]>([{ role: "ai", text: GREETING }]);
  const [step, setStep] = useState<Step>("message");
  const [typing, setTyping] = useState(false);
  const lead = useRef<{ message: string; name: string; phone: string }>({
    message: "",
    name: "",
    phone: "",
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  // Type an AI reply with a typewriter effect, resolve when done.
  const sayAI = (full: string) =>
    new Promise<void>((resolve) => {
      setTyping(true);
      setMessages((m) => [...m, { role: "ai", text: "" }]);
      let i = 0;
      const id = window.setInterval(() => {
        i += 2;
        setMessages((m) => {
          const next = [...m];
          next[next.length - 1] = { role: "ai", text: full.slice(0, i) };
          return next;
        });
        if (i >= full.length) {
          window.clearInterval(id);
          setMessages((m) => {
            const next = [...m];
            next[next.length - 1] = { role: "ai", text: full };
            return next;
          });
          setTyping(false);
          resolve();
        }
      }, 16);
    });

  const sendLead = async () => {
    try {
      await emailjs.send(
        "service_2svnepu",
        "template_vmeyoep",
        {
          from_name: lead.current.name,
          from_email: lead.current.phone,
          message: `${lead.current.message}\n\nName: ${lead.current.name}\nPhone: ${lead.current.phone}`,
        },
        "N27zaoCMdknIVor8g"
      );
      toast.success("Message sent to Vishwam!");
    } catch {
      toast.error("Couldn't send. Please email vishwamshah007@gmail.com directly.");
    }
  };

  const handle = async (raw: string) => {
    const value = raw.trim();
    if (!value || typing || step === "done") return;

    setMessages((m) => [...m, { role: "user", text: value }]);
    await delay(450);

    if (step === "message") {
      lead.current.message = value;
      await sayAI("Got it. What's your name?");
      setStep("name");
      return;
    }

    if (step === "name") {
      lead.current.name = value;
      await sayAI(`Thanks, ${value.split(" ")[0]}. And your phone number?`);
      setStep("phone");
      return;
    }

    if (step === "phone") {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 7) {
        await sayAI("That doesn't look quite right. Mind sharing a valid phone number?");
        return;
      }
      lead.current.phone = value;
      setStep("done");
      await sayAI(
        `Perfect, ${lead.current.name.split(" ")[0]}. I've sent your message to Vishwam and he'll reach out soon. Thanks for stopping by!`
      );
      await sendLead();
    }
  };

  return (
    <section id="ai" className="mx-auto w-full max-w-3xl px-5 py-16 sm:py-24">
      <SectionHeading
        reveal="tilt"
        eyebrow="AI Playground"
        title={
          <>
            Talk to my <span className="text-gradient-aurora">AI assistant</span>
          </>
        }
        subtitle="Drop a quick message and it'll guide you through reaching me, then deliver it straight to my inbox."
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mt-12 overflow-hidden rounded-[1.7rem] p-[2px] shadow-soft"
      >
        {/* travelling line around the card (masked to the border band) */}
        <span className="moving-ring">
          <span className="absolute inset-[-150%] animate-border-spin bg-[conic-gradient(from_0deg,transparent_0deg,transparent_236deg,var(--color-aurora-violet)_290deg,var(--color-aurora-blue)_320deg,var(--color-aurora-teal)_348deg,transparent_360deg)]" />
        </span>

        <div className="glass relative z-10 overflow-hidden p-0">
        {/* header */}
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-linear-to-br from-aurora-violet to-aurora-teal text-white shadow-glow">
            <SparkleIcon size={18} active={typing} />
          </span>
          <div>
            <div className="text-sm font-semibold text-fg">Vishwam AI</div>
            <div className="flex items-center gap-1.5 text-xs text-fg4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {typing ? "typing..." : "online"}
            </div>
          </div>
          {step === "done" && (
            <span className="ml-auto grid h-7 w-7 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
              <CheckIcon size={15} />
            </span>
          )}
        </div>

        {/* transcript */}
        <div
          ref={scrollRef}
          className="flex h-[300px] flex-col gap-3 overflow-y-auto px-5 py-5 scrollbar-hidden"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-ink text-white"
                    : "border border-line bg-white/70 text-fg2"
                }`}
              >
                {m.text}
                {m.role === "ai" && typing && i === messages.length - 1 && (
                  <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-blink bg-aurora-violet" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* quick-start chips (only on the first step) */}
        <AnimatePresence>
          {step === "message" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2 px-5 pb-1"
            >
              {QUICK.map((q) => (
                <motion.button
                  key={q}
                  type="button"
                  onClick={() => handle(q)}
                  whileTap={{ scale: 0.96 }}
                  disabled={typing}
                  className="rounded-full border border-line bg-white/60 px-3 py-1.5 text-xs text-fg3 transition-colors hover:border-aurora-violet/40 hover:text-fg disabled:opacity-50"
                >
                  {q}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* input */}
        <div className="border-t border-line px-4 pb-2 pt-1">
          <AIInputWithLoading
            key={step}
            placeholder={PLACEHOLDER[step]}
            hint={HINT[step]}
            minHeight={52}
            maxHeight={140}
            loadingDuration={600}
            onSubmit={handle}
            disabled={step === "done" || typing}
          />
        </div>
        </div>
      </motion.div>

      <Toaster theme="light" position="bottom-right" richColors closeButton />
    </section>
  );
};

export default AIAssistant;
