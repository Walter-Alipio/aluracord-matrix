import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import {useRouter} from 'next/router';
import { createClient } from '@supabase/supabase-js'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker.js'

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseClient = createClient(supabaseUrl,supabaseKey);

export default function ChatPage() {
  // Sua lógica vai aqui
  const router = useRouter(); //useRouter tambem é um hook
  const logedUser = router.query.username;
  const [mensagem, setMensagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
  // ./Sua lógica vai aqui
  React.useEffect(()=>{ //função executada quando a página é carregada

    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', {ascending: false})
      .then(({data})=>{ //{}pegando exatamente o data que esta dentro do array
        setListaDeMensagens(data);
      })
  },[]);
  /*useEffec lida com codigos que só devem ser alterados caso a tela seja recarregada, ou,
  quando o valor informado no array for alterado. No nosso caso usamos a atualização
  da lista de mensagens como gatilho dessa alteração */

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      id: listaDeMensagens.length + 1,
      de: logedUser,
      texto: novaMensagem,
    };

    supabaseClient
      .from('mensagens')
      .insert([
        //O objeto deve ter os mesmos campos criados no supabase
        mensagem
      ])
      .then(({data})=>{
        setListaDeMensagens([data[0], ...listaDeMensagens]);
        setMensagem("");
      })

  }
  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList mensagens={listaDeMensagens} />
          {/* {listaDeMensagens.map((mensagemAtual) => {
            return (
              <li key={mensagemAtual.id}>
                {mensagemAtual.de}:{mensagemAtual.texto}
              </li>
            );
          })} */}

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              // alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                const mensagemValor = event.target.value;
                setMensagem(mensagemValor);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <ButtonSendSticker
              onStickerClick={(sticker)=>{
                handleNovaMensagem(`:sticker: ${sticker}`);
              }}
            />

            <Button
            type="button"
            onClick = {function (event){
              event.preventDefault();
              if(mensagem != ''){
                handleNovaMensagem(mensagem);
              }
            }}
          variant="tertiary"
          colorVariant="neutral"
          label="Send"
          styleSheet={{
            color: appConfig.theme.colors.neutrals[100],
            height: "44px",
            fontFamily: "Courier Prime, monospace",
          }}
        />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
          styleSheet={{
            color: appConfig.theme.colors.neutrals[100],
          }}
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  console.log("MessageList", props.listaDeMensagens);
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY: "scroll",
        overflowWrap: "break-word",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              color: appConfig.theme.colors.primary[200],
              fontFamily: "Courier Prime, monospace",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong"
               styleSheet={{
                color: appConfig.theme.colors.neutrals[100],
              }}>{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {mensagem.texto.startsWith(':sticker:')?(   
                <Image 
                styleSheet={{
                  maxWidth: "250px"
                }}
                src={mensagem.texto.replace(':sticker:','')}/>
             )
             :( 
                mensagem.texto 
             )}
          </Text>
        );
      })}
    </Box>
  );
}