import React from "react";

type AnyIconType = {
  iconSrc: string;
  iconWidth?: number | undefined;
  iconHeight?: number | undefined;
  className?: string;
  footer?:string;
};

const AnyIcon = ({
  iconSrc,
  iconWidth,
  iconHeight,
  className,
  footer
}: AnyIconType) => {

  const styleIcon = {
    width: `${iconWidth}px`,
    height: `${iconHeight}px`,
  };

  const styleFooter={
    margin:'0',
    // textAlign:'center',
    fontSize:'12px'

  }
  // width:{iconWidth},
  // height:{iconHeight}

  return (
    <>
    <img src={iconSrc} style={styleIcon} className={className} />
    {
      footer?<p style={styleFooter}>{footer}</p>:null
    }
    
    </>
  );
};

export default AnyIcon;
