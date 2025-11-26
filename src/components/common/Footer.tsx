import { FOOTER_TEXTS } from "../../i18n/translations/common/Footer";
import { useLang } from "../../i18n";
import Logo from "./Logo";
import {
  StyledFooter,
  Container,
  TopSection,
  LogoWrapper,
  Description,
  MiddleSection,
  ContactTitle,
  SocialLinks,
  SocialLink,
  EmailText,
  EmailLink,
  BottomSection,
  FooterLinks,
  FooterLink,
  PoweredBy,
  AuthorName,
  Copyright,
} from "./!Footer.styled";

export default function Footer() {
  const { lang } = useLang();
  const { appDefinition, contactInfo, email, about, FAQ, copyrightMessage } =
    FOOTER_TEXTS[lang];

  return (
    <StyledFooter>
      <Container>
        <TopSection>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <Description>{appDefinition}</Description>
        </TopSection>

        <MiddleSection>
          <ContactTitle>{contactInfo}</ContactTitle>
          <SocialLinks>
            <SocialLink
              href="https://www.linkedin.com/in/mehmet-ali-erfidan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </SocialLink>
            <SocialLink
              href="https://github.com/MehmetAliErfidan"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </SocialLink>
            <SocialLink
              href="https://x.com/mehmetaerfidan"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </SocialLink>
          </SocialLinks>
          <EmailText>
            {email}
            <EmailLink href="mailto:erfidan740@gmail.com">
              erfidan740@gmail.com
            </EmailLink>
          </EmailText>
        </MiddleSection>

        <BottomSection>
          <FooterLinks>
            <FooterLink href="/about">{about}</FooterLink>
            <FooterLink href="/faq">{FAQ}</FooterLink>
          </FooterLinks>
          <PoweredBy>
            Powered by <AuthorName>Mehmet Ali Erfidan</AuthorName>
          </PoweredBy>
          <Copyright>{copyrightMessage}</Copyright>
        </BottomSection>
      </Container>
    </StyledFooter>
  );
}
