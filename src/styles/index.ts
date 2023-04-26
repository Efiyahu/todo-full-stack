import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html{
        box-sizing: border-box;
        scroll-behavior: smooth;
    }

    #root {
        height: inherit;
    }

    *,*::before, *::after{
    box-sizing: inherit; 
    }
    body {
        overflow: overlay;
        margin: 0;
        background: #131517;
        font-family: 'Montserrat', sans-serif;


        p,h1,h2,h3,h4,h5 , h6 {
            padding: 0;
            margin: 0;
        } 

  color: #eee;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar:horizontal {
    height: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-right: 4px solid transparent;
    border-left: 1px solid transparent;
    background-color: #292929;
    background-clip: padding-box;
    border-radius: 4px 8px 8px 4px;
    width: 6px;
  }
  ::-webkit-scrollbar-corner {
    display: none;
  }
    }

    a{
        text-decoration: none;
        color: inherit;
        &:visited {
            color: inherit;
        }
    }
    ul{
        list-style: none;
    }

    div {
        ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar:horizontal {
    height: 10px;

  }

  ::-webkit-scrollbar-thumb {
    border-right: 4px solid transparent;
    border-left: 1px solid transparent;
    background-color: #292929;
    background-clip: padding-box;
    border-radius: 4px 8px 8px 4px;
    width: 6px;
  }
  ::-webkit-scrollbar-track {
             margin-top: 70px;
              margin-bottom: 9px;
          }
  ::-webkit-scrollbar-corner {
    display: none;
  }
    }
`;

export default GlobalStyle;
