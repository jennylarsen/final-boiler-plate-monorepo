/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosGlobe } from "react-icons/io";
import Select from "react-dropdown-select";
import "./translations.css"

// export const Translations = () => {
//   const { i18n } = useTranslation();
//   const [showDropdown, setShowDropdown] = useState(false);

//   const changeLanguage = (language) => {
//     i18n.changeLanguage(language);
//     setShowDropdown(false); // Hide the dropdown after selecting a language
//   };

//   const languageOptions = [
//     // { value: "", label: "🌐", disabled: true },
//     { value: "en", label: "English" },
//     { value: "sv", label: "Swedish" },
//   ];

//   // Custom styles for the dropdown, funkar inte
//   const dropdownStyles = {
//     control: (base) => ({
//       ...base,
//       backgroundColor: "grey",
//     }),
//   };

//   return (
//     <div className="translation-buttons">
//       {/* <div className="globe-icon" onClick={() => setShowDropdown(!showDropdown)}>
//         <IoIosGlobe color="white" style={{ fontSize: '30px' }} />
//       </div> */}
//       {/* {showDropdown && (
//         <Select
//           options={languageOptions}
//           values={[
//             {
//               value: i18n.language,
//               label: i18n.language === "en" ? "English" : "Swedish",
//             },
//           ]}
//           onChange={(values) => changeLanguage(values[0].value)}
//           labelField="label"
//           valueField="value"
//           dropdownHandle={false}
//           direction="ltr"
//           styles={dropdownStyles} // Apply custom styles
//           open // Make the dropdown open by default
//         />
//       )} */}
//       <Select
//         className="select"
//         options={languageOptions}
//         values={[
//           {
//             value: i18n.language,
//             label: i18n.language === "en" ? "English" : "Swedish",
//           },
//         ]}
//         onChange={(values) => changeLanguage(values[0].value)}
//         labelField="label"
//         valueField="value"
//         placeholder=""
//         dropdownHandle={false}
//         direction="ltr"
//         styles={dropdownStyles} // Apply custom styles
//         open // Make the dropdown open by default
//       />

//       <select name="" id="">
//         <option value={() => changeLanguage}></option>
//       </select>
//     </div>
//   );
// };



export const Translations = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="translation-container">
      <label htmlFor="languageDropdown">
        
      </label>
      <select
        id="languageDropdown"
        className="translate-dropdown"
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
      >
        <option value="" disabled defaultValue>🌐 Select language</option>
        <option value="en">🌐  English</option>
        <option value="sv">🌐  Svenska</option>
      </select>
    </div>
  );
};
