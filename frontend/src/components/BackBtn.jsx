import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const BackBtn = () => {
  const { t } = useTranslation();


  return (
  <>
    {/* Create a link that navigates back to the home page ("/") */}
    <Link to="/" className="back-link">
      {/* Render an arrow icon using react-icons */}
      <IoIosArrowDropleftCircle
        className="back-icon"
        ariaLabel="Go Back to all playgrounds"
      />
      {t("BackBtn.back-link")} 
    </Link>
  </>
);
};