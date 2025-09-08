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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<SignupForm />} />
              <Route path="/login" element={<LoginForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
