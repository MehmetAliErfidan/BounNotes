import styled from "styled-components";

export const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  overflow: hidden; /* kritik */
  background: linear-gradient(135deg, #60a5fa, #2563eb);

  display: flex;
  align-items: center;
  justify-content: center;

  color: #ffffff;
  font-weight: 600;
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;
