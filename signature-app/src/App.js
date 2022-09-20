import React, { useState, useEffect } from "react";
import copy from "copy-html-to-clipboard";

import "./App.css";
import {
  FusionInput,
  FusionButton,
  FusionDropdown,
} from "@ironsource/fusion-ui/react";

function App() {
  //Mapping all the social media links of each "companyName"
  const socialURLsMap = {
    IronSource: {
      a: "https://is.com/",
      fb: "https://www.facebook.com/ironSource",
      tw: "https://twitter.com/ironSource",
      ld: "https://www.linkedin.com/company/ironsource/",
      linkText: "is.com",
    },
    SuperSonic: {
      a: "https://supersonic.com/",
      fb: "https://www.facebook.com/studiossupersonic",
      tw: "https://twitter.com/playsupersonic",
      ld: "https://www.linkedin.com/company/supersonic-studios/",
      linkText: "supersonic.com",
    },
    Luna: {
      a: "https://luna.is.com/",
      fb: "https://www.facebook.com/ironSource-Luna-107933925237960",
      tw: "https://twitter.com/ironsourceluna",
      ld: "https://www.linkedin.com/company/luna-labs-ltd/",
      linkText: "luna.is.com",
    },
    Aura: {
      a: "https://www.is.com/aura/",
      fb: "https://www.facebook.com/ironSource",
      tw: "https://twitter.com/ironSource",
      ld: "https://www.linkedin.com/showcase/ironsource-aura/",
      linkText: "is.com/aura",
    },
  };

  // Default Full Name  and Title parameters.
  const defaultFirstName = "Ryan Reynolds";
  const defaultTitle = "Deadpool";

  //Default IronSource Comapny Logo.
  const defaultCompanyIconUrl =
    "https://s3.amazonaws.com/img.ironsrc/img/logos/logo-is.png";

  // Default Socoal media icons - FB, TW, and LD.
  const twitterIcon = "https://s3.amazonaws.com/img.ironsrc/img/twitter.png";
  const facebookIcon = "https://s3.amazonaws.com/img.ironsrc/img/facebook.png";
  const linkedinIcon = "https://s3.amazonaws.com/img.ironsrc/img/linkedin.png";

  // Default lication of the needed social media link in socialURLsMap func.
  const defaultWebLink = socialURLsMap.IronSource.a;
  const defaultTwLink = socialURLsMap.IronSource.tw;
  const defaultFbLink = socialURLsMap.IronSource.fb;
  const defaultLdLink = socialURLsMap.IronSource.ld;
  const defaultWebsiteLink = socialURLsMap.IronSource.linkText;

  const [copyToClipboardConfig, setCopyToClipboardConfig] = useState({
    button: { class: "primary large" },
  });
  const copyToClipboard = () => {
    console.log(locationsConfig.controlValue);
    copy(dataToCopy(), {
      asHtml: true,
    });
  };

  const [fullNameConfig, setFullNameConfig] = useState({
    configuration: { placeholder: "Full Name" },
    controlValue: "",
  });
  const onFullNameChange = (value) => {
    setFullNameConfig({
      ...fullNameConfig,
      controlValue: value,
    });
  };

  const [titleConfig, setTitleNameConfig] = useState({
    configuration: { placeholder: "Title" },
    controlValue: "",
  });
  const onTitleChange = (value) => {
    setTitleNameConfig({
      ...titleConfig,
      controlValue: value,
    });
  };

  const onLocationChange = (location) => {
    console.log("closed", location);
    setLocationConfig({
      ...locationsConfig,
      controlValue: location,
    });
  };

  const [locationsConfig, setLocationConfig] = useState({
    options: [
      {
        id: "0",
        displayText: "No Address",
        address: "",
      },
      {
        id: "1",
        displayText: "Bangalore",
        address:
          "Office Nos. CB27 and CB28, Pine Valley Building, Domlur, Bangalore, Karnataka, India.",
      },
      {
        id: "2",
        displayText: "Beijing",
        address:
          "A505, East Avenue, 10 New East Road, Chaoyang District, Beijing, China.",
      },
      {
        id: "3",
        displayText: "Kiev",
        address: "Ivana Lepse Blvd. 6-z, 03680, Kiev, Ukraine.",
      },
      {
        id: "4",
        displayText: "London",
        address: "Grant House, 56-60 St John Street, London, UK.",
      },
      {
        id: "5",
        displayText: "Minsk",
        address: "Pinskaya 28A, Minsk, Belarus.",
      },
      {
        id: "6",
        displayText: "New York",
        address: "180 Varick Street, 13th Floor, New York, NY, USA.",
      },
      {
        id: "7",
        displayText: "San Francisco",
        address: "17 Bluxome Street, San Francisco, CA, USA.",
      },
      {
        id: "8",
        displayText: "Shanghai",
        address:
          "Room 1408, Puhui Plaza, No. 318 Fuzhou Road, Shanghai, China.",
      },
      {
        id: "9",
        displayText: "Tel Aviv",
        address: "IronSource HQ - 121 Derech Menachem Begin st. Tel Aviv.",
      },
    ],
    controlValue: [],
  });

  const onCompanyNameChange = (companyName) => {
    console.log("closed", companyName);
    setCompanyNameConfig({
      ...companyNameConfig,
      controlValue: companyName,
    });
  };
  const [companyNameConfig, setCompanyNameConfig] = useState({
    options: [
      {
        id: "0",
        displayText: "No Company Name",
        companyImageUrl: "",
      },
      {
        id: "1",
        displayText: "Aura",
        src: "https://s3.amazonaws.com/img.ironsrc/img/logos/logo-aura.png",
      },
      {
        id: "2",
        displayText: "IronSource",
        src: "https://s3.amazonaws.com/img.ironsrc/img/logos/logo-is.png",
      },
      {
        id: "3",
        displayText: "Luna",
        src: "https://s3.amazonaws.com/img.ironsrc/img/logos/logo-luna_new.png",
      },

      {
        id: "4",
        displayText: "SuperSonic",
        src: "https://s3.amazonaws.com/img.ironsrc/img/logos/logo-ssonic.png",
      },
    ],
    controlValue: [],
  });

  const [emailConfig, setEmailConfig] = useState({
    configuration: { placeholder: "Email" },
    controlValue: "",
  });
  const onEmailChange = (value) => {
    setEmailConfig({
      ...emailConfig,
      controlValue: value,
    });
  };

  const [phoneConfig, setPhoneConfig] = useState({
    configuration: { placeholder: "Phone" },
    controlValue: "",
  });
  const onPhoneChange = (value) => {
    setPhoneConfig({
      ...phoneConfig,
      controlValue: value,
    });
  };

  const [faxConfig, setFaxConfig] = useState({
    configuration: { placeholder: "Fax" },
    controlValue: "",
  });
  const onFaxChange = (value) => {
    setFaxConfig({
      ...faxConfig,
      controlValue: value,
    });
  };

  const [qqConfig, setQQConfig] = useState({
    configuration: { placeholder: "QQ" },
    controlValue: "",
  });
  const onQQChange = (value) => {
    setQQConfig({
      ...qqConfig,
      controlValue: value,
    });
  };

  const [skypeConfig, setSkypeConfig] = useState({
    configuration: { placeholder: "Skype" },
    controlValue: "",
  });
  const onSkypeChange = (value) => {
    setSkypeConfig({
      ...skypeConfig,
      controlValue: value,
    });
  };

  const [weChatConfig, setWeChatConfig] = useState({
    configuration: { placeholder: "WeChat" },
    controlValue: "",
  });
  const onWeChatChange = (value) => {
    setWeChatConfig({
      ...weChatConfig,
      controlValue: value,
    });
  };

  // The data that the "Copy to clipboard" button executes when the user clicks
  const dataToCopy = () => {
    const selectedCompany = companyNameConfig.controlValue[0]?.displayText;
    return (
      '<table style="color: #9B9AAA; font-family: Arial; letter-spacing:0.2px; background: #ffffff;"><thead><tr><td style="font-size: 13px; color: #747474; font-weight: bold;">' +
      (fullNameConfig.controlValue || defaultFirstName) +
      '</td></tr><tr><td style="font-size: 13px; color: #989898;">' +
      (titleConfig.controlValue || defaultTitle) +
      '</td></tr></thead><tbody><tr><td><img src="' +
      (companyNameConfig.controlValue[0]?.src || defaultCompanyIconUrl) +
      '" alt="Company Logo" width="200" /></td></tr><tr><td><span style="color:#989898; font-size: 11px; !important; text-decoration:none;">' +
      (emailConfig.controlValue &&
        '<span style="color: #747474; font-size: 11px; font-weight: bold;">Email: </span>' +
          emailConfig.controlValue) +
      '</span></td></tr><tr><td><span style="color:#989898; font-size: 11px; !important;">' +
      (phoneConfig.controlValue &&
        '<span style="color: #747474; font-size: 11px; font-weight: bold;">Phone: </span>' +
          phoneConfig.controlValue) +
      '</span></td></tr><tr><td><span style="color:#989898; font-size: 11px; !important;">' +
      (faxConfig.controlValue &&
        '<span style="color: #747474; font-size: 11px; font-weight: bold;">Fax: </span>' +
          faxConfig.controlValue) +
      '</span></td></tr><tr><td><span style="color:#989898; font-size: 11px;">' +
      (skypeConfig.controlValue &&
        '<span style="color: #747474; font-size: 11px; font-weight: bold;">Skype: </span>' +
          skypeConfig.controlValue) +
      '</span></td></tr><tr><td><span style="color:#989898; font-size: 11px;">' +
      (qqConfig.controlValue &&
        '<span style="color: #747474; font-size: 11px; font-weight: bold;">QQ: </span>' +
          qqConfig.controlValue) +
      '</span></td></tr><tr><td><span style="color:#989898; font-size: 11px;">' +
      (weChatConfig.controlValue &&
        '<span style="color: #747474; font-size: 11px; font-weight: bold;">WeChat: </span>' +
          weChatConfig.controlValue) +
      '</span></td></tr><tr><td style="color: #747474; font-size: 11px;">' +
      (locationsConfig.controlValue[0]?.address || "") +
      '</td></tr></tbody><tfoot><tr><td><a href="' +
      socialURLsMap[selectedCompany]?.a +
      '">' +
      (socialURLsMap[selectedCompany]?.linkText || defaultWebsiteLink) +
      '</a></td></tr><tr><td><a href="' +
      (socialURLsMap[selectedCompany]?.fb || defaultFbLink) +
      '"><img src="' +
      facebookIcon +
      '"alt="Facebook Logo" width="25" /></a><a href="' +
      (socialURLsMap[selectedCompany]?.tw || defaultTwLink) +
      '"><img src="' +
      twitterIcon +
      '"alt="Twitter Logo" width="25" /></a><a href="' +
      (socialURLsMap[selectedCompany]?.ld || defaultLdLink) +
      '"><img src="' +
      linkedinIcon +
      '"alt="Linkedin Logo" width="25" /></a></td></tr><tr><td style="font-size: 11px; display:inline-block; max-width: 90%; line-height:17px;">This email (including any attachments) is for the sole use of the intended recipient and may contain confidential information which may be protected by legal privilege. If you are not the intended recipient, or the employee or agent responsible for delivering it to the intended recipient, you are hereby notified that any use, dissemination, distribution or copying of this communication and/or its content is strictly prohibited. If you are not the intended recipient, please immediately notify us by reply email or by telephone, delete this email and destroy any copies. Thank you.</td></tr></tfoot></table>'
    );
  };

  // The HTML data structure
  const getTableHTML = () => {
    const selectedCompany = companyNameConfig.controlValue[0]?.displayText;
    return (
      <table className="signature-result">
        <thead>
          <tr>
            <td className="fullName">
              {fullNameConfig.controlValue || defaultFirstName}
            </td>
          </tr>
          <tr>
            <td className="title">
              {titleConfig.controlValue || defaultTitle}
            </td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="companyIcon">
              <img
                src={
                  companyNameConfig.controlValue[0]?.src ||
                  defaultCompanyIconUrl
                }
                alt="Company Logo"
                width="180"
              />
            </td>
          </tr>
          <tr>
            <td>
              {emailConfig.controlValue && (
                <span className="form-result-title">Email: </span>
              )}
              <span>{emailConfig.controlValue}</span>
            </td>
          </tr>
          <tr>
            <td>
              {phoneConfig.controlValue && (
                <span className="form-result-title">Phone: </span>
              )}
              <span>{phoneConfig.controlValue}</span>
            </td>
          </tr>
          <tr>
            <td>
              {faxConfig.controlValue && (
                <span className="form-result-title">Fax: </span>
              )}
              <span>{faxConfig.controlValue}</span>
            </td>
          </tr>
          <tr>
            <td>
              {skypeConfig.controlValue && (
                <span className="form-result-title">Skype: </span>
              )}
              <span>{skypeConfig.controlValue}</span>
            </td>
          </tr>
          <tr>
            <td>
              {qqConfig.controlValue && (
                <span className="form-result-title">QQ: </span>
              )}
              <span>{qqConfig.controlValue}</span>
            </td>
          </tr>
          <tr>
            <td>
              {weChatConfig.controlValue && (
                <span className="form-result-title">WeChat: </span>
              )}
              <span>{weChatConfig.controlValue}</span>
            </td>
          </tr>

          <tr className="location">
            <td>{locationsConfig?.controlValue[0]?.address || ""}</td>
          </tr>
        </tbody>

        <tfoot>
          <tr className="websiteLink">
            <td>
              <a href={socialURLsMap[selectedCompany]?.a}>
                {socialURLsMap[selectedCompany]?.linkText || defaultWebsiteLink}
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a href={socialURLsMap[selectedCompany]?.fb || defaultFbLink}>
                <img src={facebookIcon} alt="Facebook Logo" width="25" />
              </a>
              <a href={socialURLsMap[selectedCompany]?.tw || defaultTwLink}>
                <img src={twitterIcon} alt="Twitter Logo" width="25" />
              </a>
              <a href={socialURLsMap[selectedCompany]?.ld || defaultLdLink}>
                <img src={linkedinIcon} alt="Linkedin Logo" width="25" />
              </a>
            </td>
          </tr>
          <tr>
            <td>
              This email (including any attachments) is for the sole use of the
              intended recipient and may contain confidential information which
              may be protected by legal privilege. If you are not the intended
              recipient, or the employee or agent responsible for delivering it
              to the intended recipient, you are hereby notified that any use,
              dissemination, distribution or copying of this communication
              and/or its content is strictly prohibited. If you are not the
              intended recipient, please immediately notify us by reply email or
              by telephone, delete this email and destroy any copies. Thank you.
            </td>
          </tr>
        </tfoot>
      </table>
    );
  };

  useEffect(() => {
    dataToCopy();
  }, [setCopyToClipboardConfig, fullNameConfig]);
  return (
    <React.Fragment>
      <div className="form-inputs">
        <div className="fname">
          <FusionInput
            config={fullNameConfig}
            controlValueChange={(e) => onFullNameChange(e)}
          ></FusionInput>
        </div>

        <div className="title">
          <FusionInput
            config={titleConfig}
            controlValueChange={(e) => onTitleChange(e)}
          ></FusionInput>
        </div>

        <div className="location">
          <FusionDropdown
            config={locationsConfig}
            controlValueChange={(e) => onLocationChange(e)}
          ></FusionDropdown>
        </div>

        <div className="company">
          <FusionDropdown
            config={companyNameConfig}
            controlValueChange={(e) => onCompanyNameChange(e)}
          ></FusionDropdown>
        </div>

        <div className="email">
          <FusionInput
            config={emailConfig}
            controlValueChange={(e) => onEmailChange(e)}
          ></FusionInput>
        </div>

        <div className="phone">
          <FusionInput
            config={phoneConfig}
            controlValueChange={(e) => onPhoneChange(e)}
          ></FusionInput>
        </div>

        <div className="fax">
          <FusionInput
            config={faxConfig}
            controlValueChange={(e) => onFaxChange(e)}
          ></FusionInput>
        </div>

        <div className="qq">
          <FusionInput
            config={qqConfig}
            controlValueChange={(e) => onQQChange(e)}
          ></FusionInput>
        </div>

        <div className="skype">
          <FusionInput
            config={skypeConfig}
            controlValueChange={(e) => onSkypeChange(e)}
          ></FusionInput>
        </div>

        <div className="wechat">
          <FusionInput
            config={weChatConfig}
            controlValueChange={(e) => onWeChatChange(e)}
          ></FusionInput>
        </div>

        <div className="copy-btn">
          <FusionButton
            config={copyToClipboardConfig}
            onclick={() => copyToClipboard()}
          >
            <div>Copy To Clipboard</div>
          </FusionButton>
        </div>
      </div>
      <div>{getTableHTML()}</div>
    </React.Fragment>
  );
}

export default App;
