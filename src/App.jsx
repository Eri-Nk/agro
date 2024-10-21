import Header from "./Header";
import Footer from "./Footer";

import {
  Home,
  Events,
  Products,
  AgroInsights,
  History,
  FunFacts,
  BlogComponent,
  NotFound,
  Login,
  Signup,
  ForgetPassword,
  CreateBlog,
} from "./pages";
import { Route, Routes, Navigate } from "react-router-dom";

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
          <Route path="/blogs/blog-component" element={<BlogComponent />} />
          <Route path="/blogs/create-blog" element={<CreateBlog />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<Signup />} />
          <Route path="/user/forgot-password" element={<ForgetPassword />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
