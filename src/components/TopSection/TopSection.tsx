import styled from 'styled-components';
import Logo from 'assets/imgs/logo.png';
import Button from 'components/Button/Button';
import API from 'api/methods';

const TopSection = () => (
  <Container>
    <StyledLogo src={Logo} alt="logo" />
    <Wrapper>
      <Button variant="outlined" text="Log Out" onClick={() => API.logout()} />
    </Wrapper>
  </Container>
);

export default TopSection;

const Container = styled.div`
  width: 100vw;
  height: 76px;
  background: ${({ theme }) => theme.colors.primary.darkBlue};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding: 10px 25px;
  justify-content: space-between;
`;

const StyledLogo = styled.img`
  height: 40px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
