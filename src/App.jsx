import Header from "./Header";
import Footer from "./Footer";
import UserInfo from "./UserInfo";

import {
  Home,
  Events,
  Products,
  AgroInsights,
  History,
  FunFacts,
  Blog,
  NotFound,
  Login,
  Signup,
  ForgetPassword,
  CreateBlog,
} from "./pages";
import { Route, Routes, Navigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/agro-insights" element={<AgroInsights />} />
          <Route path="/about/history" element={<History />} />
          <Route path="/about/products-and-services" element={<Products />} />
          <Route path="/events" element={<Events />} />
          <Route path="/fun-facts" element={<FunFacts />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/create-blog" element={<CreateBlog />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
