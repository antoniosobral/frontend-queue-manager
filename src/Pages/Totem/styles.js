import styled from 'styled-components';

export const Container = styled.div`
  margin: auto;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 45px;
    color: #757575;
  }

  img {
    width: 100%;
    max-width: 300px;
    margin: 20px auto 100px;
  }
`;
export const Content = styled.div`
  height: 900%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const Password = styled.div`
  margin: 20px;
  cursor: pointer;
  width: 100%;
  max-width: 450px;
  height: 25%;
  max-height: 300px;
  border: 1px solid #eeeeee;
  box-shadow: 0 0px 4.5px rgba(0, 0, 0, 0.013), 0 0px 5.4px rgba(0, 0, 0, 0.016),
    0 0px 5.7px rgba(0, 0, 0, 0.017), 0 0px 5.8px rgba(0, 0, 0, 0.018),
    0 0px 6px rgba(0, 0, 0, 0.019), 0 0px 6.5px rgba(0, 0, 0, 0.022),
    0 0px 9px rgba(0, 0, 0, 0.03);
  padding: 5px;
  border-radius: 4px;
  color: #fff;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background: #a20000;
  h2 {
    text-align: center;
  }
`;

export const PrintPassword = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 60px;
  }
  h2 {
    font-size: 20px;
  }
`;
export const Pass = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;
