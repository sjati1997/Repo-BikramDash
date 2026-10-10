/**
 * Central source of truth for all organization content.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  CONTENT STATUS
 *  Copy below is the client-approved content for RKS Technology Group.
 *  Contact details marked  TODO(client)  have not been supplied yet; while
 *  they are null the site simply hides them. Fill them in when available.
 * ─────────────────────────────────────────────────────────────────────────
 */

import type { LucideIcon } from "lucide-react"

import type { GeoLocation } from "@/lib/maps"
import {
  Award,
  BrainCircuit,
  BriefcaseBusiness,
  ClipboardCheck,
  Cpu,
  Ear,
  Eye,
  FileText,
  FileUser,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Layers,
  Lightbulb,
  MessagesSquare,
  MonitorCog,
  MonitorPlay,
  PackageCheck,
  Rocket,
  SearchCheck,
  ShieldCheck,
  Target,
  TrendingUp,
  Trophy,
  UsersRound,
} from "lucide-react"

export type NavItem = { label: string; href: `#${string}` }

export type SocialPlatform = "linkedin" | "x" | "facebook" | "instagram" | "youtube"
export type SocialLink = { platform: SocialPlatform; label: string; href: string }

export type IconItem = { icon: LucideIcon; title: string }
export type IconCard = IconItem & { description: string }

export type Service = IconCard & {
  /** Optional call to action shown at the bottom of the card. */
  cta?: { label: string; href: string }
}

export type CompanyFact = { label: string; value: string }

type Address = { lines: readonly string[] }
type OfficeHours = readonly { days: string; hours: string }[]

