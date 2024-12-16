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
            stompClient.current.deactivate().then(r => {
                console.log('WebSocket connection deactivated.');
            });
        };
    }, []);


    const subscribe = (channel, callback) => {
        if(stompClient.current.connected){
            console.log("Subs", channel)
            return stompClient.current.subscribe(channel, (message) =>{
                callback(message.body);
            });
        }
        else{
            console.log("Client is not connected!")
        }
    }

    const unsubscribe = (subscription) =>{
        if(subscription){
            subscription.unsubscribe();
        }
    }

    const sendMessage = (destination, body) => {
        if(stompClient.current.connected) {
            stompClient.current.publish({destination, body});
        }
    }

    return (
        <WebsocketContext.Provider value={{
                subscribe,
                unsubscribe,
                sendMessage
            }}>
            {children}
        </WebsocketContext.Provider>
    );
}

export {WebsocketContext, WebsocketProvider};
