import { useForm } from "react-hook-form";
import ContactSocials from "./ContactSocials";
import { Helmet, HelmetProvider } from "react-helmet-async";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha"; // Comment out the import

function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const formData = useRef();
  // const [captchaToken, setCaptchaToken] = useState(null); // Comment out the state

  const sendEmail = () => {
    // if (!captchaToken) { // Comment out CAPTCHA validation
    //   alert("Please complete the CAPTCHA.");
    //   return;
    // }

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        formData.current,
        import.meta.env.VITE_EMAILJS_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.error(error.text);
        }
      );
    reset();
    // setCaptchaToken(null); // Comment out resetting CAPTCHA token
    alert("Mail Sent😁. Thank you for contacting.");
  };

  // const handleCaptchaChange = (token) => { // Comment out CAPTCHA change handler
  //   setCaptchaToken(token);
  // };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Vidhu Sarwal | Contact</title>
      </Helmet>
      <div className="flex w-full flex-col gap-x-8 gap-y-8 bg-mainBg px-8 pt-5 xl:flex-row xl:divide-x-2 xl:divide-accentColor">
        <div className="xl:w-1/2 ">
          <ContactSocials />
        </div>
        <div className="flex flex-col xl:w-1/2 xl:pl-10">
          <p className="text-3xl text-textColor">Or Fill Out This Form</p>
          <form
            ref={formData}
            className="space-y-4 pt-5 text-textColor"
            onSubmit={handleSubmit(sendEmail)}
          >
            <div className="flex flex-col">
              <label className="text-base font-semibold md:text-lg" htmlFor="from_name">
                Name
              </label>
              <input
                className="input"
                name="from_name"
                type="text"
                id="from_name"
                {...register("from_name", { required: "Name is required" })}
              />
              <p className="error text-sm text-red-600">{errors.from_name?.message}</p>
            </div>
            <div className="flex flex-col">
              <label className="text-base font-semibold md:text-lg" htmlFor="email">
                Email
              </label>
              <input
                className="input"
                type="email"
                id="email"
                name="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Invalid email format",
                  },
                })}
              />
              <p className="error text-sm text-red-600">{errors.email?.message}</p>
            </div>
            <div className="flex flex-col">
              <label className="text-base font-semibold md:text-lg" htmlFor="subject">
                Subject
              </label>
              <input
                className="input"
                type="text"
                name="subject"
                id="subject"
                {...register("subject", { required: "Subject is required" })}
              />
              <p className="error text-sm text-red-600">{errors.subject?.message}</p>
            </div>
            <div className="flex flex-col">
              <label className="text-base font-semibold md:text-lg" htmlFor="message">
                Message
              </label>
              <textarea
                className="w-full bg-articleBg p-2 text-xl focus:border-accentColor focus:outline-none focus:ring-1 focus:ring-accentColor"
                id="message"
                name="message"
                cols="30"
                rows="6"
                {...register("message", {
                  required: "Message is required",
                  validate: (fieldValue) => fieldValue.length > 4 || "Should be at least 5 characters",
                })}
              ></textarea>
              <p className="error text-sm text-red-600">{errors.message?.message}</p>
            </div>
            {/* <ReCAPTCHA
              sitekey={import.meta.env.VITE_SITE_KEY} // Comment out CAPTCHA component
              onChange={handleCaptchaChange}
            /> */}
            <button
              type="submit"
              className="bg-accentColor px-6 py-1 text-lg font-medium text-black"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default Contact;
