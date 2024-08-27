import facebook from "../assets/tabler-icon-brand-facebook.png";
import instagram from "../assets/tabler-icon-brand-instagram.png";
import twitter from "../assets/tabler-icon-brand-x.png";
import linkedin from "../assets/tabler-icon-brand-linkedin.png";

const Socials = () => {
  const socialLinks = [
    {
      icon: facebook,
      url: "https://www.facebook.com/profile.php?id=61557224493444&mibextid=LQQJ4d",
      alt: "facebook",
    },
    {
      icon: instagram,
      url: "https://www.instagram.com/scentreel_?igsh=MXJ2M3F2MGtjNmZ2dA==",
      alt: "instagram",
    },
    {
      icon: twitter,
      url: "https://x.com/scentreel?s=21&t=8jRwTZxPsgEyK-Q062VTrg",
      alt: "twitter",
    },
    {
      icon: linkedin,
      url: "#", // Replace with your LinkedIn URL if available
      alt: "linkedin",
    },
  ];

  return (
    <div>
      <ul className="flex gap-1 sm:gap-5">
        {socialLinks.map((social, index) => (
          <li
            key={index}
            className="h-6 w-6 md:w-10 md:h-10 bg-[#608A7D] rounded-full flex items-center justify-center shadow-2xl shadow-black"
          >
            <a href={social.url} target="_blank" rel="noopener noreferrer">
              <img
                src={social.icon}
                alt={social.alt}
                className="h-[20px] w-[20px] object-cover"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Socials;
