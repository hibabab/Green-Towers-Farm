import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import { useEffect } from "react";

import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import SideBar from "./components/sideBarAdmin/sideBarAdmin";
import OrderForm from "./pages/Cart/OrderForm";
import CommandeManagement from "./pages/CommandeManagement/CommandeManagement";
import AdminDashboard from './pages/admin/AdminDashboard';

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Contact from "./pages/Contact/Contact";
import Formation from "./pages/Formation/Formation";
import FormationDetails from "./pages/FormationDetails/FormationDetails";
import Cart from "./pages/Cart/Cart";

import ProductDetails from "./pages/ProductDetails/ProductDetails";


import ProductManagemnt from "./pages/ProductManagemnt/ProductManagement";
import ProductDetailsadmin from "./pages/ProductDetailsAdmin/ProductDetailsadmin";
import ClientManagement from "./pages/ClientMangaemnt/ClientManagemnt";

/* ================= Layouts ================= */
const Layout = () => (
  <div>
    <Header />
    <ScrollRestoration />
    <Outlet />
    <Footer />
    <FooterBottom />
  </div>
);

const AdminLayout = () => (
  <div className="flex">
    <SideBar />
    <main className="flex-1 p-4 sm:ml-64 mt-8">
      <Outlet />
    </main>
  </div>
);

/* ================= Router ================= */
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* ===== Layout public ===== */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="contact" element={<Contact />} />
        <Route path="formation" element={<Formation />} />
        <Route path="formationdetails" element={<FormationDetails />} />
        <Route path="cart" element={<Cart />} />
        
      <Route path="order" element={<OrderForm />} />
        <Route path="product/:nom" element={<ProductDetails />} />
      </Route>

      {/* ===== Layout admin ===== */}
        <Route path="/admin" element={<AdminLayout />}>
        {/* index means this route matches /admin exactly */}
        <Route index element={<AdminDashboard />} />
        <Route path="product" element={<ProductManagemnt />} />
        <Route path="commandes" element={<CommandeManagement />} />
        <Route path="product/:nom" element={<ProductDetailsadmin />} />
        <Route path="client" element={<ClientManagement />} />
      </Route>
    </Route>
  )
);

/* ================= Favicon ================= */
const changeFavicon = (src) => {
  document.querySelectorAll('link[rel*="icon"]').forEach(link => link.remove());
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/x-icon';
  link.href = src;
  document.head.appendChild(link);
  setTimeout(() => {
    link.href = src + '?v=' + new Date().getTime();
  }, 100);
};

/* ================= App ================= */
function App() {
  useEffect(() => {
    document.title = "Green Tower Farm";
    changeFavicon('https://img.icons8.com/color/48/leaf.png');
  }, []);

  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;