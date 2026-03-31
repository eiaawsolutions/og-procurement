import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import App from "./App";

const mockApiResponse = {
  data: []
};

describe("App navigation and page links", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse
    });
  });

  it("loads all API resources from backend endpoints", async () => {
    render(<App />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(4);
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/tenders");
    expect(global.fetch).toHaveBeenCalledWith("/api/vendors");
    expect(global.fetch).toHaveBeenCalledWith("/api/purchase-orders");
    expect(global.fetch).toHaveBeenCalledWith("/api/hse-incidents");
  });

  it("navigates to every main page from the sidebar", async () => {
    const user = userEvent.setup();
    render(<App />);
    const sidebarNav = screen.getByRole("navigation");

    const pages = [
      { navLabel: /Onboarding/i, heading: "Welcome to EIAAW Procure" },
      { navLabel: /Tenders/i, heading: "Tender Management" },
      { navLabel: "Vendors", heading: "Vendor Management" },
      { navLabel: /HSE/i, heading: "HSE Compliance" },
      { navLabel: "Purchase Orders", heading: "Purchase Orders" },
      { navLabel: /Reverse Auction/i, heading: "Reverse Auction" },
      { navLabel: "Analytics", heading: "Spend Analytics" },
      { navLabel: "AI Tools", heading: "AI Procurement Tools" },
      { navLabel: "Settings", heading: "Settings" }
    ];

    for (const page of pages) {
      await user.click(within(sidebarNav).getByRole("button", { name: page.navLabel }));
      expect(await screen.findByRole("heading", { name: page.heading })).toBeInTheDocument();
    }
  });

  it("redirects dashboard quick links to the intended pages", async () => {
    const user = userEvent.setup();
    render(<App />);

    const tendersHeader = screen.getByRole("heading", { name: "Recent Tenders" });
    await user.click(within(tendersHeader.parentElement).getByRole("button", { name: "View All" }));
    expect(await screen.findByText("Tender Management")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Dashboard" }));

    const hseHeader = screen.getByRole("heading", { name: "HSE Alerts" });
    await user.click(within(hseHeader.parentElement).getByRole("button", { name: "View All" }));
    expect(await screen.findByText("HSE Compliance")).toBeInTheDocument();
  });
});
