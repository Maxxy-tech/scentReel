import facebook from "../assets/tabler-icon-brand-facebook.png";
import instagram from "../assets/tabler-icon-brand-instagram.png";
import twitter from "../assets/tabler-icon-brand-x.png";
import linkedin from "../assets/tabler-icon-brand-linkedin.png";

const  Socials=()=>{
    return (
      <div>
        <ul className="flex gap-1 sm:gap-5">
          {[facebook, instagram, twitter, linkedin].map((icon, index) => (
            <li
              key={index}
              className="h-6 w-6 md:w-10 md:h-10 bg-[#608A7D]  rounded-full flex items-center justify-center shadow-2xl shadow-black"
            >
              <img
                src={icon}
                alt={icon.split("/").pop().split(".")[0]} // Extract the name from the file path
                className="h-[20px] w-[20px] object-cover"
              />
            </li>
          ))}
        </ul>

      </div>
    );
}

export default Socials