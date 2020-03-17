import styled from 'styled-components';
import PerfectScrollBar from 'react-perfect-scrollbar';

export const Container = styled.div`
  margin: auto;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: space-between;

  #icons:hover {
    color: #a20000;
  }

  #callForm {
    margin: 20px;
    max-width: 400px;
    width: 100%;
    max-height: 80px;
    border: 1px solid #eeeeee;
    background: #fff;
    box-shadow: 0 0px 4.5px rgba(0, 0, 0, 0.013),
      0 0px 5.4px rgba(0, 0, 0, 0.016), 0 0px 5.7px rgba(0, 0, 0, 0.017),
      0 0px 5.8px rgba(0, 0, 0, 0.018), 0 0px 6px rgba(0, 0, 0, 0.019),
      0 0px 6.5px rgba(0, 0, 0, 0.022), 0 0px 9px rgba(0, 0, 0, 0.03);
    padding: 5px;

    form {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      h2 {
        font-size: 16px;
        margin-top: 24px;
        font-weight: normal;
        color: #bdbdbd;
      }
      select {
        width: 220px;
        font-size: 16px;

        border: none;
        color: #757575;
        border-radius: 1px;

        height: 50px;
        background: #fff;
        border-bottom: 1px solid #a20000;
      }
    }
  }
  .showFilas {
    width: 100%;
    height: 100%;
    max-height: 600px;
    margin: 20px;
    border: 1px solid #eeeeee;
    background: #fff;
    box-shadow: 0 0px 4.5px rgba(0, 0, 0, 0.013),
      0 0px 5.4px rgba(0, 0, 0, 0.016), 0 0px 5.7px rgba(0, 0, 0, 0.017),
      0 0px 5.8px rgba(0, 0, 0, 0.018), 0 0px 6px rgba(0, 0, 0, 0.019),
      0 0px 6.5px rgba(0, 0, 0, 0.022), 0 0px 9px rgba(0, 0, 0, 0.03);
    padding: 10px;
    table {
      border-collapse: collapse;
      width: 100%;
    }

    td {
      border-bottom: 1px solid #eeeeee;
    }

    td,
    th {
      border-bottom: 1px solid #eeeeee;
      text-align: center;
      padding: 8px;
      color: #757575;
    }

    tr:nth-child(even) {
      background-color: #eeeeee;
    }

    h2 {
      font-size: 24px;
      color: #bdbdbd;
      border-bottom: 1px solid #a20000;
      margin-bottom: 24px;
    }
  }

  #filas {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  #called {
    max-width: 1000px;
    width: 100%;
  }
  #toCall {
    max-width: 400px;
    width: 100%;
  }
`;

export const Header = styled.div`
  width: 100%;
  padding: 20px 20px 0px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;

  h1 {
    color: #bdbdbd;
  }

  button {
    border: none;

    width: 120px;
    height: 40px;
    border: none;

    margin-top: 10px;
    font-weight: bold;
    color: #eeeeee;
    background: #a20000;
  }
`;

export const ButtonSenha = styled.div`
  border: none;
  button {
    width: 120px;
    height: 40px;
    border: none;

    margin-top: 10px;
    font-weight: bold;
    color: #eeeeee;
    ${props =>
      props.hasNext
        ? ' background: #a20000 ; cursor: pointer;'
        : ' background: #bdbdbd;cursor: default;'};
  }
`;

export const Scroll = styled(PerfectScrollBar)`
  width: 100%;
  max-height: 500px;
  table {
    border-collapse: collapse;
    width: 100%;
  }

  td {
    border-bottom: 1px solid #eeeeee;
  }

  td,
  th {
    border-bottom: 1px solid #eeeeee;
    text-align: center;
    padding: 8px;
    color: #757575;
  }

  tr:nth-child(even) {
    background-color: #eeeeee;
  }

  h2 {
    font-size: 24px;
    color: #bdbdbd;
    border-bottom: 1px solid #a20000;
    margin-bottom: 24px;
  }
`;
