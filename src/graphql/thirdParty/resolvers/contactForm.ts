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
    submitContactForm: async (_: never, data: SubmitContactFormData) => {
      const { input } = data;

      try {
        const response = await fetch(
          "https://playground.vtexcommercestable.com.br/api/dataentities/ContactForm/documents",
          {
            method: "POST",
            body: JSON.stringify(input),
          }
        );

        if (!response.ok) {
          throw new Error("Error while sending the message");
        }

        return {
          message: "Your message was sent successfully!",
        };
      } catch (error) {
        return {
          message: error,
        };
      }
    },
  },
};

export default contactFormResolver;
