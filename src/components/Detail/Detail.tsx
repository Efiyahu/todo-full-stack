import styled from 'styled-components';

type Props = {
  label: string;
  value: string;
  width?: string;
  height?: string;
  iconStart?: JSX.Element;
};

const Detail = ({ label, value, width = '308px', height = '45px', iconStart: Icon }: Props) => (
  <Wrapper width={width} height={height}>
    <Label>{label}</Label>
    <Text>
      {Icon}
      {value}
    </Text>
  </Wrapper>
);

export default Detail;

const Wrapper = styled.div<{ width: string; height: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

const Label = styled.span`
  color: ${({ theme }) => theme.colors.primary.light};
  font-size: 0.875rem;
  font-weight: 500;
  width: 100%;
  position: absolute;
  top: -22px;
  text-transform: capitalize;
`;

const Text = styled.p`
  width: 100%;
  border: 1px solid #23272b;
  border-radius: 9px;
  padding: 13px 17px;
  color: #5e6370;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`;
