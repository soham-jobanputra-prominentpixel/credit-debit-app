import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./main/store.ts";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout.tsx";
import SignupForm from "./components/forms/SignUpForm.tsx";
import LoginForm from "./components/forms/LoginForm.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import UsersPage from "./pages/UsersPage.tsx";
import EditUserPage from "./pages/EditUserPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <BrowserRouter basename="credi-debit-app">
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<SignupForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/edit/:userId" element={<EditUserPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<Dashboard />} />
                  <Route path="/users" element={<UsersPage />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
