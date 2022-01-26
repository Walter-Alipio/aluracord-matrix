import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';

export default function PaginaDoChat(){
    return (
        <>
       
        
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
              <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '95vw',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[600],
                border: 'none',
                boxShadow: '5px 5px 5px' ,
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                height: '90%',
                minHeight: '240px',
              }}
            ></Box>
        </Box>
        </>
    );
}