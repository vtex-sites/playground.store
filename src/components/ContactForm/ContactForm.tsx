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

export const mutation = gql(`
  mutation SubmitContactForm($data: ContactFormInput!) {
    submitContactForm(input: $data) {
      message
    }
  }
`);

export const ContactForm = () => {
  const [submitContactForm, {}] = useLazyQuery(mutation, {});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = {
        name,
        email,
        subject,
        message,
      };

      console.log(data);

      try {
        await submitContactForm({
          data,
        });
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } catch (error) {
        console.error(error);
      }
    },
    [submitContactForm, name, email, subject, message]
  );

  return (
    <section>
      <form onSubmit={onSubmit}>
        <h2>Contact Us</h2>
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
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <UIButton type="submit">Send</UIButton>
      </form>
    </section>
  );
};

export default ContactForm;