const Footer = (props) => (
  <div className={`absolute w-full bottom-0 ${!props.nonbgcolored ? "bg-blue-unisec" : null} text-white`}>
    <div className="container mx-auto px-20 py-10">
      CopyRight © UNISEC Thailand, All Rights Reserved.
    </div>
  </div>
);

export default Footer;