import React from "react";
import LinksGroup from "./LinksGroup";

// icons
import {
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconNews,
  IconNotification,
  IconPresentationAnalytics,
  IconWorld
} from "@tabler/icons-react";

const data = [
  { label: "News & Updates", icon: IconNews, link: "/news-and-updates" },
  { label: "Notifications", icon: IconNotification, link: "/notifications" },
  { label: "Dashboard", icon: IconGauge, link: "/dashboard" },
  {
    label: "Apply New Visa",
    icon: IconWorld,
    initiallyOpened: true,
    group: [
      { label: "Visa", link: "/new-visa" },
      { label: "Track Visa", link: "/track-visa" },
    ],
  },
  {
    label: "Visa Offer Config",
    icon: IconCalendarStats,
    group: [
      { label: "Visa Offers", link: "/visa-offers" },
      { label: "Document Rule Engine", link: "/document-rule-engine" },
    ],
  },
  { label: "Analytics", icon: IconPresentationAnalytics, link: "/analytics" },
  { label: "Contracts", icon: IconFileAnalytics, link: "/contracts" },
  { label: "Settings", icon: IconAdjustments, link: "/settings" },
  {
    label: "Security",
    icon: IconLock,
    group: [
      { label: "Enable 2FA", link: "/2fa-security" },
      { label: "Change password", link: "/change-password" },
      { label: "Recovery codes", link: "/recovery-codes" },
    ],
  },
];

function MainLinks() {
  const links = data.map((link) => <LinksGroup {...link} key={link.label} />);
  return <div>{links}</div>;
}

export default MainLinks;

