import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import { Client } from '@stomp/stompjs';

const WebsocketContext = createContext(undefined);

function WebsocketProvider({children}) {
    let stompClient = useRef({});

    useEffect(() => {
        stompClient.current = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('Connected to WebSocket!');
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        stompClient.current.activate();

        return () => {
            stompClient.current.deactivate().then(r => {});
        };
    }, []);

    const sendMessage = () =>{
        console.log("TEST")
        stompClient.current.publish({destination: "/app/hello", body: "Hello, STOMP"});
    }

    return (
        <WebsocketContext.Provider value={stompClient}>
            {children}
        </WebsocketContext.Provider>
    );
}

export {WebsocketContext, WebsocketProvider};
