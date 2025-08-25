import type {
  ToastProps,
  NewsletterAddendumProps as UINewsletterAddendumProps,
  NewsletterHeaderProps as UINewsletterHeaderProps,
  NewsletterProps as UINewsletterProps,
} from "@faststore/ui";
import { useUI } from "@faststore/ui";
import styles from "./section.module.scss";

import {
  Button,
  Icon,
  InputField,
  Newsletter,
  NewsletterAddendum,
  NewsletterContent,
  NewsletterForm,
  NewsletterHeader,
} from "@faststore/ui";

import { Section } from "@faststore/core";
import { useNewsletter_unstable as useNewsletter } from "@faststore/core/experimental";
import { type FormEvent, useRef } from "react";

// Refer to the analytics module docs for more information: https://developers.vtex.com/docs/guides/faststore/analytics-overview

import { sendAnalyticsEvent, useAnalyticsEvent } from "@faststore/sdk";

interface ArbitraryEvent {
  name: string;
  params: Record<string, any>;
}

type SubscribeMessage = {
  icon: string;
  title: string;
  message: string;
};

export interface NewsletterProps {
  /**
   * Title for the section.
   */
  title: UINewsletterHeaderProps["title"];
  /**
   * The card Variant
   */
  card?: UINewsletterProps["card"];
  /**
   * Specifies the component's color variant combination.
   */
  colorVariant?: UINewsletterProps["colorVariant"];
  /**
   * A description for the section.
   */
  description?: UINewsletterHeaderProps["description"];
  /**
   * The Privacy Policy disclaimer.
   */
  privacyPolicy?: UINewsletterAddendumProps["addendum"];
  /**
   * The email input label.
   */
  emailInputLabel?: string;
  /**
   * The name input visibility.
   */
  displayNameInput?: boolean;
  /**
   * Icon for the section.
   */
  icon: {
    alt: string;
    icon: string;
  };
  /**
   * The name input label.
   */
  nameInputLabel?: string;
  /**
   * The subscribe button label.
   */
  subscribeButtonLabel?: string;
  /**
   * The subscribe button loading label.
   */
  subscribeButtonLoadingLabel?: string;
  /**
   * Toast attributes for successful subscriptions.
   */
  toastSubscribe?: SubscribeMessage;
  /**
   * Toast attributes for unsuccessful subscriptions.
   */
  toastSubscribeError?: SubscribeMessage;
}

export const AnalyticsHandler = () => {
  useAnalyticsEvent((event) => {
    console.log("Received event", event);
  });

  /* ... */

  return null;
};

function CustomNewsletter({
  icon: { icon, alt: iconAlt },
  title,
  description,
  privacyPolicy,
  emailInputLabel,
  displayNameInput,
  nameInputLabel,
  subscribeButtonLabel,
  subscribeButtonLoadingLabel,
  card,
  toastSubscribe,
  toastSubscribeError,
  colorVariant,
  ...otherProps
}: NewsletterProps) {
  const { pushToast } = useUI();
  const { subscribeUser, loading } = useNewsletter();

  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      // send event start
      sendAnalyticsEvent<ArbitraryEvent>({
        name: "Submit Newsletter",
        params: { test: true },
      });

      const data = await subscribeUser({
        data: {
          name: nameInputRef.current?.value ?? "",
          email: emailInputRef.current?.value ?? "",
        },
      });

      if (data?.subscribeToNewsletter?.id) {
        // send event start
        sendAnalyticsEvent<ArbitraryEvent>({
          name: "Submit newsletter success",
          params: { test: true },
        });

        pushToast({
          ...toastSubscribe,
          status: "INFO",
          icon: (
            <Icon width={30} height={30} name={toastSubscribe?.icon ?? ""} />
          ),
        } as ToastProps);

        formRef?.current?.reset();
      }
    } catch (error) {
      pushToast({
        ...toastSubscribeError,
        status: "ERROR",
        icon: (
          <Icon width={30} height={30} name={toastSubscribeError?.icon ?? ""} />
        ),
      } as ToastProps);
    }
  };

  return (
    <Section className={`${styles.section} section-newsletter layout__section`}>
      <AnalyticsHandler />
      <Newsletter card={card ?? false} colorVariant={colorVariant}>
        <NewsletterForm ref={formRef} onSubmit={onSubmit}>
          <NewsletterHeader
            title={title}
            description={description}
            icon={
              <Icon width={32} height={32} name={icon} aria-label={iconAlt} />
            }
          />

          <NewsletterContent>
            {displayNameInput && (
              <InputField
                id="newsletter-name"
                required
                label={nameInputLabel ?? "Name"}
                inputRef={nameInputRef}
              />
            )}
            <InputField
              id="newsletter-email"
              type="email"
              required
              label={emailInputLabel ?? "Email"}
              inputRef={emailInputRef}
            />
            <NewsletterAddendum addendum={privacyPolicy} />
            <Button variant="secondary" inverse type="submit">
              {loading ? subscribeButtonLoadingLabel : subscribeButtonLabel}
            </Button>
          </NewsletterContent>
        </NewsletterForm>
      </Newsletter>
    </Section>
  );
}

export default CustomNewsletter;
