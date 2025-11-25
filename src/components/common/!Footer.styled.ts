import styled from "styled-components";

export const StyledFooter = styled.footer`
  width: 100%;
  background: linear-gradient(to right, #67e8f9, #60a5fa, #2563eb);
  color: #1f2937;
  margin-top: 3rem;
`;

export const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (min-width: 640px) {
    padding: 3rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem 2rem;
  }
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2rem;

  @media (min-width: 640px) {
    margin-bottom: 3rem;
  }
`;

export const LogoWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  font-size: 1rem;
  font-family: Prompt;
  font-style: italic;
  max-width: 42rem;

  @media (min-width: 640px) {
    font-size: 1.125rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.25rem;
  }
`;

export const MiddleSection = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  @media (min-width: 640px) {
    margin-bottom: 3rem;
  }
`;

export const ContactTitle = styled.p`
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 1rem;
`;

export const SocialLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.875rem;

  @media (min-width: 640px) {
    gap: 1.5rem;
    font-size: 1rem;
  }
`;

export const SocialLink = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

export const EmailText = styled.p`
  margin-top: 1rem;
  font-size: 0.875rem;

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

export const EmailLink = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

export const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(29, 78, 216, 0.3);

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 1rem;
  font-family: WDXL-Lubrifont-SC;

  @media (min-width: 640px) {
    font-size: 1.125rem;
  }
`;

export const FooterLink = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

export const PoweredBy = styled.p`
  font-size: 0.75rem;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

export const AuthorName = styled.strong`
  font-family: Zalando-Sans-SemiExpanded;
`;

export const Copyright = styled.p`
  font-size: 0.75rem;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;
