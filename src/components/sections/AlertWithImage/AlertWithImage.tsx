import { useMemo } from "react";
import { AlertSection, getOverriddenSection } from "@faststore/core";

// Image component to display the image (recommended to use this component instead of the native img tag - See Reference)
import { Image_unstable as Image } from "@faststore/core/experimental";

import styles from "./alert-with-image.module.scss";

interface AlertWithImageProps
  extends Omit<React.ComponentProps<typeof AlertSection>, "icon"> {
  src: string;
  alt: string;
}

/**
 * This is an Alert Section override that contains an Image.
 *
 * We'll change the CMS schema to add the src option and remove the icon option. (Changes added to sections.json)
 * Overrides the Icon option and passes down the other props
 *
 * It's memoized to avoid being re-created every time the AlertWithImage component is re-rendered
 */

export default function AlertWithImage(props: AlertWithImageProps) {
  const { src, alt, ...otherProps } = props;

  const OverriddenAlert = useMemo(
    () =>
      getOverriddenSection({
        Section: AlertSection,
        className: styles.alertWithImage,
        components: {
          Icon: {
            Component: () => (
              <Image src={props.src} alt={props.alt} width={24} height={24} />
            ),
          },
        },
      }),
    []
  );

  return <OverriddenAlert {...otherProps} icon="" />;
}
