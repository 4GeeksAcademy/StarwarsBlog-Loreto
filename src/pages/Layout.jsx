import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import Navbar from "../components/Navbar"
import { Footer } from "../components/Footer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        <ScrollToTop>
            <div className="bg-dark text-light min-vh-100 d-flex flex-column" data-bs-theme="dark">
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </ScrollToTop>
    )
}