import { Box, Text } from "@skynexui/components";
import appConfig from '../config.json';


function Title(props){
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                     ${Tag} {
                        color: ${appConfig.theme.colors.primary['800']};
                        font-family: 'New Tegomin', serif;
                        font-size: 4.5rem;
                        font-weight: 600;
                        text-shadow: 2px 2px 8px ${appConfig.theme.colors.neutrals['300']}
                    }    
               `}                   
               </style>
        </>
    );
}

export default function ErrorPage(){
    return (
        <>
            <Box
          styleSheet={{
            display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center',
          }}
        >  
            
            <Title tag="h1">Erro 404!</Title>
                <Box
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                  height: '130px',
                  width: '130px',
                  backgroundImage: 'url(https://thumbs.gfycat.com/EssentialCelebratedAnemoneshrimp-max-1mb.gif)' ,
                  backgroundRepeat: 'no-repeat', backgroundSize: ' cover', backgroundBlendMode: 'multiply',
                  marginTop: '30px',
                  marginBottom: '30px',

                }}
              ></Box>

             <Text variant="body2" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[900], 
                fontSize:'1.5rem',
                fontFamily: 'Courier Prime, monospace',
             }}>
                O que você procura não pode ser encontrado aqui!
              </Text>
        </Box>
        </>
    );
}