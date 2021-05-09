import Navbar from '../components/navbar';
import CartProvider from '../context/cart';
import AuthProvider from '../context/auth';

const Layout = ({ children }) => {
    return (
        <AuthProvider>
            <CartProvider>
                <Navbar>
                    {children}
                </Navbar>
            </CartProvider>
        </AuthProvider>
    );
}
 
export default Layout;