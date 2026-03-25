import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import AccountsPage from "./pages/AccountsPage";
import VendorsPage from "./pages/VendorsPage";
import VendorFormPage from "./pages/VendorFormPage";
import CustomersPage from "./pages/CustomersPage";
import CustomerFormPage from "./pages/CustomerFormPage";
import VendorInvoicesPage from "./pages/VendorInvoicesPage";
import VendorInvoiceFormPage from "./pages/VendorInvoiceFormPage";
import CustomerInvoicesPage from "./pages/CustomerInvoicesPage";
import CustomerInvoiceFormPage from "./pages/CustomerInvoiceFormPage";
import PaymentsPage from "./pages/PaymentsPage";
import ReceiptsPage from "./pages/ReceiptsPage";
import BankPage from "./pages/BankPage";
import JournalEntriesPage from "./pages/JournalEntriesPage";
import StubPage from "./pages/StubPage";

export const router = createBrowserRouter([
  { path: "/landing", element: <LandingPage /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "accounts", element: <AccountsPage /> },
      { path: "vendors", element: <VendorsPage /> },
      { path: "vendors/new", element: <VendorFormPage /> },
      { path: "customers", element: <CustomersPage /> },
      { path: "customers/new", element: <CustomerFormPage /> },
      { path: "vendor-invoices", element: <VendorInvoicesPage /> },
      { path: "vendor-invoices/new", element: <VendorInvoiceFormPage /> },
      { path: "customer-invoices", element: <CustomerInvoicesPage /> },
      { path: "customer-invoices/new", element: <CustomerInvoiceFormPage /> },
      { path: "payments", element: <PaymentsPage /> },
      { path: "receipts", element: <ReceiptsPage /> },
      { path: "bank", element: <BankPage /> },
      { path: "journal-entries", element: <JournalEntriesPage /> },
      
      // Stub pages for "Nice to Mock" scope
      { path: "job-orders", element: <StubPage title="Job Orders" description="Job Order management module coming soon." /> },
      { path: "equipment", element: <StubPage title="Equipment" description="Equipment tracking and maintenance module coming soon." /> },
      { path: "reports", element: <StubPage title="Financial Reports" description="Trial Balance, P&L, and Balance Sheet generation coming soon." /> },
      
      { path: "*", element: <Navigate to="/" replace /> }
    ]
  }
]);
