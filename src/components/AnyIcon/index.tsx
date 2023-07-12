import React from "react";

type AnyIconType = {
  iconSrc: string;
  iconWidth?: number | undefined;
  iconHeight?: number | undefined;
  className?: string;
};

const AnyIcon = ({
  iconSrc,
  iconWidth,
  iconHeight,
  className,
}: AnyIconType) => {
  const styleIcon = {
    width: `${iconWidth}px`,
    height: `${iconHeight}px`,
  };
  // width:{iconWidth},
  // height:{iconHeight}

  return <img src={iconSrc} style={styleIcon} className={className} />;
};

export default AnyIcon;
