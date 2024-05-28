import { useCallback, useState } from "react";

// We'll create a new section called `ContactForm` that will be place in the landing page called Contact Us
// more instructions about creating new section: refer to https://developers.vtex.com/docs/guides/faststore/building-sections-creating-a-new-section
// more details on how create a new landing page: refer to https://developers.vtex.com/docs/guides/faststore/headless-cms-3-adding-content-types-and-sections

import { gql } from "@faststore/core/api";

// Uses this experimental export to allows you to execute a GraphQL query on demand. Refer to the docs for more information: https://developers.vtex.com/docs/guides/faststore/api-extensions-experimental-features
import { useLazyQuery_unstable as useLazyQuery } from "@faststore/core/experimental";

import {
  InputField as UIInputField,
  Button as UIButton,
  TextArea as UITextArea,
} from "@faststore/ui";

import styles from "./contact-form.module.scss";

export const mutation = gql(`
  mutation SubmitContactForm($data: ContactFormInput!) {
    submitContactForm(input: $data) {
      message
    }
  }
`);

export const ContactForm = () => {
  const [submitContactForm, { data, error }] = useLazyQuery(mutation, {
    data: { name: "", email: "", subject: "", message: "" },
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formValues = {
        name,
        email,
        subject,
        message,
      };

      submitContactForm({ data: formValues });

      // Handle submitting contact form mutation errors
      if (error) {
        console.error(error);
      }

      // Choose what to do when successfuly submitting the form and how to display the success message
      if (data) {
        console.log("Success 🎉 ~ submitContactForm response data: ", data);

        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }
    },
    [submitContactForm]
  );

  return (
    <section className={styles.contactForm}>
      <div>
        <h2>Contact Us</h2>
        <p>
          Need to get in touch with us? Please fill out the form, we'll get in
          touch with you soon.
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <UIInputField
          id="name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <UIInputField
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <UIInputField
          id="subject"
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <UITextArea
          id="message"
          placeholder="Write here your message."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <UIButton type="submit" variant="primary">
          Send
        </UIButton>
      </form>
    </section>
  );
};

export default ContactForm;
