import { useState } from "react";
import Header from "./Header";

import {
  Home,
  About,
  Events,
  Products,
  Contact,
  Location,
  History,
  Gallery,
  Blog,
} from "./pages";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}>
          <Route path="location" element={<Location />} />
          <Route path="history" element={<History />} />
          <Route path="products" element={<Products />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/home" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
