<p align="center">
  <a href="https://developers.vtex.com/docs/guides/faststore/getting-started-overview">
    <img alt="Faststore" src="logo.png" width="60" />
  </a>
</p>
<h1 align="center">
  FastStore Playground
</h1>

This project serves as a compilation of examples that highlight the fundamental features of our framework. It is designed to complement our [official documentation](https://developers.vtex.com/docs/guides/faststore/docs-what-is-faststore), providing users with practical demonstrations of how to leverage from FastStore framework.

Here you'll find examples of the following features:

- 👉 [Section Override V2](#1-section-override-v2)
  - [Adding icon options to the Alert component](#adding-icon-options-to-the-alert-component)
  - [Adding an image to your Alert component](#adding-an-image-to-your-alert-component)
- 👉 [API Extensions](#2-api-extensions)
  - [Adding Installment Information in the Product Details Page](#adding-installment-information-in-the-product-details-page)
  - [Adding a contact form to a landing page](#adding-a-contact-form-to-a-landing-page)

## 👩‍🏫 How to use this repository

The repository contains folders/files with code [examples](#-examples) for the features mentioned above.

**Follow Along with Documentation**:
As you run the examples, refer to the documentation to understand the concepts and implementation details of each part of the code. The documentation will guide you through the expected output and any configurations needed.

**Experiment and Modify**: Feel free to experiment with the code examples by making modifications. This will help you gain a deeper understanding of how each feature works.

Clone the repository in your local machine and start exploring:

1. Clone the repository to your local machine:

```
git clone https://github.com/vtex-sites/playground.store.git
```

2. Navigate to the repository directory:

```
cd playground.store
```

3. Install the necessary dependencies:

```
yarn install
```

4. Run the application:

```
yarn dev
```

## 🛠 Examples

### [1. Section Override V2 ](https://developers.vtex.com/docs/guides/faststore/override-use-cases-overview)

Overrides allow you to replace native components within sections with custom ones. This maintains the core functionalities of native components while allowing you to adjust their appearance and behavior to suit the needs of your store.

#### Adding more icon options to the Alert component

This example illustrates a common use case for `getOverriddenSection` in FastStore. It focuses on customizing the Headless CMS schema for a section to provide more icon options.

Add more icon options to the `Alert`, allowing editors to choose from a wider selection of icons supported by the `@faststore/ui` [iconography](https://developers.vtex.com/docs/guides/faststore/reference-icons#usage) library.

- [📑 Documentation Reference - step by step guide](https://developers.vtex.com/docs/guides/faststore/override-use-cases-adding-more-icon-options-to-the-alert-component)
- [➡️ Code Example]()

#### Adding an image to your Alert component

The native Alert section provides an icon prop for customization. It only accepts predefined icons, but you want more control and flexibility over the displayed content. In this example, we'll display a custom image instead.

- [📑 Documentation Reference - step by step guide](https://developers.vtex.com/docs/guides/faststore/override-use-cases-adding-an-image-to-the-alert-component)
- [➡️ Code Example]()

### [2. API Extensions](https://developers.vtex.com/docs/guides/faststore/api-extensions-overview)

If you need to retrieve data not natively provided by the FastStore API, you can achieve this by extending the FastStore API schema and incorporating new data into the existing queries.

#### Adding Installment Information in the Product Details Page

This example illustrates the case where customers can see installment details (number, value, payment system) directly on the product page.

- [📑 Documentation Reference - step by step guide](https://developers.vtex.com/docs/guides/faststore/api-extensions-use-cases-adding-installment-information-in-the-product-details-page)
- [➡️ Code Example]()

#### Adding a contact form to a landing page

This example illustrates how to handle data from a Contact Us form and send it to a third-party API. We will create a Contact Us page with a Contact form.

- [📑 Documentation Reference - step by step guide](https://developers.vtex.com/docs/guides/faststore/api-extensions-use-cases-adding-a-contact-form-to-a-landing-page)
- [➡️ Code Example]()

## 🏷️ Naming Conventions in this Project

In this project, we'll be using the following naming conventions:

- Stylesheet file names: kebab-case, e.g., `custom-button.module.scss`
- Component files and Component exports: PascalCase, e.g., `CustomButton.tsx` and `CustomButton`
- Function exports: camelCase, e.g., `getCustomsButtonVariants`
- Constants: snake_case, e.g., `BUTTON_VARIANTS`

## 📚 Resources

- [FastStore Docs](https://developers.vtex.com/docs/guides/faststore)
- [FastStore Github](https://github.com/vtex/faststore)
