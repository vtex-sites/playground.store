import ContactForm from "./ContactForm/ContactForm";
import AlertWithImage from "./sections/AlertWithImage/AlertWithImage";
import CustomIconsAlert from "./sections/CustomIconsAlert/CustomIconsAlert";
import CustomNewsletter from "./sections/CustomNewsletter/CustomNewsletter";
import CustomProductDetails from "./sections/CustomProductDetails/CustomProductDetails";
import CustomProductSEOSection from "./sections/CustomProductSEO/CustomProductSEO";

const sections = {
  CustomIconsAlert,
  AlertWithImage,
  ProductDetails: CustomProductDetails,
  ContactForm,
  CustomNewsletter,
  CustomProductSEOSection,
};

export default sections;
