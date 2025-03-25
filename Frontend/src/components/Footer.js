import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>© 2025 قُصاري. جميع الحقوق محفوظة.</p>
        <nav className="footer__nav">
          <ul>
            <li><a href="#">الشروط والأحكام</a></li>
            <li><a href="#">سياسة الخصوصية</a></li>
            <li><a href="#">اتصل بنا</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
export default Footer;