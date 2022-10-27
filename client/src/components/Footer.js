import { useState } from 'react';
import '../assets/css/Footer.css'

// const [nowyear, setNowyear] = useState(thisYear);

// const thisYear = document.querySelector(setNowyear)
// thisYear.textContent = new Date().getFullYear();

function Footer() {
    return (
      <div className="footer">
        <div className="inner">
          <div className="devInfo">
            <span className="copyright">Developed by</span>
            <span><a href="mailto:jongdae94@naver.com">서종대</a></span>
            <span><a href="mailto:kyum0401@gmail.com">김윤겸</a></span>
            <span><a href="mailto:yuuuj72@gmail.com">홍유진</a></span>
          </div>
          <p className="copyright">
            Copyright &copy; 2022 
            {/* <span className="this-year">{nowyear}</span>  */}
            <strong> JDEX.</strong> All Rights Reserved.
          </p>
          {/* <img src="./images/starbucks_logo_only_text.png" alt="" class="logo" /> */}
        </div>
      </div>
    );
}
  
export default Footer;