export const organization = {
  name: "RKS Technology Group",
  legalName: "RKS Technology Group LLC",
  shortName: "RKS",
  tagline: "Building Skills. Creating Opportunities.",
  description:
    "Connecting technology talent with the right opportunities to build careers and drive business growth.",

  contact: {
    website: "https://www.rkstechnologygroup.com",
    // TODO(client): the approved copy listed the website under "Email". Add
    // the real inbox (e.g. info@rkstechnologygroup.com) once confirmed.
    email: null as string | null,
    phone: null as string | null, // TODO(client): actual business number
    address: null as Address | null, // TODO(client): actual business address
    officeHours: null as OfficeHours | null, // TODO(client): business hours
    /**
     * Office coordinates for the Google Map in the Contact section, in decimal
     * degrees. In Google Maps, right-click the office and click the numbers at
     * the top of the menu to copy them. Example:
     *   { latitude: 40.748817, longitude: -73.985428, zoom: 15 }
     * TODO(client): the map is hidden until this is set.
     */
    location: null as GeoLocation | null,
  },

  /** TODO(client): add the company's social profiles, if any. */
  socialLinks: [] as SocialLink[],

  navigation: [
    { label: "About", href: "#about" },
    { label: "What we do", href: "#what-we-do" },
    { label: "Services", href: "#services" },
    { label: "Approach", href: "#approach" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavItem[],

  hero: {
    eyebrow: "Technology consulting & talent solutions",
    headline: "Building Skills. Creating Opportunities.",
    description:
      "Connecting technology talent with the right opportunities to build careers and drive business growth.",
    primaryCta: { label: "Connect With Us", href: "#contact" },
    secondaryCta: { label: "Our Services", href: "#services" },
  },

  whyRks: {
    heading: "Your Next Opportunity Starts Here.",
    description:
      "RKS Technology Group connects organizations with technology professionals while helping candidates discover opportunities aligned with their skills and career goals.",
    label: "Why RKS",
    items: [
      { icon: BriefcaseBusiness, title: "Professional Approach" },
      { icon: Cpu, title: "Technology-Focused Talent" },
      { icon: MessagesSquare, title: "Transparent Communication" },
      { icon: Handshake, title: "Relationship-Driven Service" },
    ] satisfies IconItem[],
  },

  about: {
    eyebrow: "About us",
    heading: "A technology consulting and talent solutions firm.",
    paragraphs: [
      "RKS Technology Group LLC is a technology consulting and talent solutions firm helping organizations and professionals navigate an evolving technology and workforce landscape.",
      "We work with businesses to understand their technology and talent needs and provide practical solutions that align with their goals. Our services span IT consulting, technology solutions, IT staffing, talent solutions, workforce programs, professional development, and career services.",
      "We believe great results begin with understanding people and businesses—not simply providing a service. That is why we take a collaborative approach to every engagement, listening carefully to our clients, understanding their priorities, and working together to identify the right path forward.",
    ],
    companyFacts: [
      { label: "Company", value: "RKS Technology Group LLC" },
      { label: "Focus", value: "Technology consulting & talent solutions" },
      { label: "Website", value: "www.rkstechnologygroup.com" },
    ] satisfies CompanyFact[],
  },

  whatWeDo: {
    eyebrow: "What we do",
    heading: "Solutions for organizations and professionals",
    items: [
      {
        icon: MonitorCog,
        title: "IT Consulting & Technology Solutions",
        description:
          "We help organizations address technology requirements with practical, business-focused solutions designed around their specific needs.",
      },
      {
        icon: UsersRound,
        title: "IT Staffing & Talent Solutions",
        description:
          "We connect organizations with qualified technology professionals whose skills and experience align with their workforce and project requirements.",
      },
      {
        icon: Layers,
        title: "Workforce Solutions",
        description:
          "We provide flexible programs and talent solutions that help organizations respond to changing workforce requirements.",
      },
      {
        icon: GraduationCap,
        title: "Professional Development",
        description:
          "We offer structured learning and development opportunities designed to strengthen technical skills, professional capabilities, and workplace readiness.",
      },
      {
        icon: FileUser,
        title: "Career Services",
        description:
          "We support professionals with career-focused services, including professional resume development, career positioning, and job-search preparation.",
      },
    ] satisfies IconCard[],
  },

  services: {
    eyebrow: "Our services",
    heading: "Services for candidates and professionals",
    items: [
      {
        icon: SearchCheck,
        title: "Full-Time Job Search Assistance",
        description:
          "Personalized support to help job seekers identify relevant opportunities, strengthen their applications, and navigate the full-time job search process with a structured, strategic approach.",
        cta: { label: "Enquire", href: "#contact" },
      },
      {
        icon: MonitorPlay,
        title: "Remote Career Bootcamp",
        description:
          "Practical, instructor-led remote training designed to build job-ready skills, strengthen professional capabilities, and prepare candidates for today’s competitive employment market.",
        cta: { label: "Enquire", href: "#contact" },
      },
      {
        icon: Rocket,
        title: "Independent Internship Programs",
        description:
          "Flexible internship opportunities focused on practical exposure, professional development, and hands-on experience aligned with a candidate’s career goals.",
        cta: { label: "Enquire", href: "#contact" },
      },
      {
        icon: FileText,
        title: "Professional Resume Building",
        description:
          "ATS-optimized resumes and professional career documents designed to effectively present your skills, experience, and qualifications to recruiters and employers.",
        cta: { label: "Enquire", href: "#contact" },
      },
    ] satisfies Service[],
  },

  approach: {
    eyebrow: "Our approach",
    heading: "Listen. Understand. Collaborate. Deliver.",
    steps: [
      { icon: Ear, title: "Listen" },
      { icon: BrainCircuit, title: "Understand" },
      { icon: UsersRound, title: "Collaborate" },
      { icon: PackageCheck, title: "Deliver" },
    ] satisfies IconItem[],
    paragraphs: [
      "Every organization has different goals, challenges, and priorities. We begin by listening and understanding what matters most.",
      "From there, we work collaboratively to develop an appropriate approach, bring together the right expertise and resources, and deliver solutions with professionalism and accountability.",
      "We value clear communication, responsive service, practical solutions, and long-term relationships.",
    ],
  },

  mission: {
    eyebrow: "What guides us",
    heading: "Our vision, mission and values",
    pillars: [
      {
        icon: Eye,
        title: "Our Vision",
        description:
          "To be a trusted technology and talent solutions partner, delivering expertise and innovation that create sustainable business value.",
      },
      {
        icon: Target,
        title: "Our Mission",
        description:
          "To help organizations navigate technology and workforce challenges through strategic expertise, specialized talent, and innovative solutions that deliver measurable and lasting results.",
      },
    ] satisfies IconCard[],
    values: [
      { icon: ShieldCheck, title: "Integrity" },
      { icon: Award, title: "Excellence" },
      { icon: Lightbulb, title: "Innovation" },
      { icon: Trophy, title: "Client Success" },
      { icon: HeartHandshake, title: "Partnership" },
      { icon: ClipboardCheck, title: "Accountability" },
      { icon: TrendingUp, title: "Continuous Improvement" },
    ] satisfies IconItem[],
  },

  commitment: {
    eyebrow: "Our commitment",
    lead: "We believe trust is earned through every interaction.",
    paragraphs: [
      "Our commitment is to conduct business with integrity, transparency, respect, and accountability, while maintaining a high standard of professionalism across everything we do.",
      "We are committed to supporting our clients with dependable solutions and supporting professionals with opportunities to learn, develop, and advance their careers.",
    ],
  },

  relationships: {
    heading: "Building Relationships That Last",
    paragraphs: [
      "At RKS Technology Group, we are focused on more than individual engagements. We aim to build lasting relationships with the organizations and professionals we serve.",
      "By bringing together technology expertise, specialized talent, and professional development, we help create stronger connections between business needs and the capabilities required to meet them.",
    ],
    action: { label: "Connect With Us", href: "#contact" },
  },

  contactSection: {
    eyebrow: "Contact us",
    heading: "Connect With Us",
    description:
      "Whether you're looking for exceptional talent or your next career opportunity, RKS Technology Group is here to help you take the next step.",
    /** Options for "What can we help you with?" in the contact form. */
    topics: [
      "Full-Time Job Search Assistance",
      "Remote Career Bootcamp",
      "Independent Internship Programs",
      "Professional Resume Building",
      "Hiring technology talent",
      "IT consulting & technology solutions",
      "Something else",
    ],
  },
} as const

export type Organization = typeof organization
export type ContactTopic = Organization["contactSection"]["topics"][number]

/** Website address without the protocol, for display. */
export const websiteLabel = organization.contact.website.replace(/^https?:\/\//, "")
