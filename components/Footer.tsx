import { APP_NAME } from "@/lib/constants";
const Footer = () => {
    const currentYear = new Date().getFullYear()
    return ( <footer className="border-t-4">
        <div className="p-5 flex-center">
            {currentYear} {APP_NAME}.All Rigts Reserved
        </div>
    </footer> );
}
 
export default Footer;