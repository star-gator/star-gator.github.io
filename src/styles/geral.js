import styled from 'styled-components';

export const StyledApp = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

export const StyledMain = styled.div`
    margin-top: 50px;
    flex: 1;
    display: flex;
    flex-direction: column;
`
export const StyledContainer = styled.div`
    display: flex;
    // flex: 1;
    flex-direction: column;
    //justify-content: center;
    align-items: flex-start;
    
    width: 100%;
    @media (min-width: 767px) {
        flex-direction: row;
    }
`









export const TextTitle = styled.p`
  color: var(--primary-text);
  font-size: 25px;
  font-weight: 600;
  line-height: 1.6;
`;

export const TextSubTitle = styled.p`
  color: var(--primary-text);
  font-size: 18px;
  line-height: 1.6;
`;

export const TextDescription = styled.p`
  color: var(--primary-text);
  font-size: 16px;
  line-height: 1.6;
`;