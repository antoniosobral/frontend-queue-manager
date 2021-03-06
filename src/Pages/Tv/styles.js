import styled from 'styled-components';

export const Container = styled.div`
  min-width: 100%;
  min-height: 100%;
  background: #f5f5f5;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    max-height: 100px;
    max-width: 400px;
    margin-top: 24px;
    margin-bottom: 50px;
  }

  div {
    width: 100%;
    max-height: 80%;
    max-width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #eeeeee;
    background: #fff;
    box-shadow: 0 0px 4.5px rgba(0, 0, 0, 0.013),
      0 0px 5.4px rgba(0, 0, 0, 0.016), 0 0px 5.7px rgba(0, 0, 0, 0.017),
      0 0px 5.8px rgba(0, 0, 0, 0.018), 0 0px 6px rgba(0, 0, 0, 0.019),
      0 0px 6.5px rgba(0, 0, 0, 0.022), 0 0px 9px rgba(0, 0, 0, 0.03);
    padding: 10px;

    h2 {
      margin: auto;
      font-size: 1000%;
      color: #a20000;
    }
    h3 {
      font-size: 300%;
      color: #bdbdbd;
      border-bottom: 1px solid #bdbdbd;
      margin-bottom: 24px;
    }
    & + div {
      margin-top: 24px;
      max-height: 90%;
      margin-bottom: 24px;

      h2 {
        margin: auto;
        font-size: 1000%;
        color: #a20000;
      }
      h3 {
        font-size: 300%;
        color: #bdbdbd;
        border-bottom: 1px solid #bdbdbd;
        margin-bottom: 24px;
      }
    }
  }
`;
