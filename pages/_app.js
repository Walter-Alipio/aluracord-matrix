function GlobalStyle(){
    return (
        <style global jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,700;1,400&family=New+Tegomin&display=swap');
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                list-style: none;
            }
            body {
                font-family: 'Open Sans', sans-serif;
            }
            /* App fit Height */ 
            html, body, #__next {
                min-height: 100vh;
                display: flex;
                flex: 1;
            }
            #__next {
                flex: 1;
            }
            #__next > * {
                flex: 1;
            }
            /* ./App fit Height */ 

            /* Scrollbar personalizada */
            ::-webkit-scrollbar {
                width: 0.5em;
              }
              
              /* Track */
              ::-webkit-scrollbar-track {
                background: #313D49;
              }
              
              /* Handle */
              ::-webkit-scrollbar-thumb {
                background: #2F8132;
              }
        `}</style>
    );
}

export default function MyApp({ Component, pageProps }) {
    //tudo que for carregado aqui, roda em todas as páginas
    return <>
        <GlobalStyle />
        <Component {...pageProps} />
    </>
  }