type SubmitContactFormData = {
  input: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  };
};

const contactFormResolver = {
  Mutation: {
    // The resolver to submit the contact form data, fetch only the data you need (https://developers.vtex.com/docs/guides/faststore/api-extensions-overview#best-practices-for-fetching-data)
    submitContactForm: async (_: never, data: SubmitContactFormData) => {
      const { input } = data;

      try {
        const response = await fetch(
          "https://playground.vtexcommercestable.com.br/api/dataentities/ContactForm/documents?_schema=contactForm",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
          }
        );

        if (!response.ok) {
          throw new Error("Error while sending the message");
        }

        return { message: "Your message was sent successfully!" };
      } catch (error) {
        return { message: error };
      }
    },
  },
};

export default contactFormResolver;
