import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5" style={{ fontSize: '1.2rem' }}>
        <h1 className="text-center mb-4" style={{ fontSize: '2rem' }}><strong>Privacy Policy for Spardhaweb</strong></h1>
        <p><strong>Welcome to Spardhaweb!</strong></p>
        <p>At Spardhaweb, accessible from spardhaweb.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that are collected and recorded by Spardhaweb and how we use it.</p>
        <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to <Link to="/contact-us">contact us</Link>. Our Privacy Policy was created with the help of the <a href="https://www.generateprivacypolicy.com/">Privacy Policy Generator</a>.</p>
        <h2 className="mt-5"><strong>Log Files</strong></h2>
        <p>Spardhaweb follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>
        <h2 className="mt-5"><strong>Cookies and Web Beacons</strong></h2>
        <p>Like any other website, Spardhaweb uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
        <h2 className="mt-5"><strong>Google DoubleClick DART Cookie</strong></h2>
        <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</a></p>
        <h2 className="mt-5"><strong>Our Advertising Partners</strong></h2>
        <p>Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.</p>
        <ul>
          <li>
            <p>Google</p>
            <p><a href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</a></p>
          </li>
        </ul>
        <h2 className="mt-5"><strong>Privacy Policies</strong></h2>
        <p>You may consult this list to find the Privacy Policy for each of the advertising partners of Spardhaweb.</p>
        <p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Spardhaweb, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
        <p>Note that Spardhaweb has no access to or control over these cookies that are used by third-party advertisers.</p>
        <h2 className="mt-5"><strong>Third Party Privacy Policies</strong></h2>
        <p>Spardhaweb's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.</p>
        <p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites. What Are Cookies?</p>
        <h2 className="mt-5"><strong>Children's Information</strong></h2>
        <p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
        <p>Spardhaweb does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
        <h2 className="mt-5"><strong>Online Privacy Policy Only</strong></h2>
        <p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Spardhaweb. This policy is not applicable to any information collected offline or via channels other than this website.</p>
        <h2 className="mt-5"><strong>Consent</strong></h2>
        <p>By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>
        <p>you can contact us by our contact us form. Go to <Link to="/contact-us">CONTACT US</Link></p>
        <p>“Thanks for visiting our Privacy Policy Page”</p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
