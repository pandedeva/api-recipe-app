import { GiKnifeFork } from "react-icons/gi";
import { AiFillFacebook, AiOutlineTwitter, AiOutlineInstagram, AiFillGithub } from "react-icons/ai";
import styled from "styled-components";

function Footer() {
  return (
    <Foot>
      <IconsWrapper>
        <Logo>
          <Icon />
          Deliciousss
        </Logo>
        <Wrapper>
          <div>
            <AiFillFacebook style={{ width: 25, height: 25, objectFit: "contain" }} />
          </div>
          <div>
            <AiOutlineTwitter style={{ width: 25, height: 25, objectFit: "contain" }} />
          </div>
          <div>
            <AiOutlineInstagram style={{ width: 25, height: 25, objectFit: "contain" }} />
          </div>
          <div>
            <AiFillGithub style={{ width: 25, height: 25, objectFit: "contain" }} />
          </div>
        </Wrapper>
      </IconsWrapper>
      <CopyRight>
        <p>&copy; Copyright</p>
      </CopyRight>
    </Foot>
  );
}

const Foot = styled.footer`
  display: grid;
  grid-row-start: 2;
  grid-row-end: 3;
`;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  width: 100%;
  background: linear-gradient(to right, #a770ef, #cf8bf3, #fdb99b);
`;

const Logo = styled.div`
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
  display: flex;
  align-items: center;
`;

const Icon = styled(GiKnifeFork)`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const Wrapper = styled.div`
  display: flex;

  div {
    background-color: white;
    padding: 5px;
    border-radius: 40px;
    margin: 0 10px;
  }
`;

const CopyRight = styled.div`
  background: linear-gradient(to right, #a770ef, #cf8bf3, #fdb99b);
  padding: 5px 0;
  opacity: 0.8;

  p {
    font-size: 14px;
    color: white;
    text-align: center;
    margin: 0px;
  }
`;

export default Footer;
