import React, {createContext, useEffect, useRef} from 'react';
import {Client} from '@stomp/stompjs';

const WebsocketContext = createContext(undefined);

function WebsocketProvider({children}) {
    const wsUrl = import.meta.env.VITE_WS_URL;
    let stompClient = useRef({});
    const subscriptionsRef = useRef([]);


    useEffect(() => {
        stompClient.current = new Client({
            brokerURL: `${wsUrl}/api/ws`,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('Connected to WebSocket!');
                console.log(subscriptionsRef);

                // Re-subscription after re-connection
                subscriptionsRef.current.findLast(({ channel, callback }) => {
                    subscribe(channel,callback);
                    subscriptionsRef.current.pop();
                });
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
        if (stompClient.current.connected) {
            console.log("Subs", channel);
            return stompClient.current.subscribe(channel, (message) => {
                callback(message.body);
            });
        } else {
            console.log("Client is not connected!");
            subscriptionsRef.current.push({ channel, callback });
            return null;
        }
    };

    const unsubscribe = (subscription) => {
        if (subscription) {
            console.log("Unsub", subscription)
            subscription.unsubscribe();
        }
    };

    const sendMessage = (destination, body) => {
        if (stompClient.current.connected) {
            stompClient.current.publish({
                destination: destination,
                body: JSON.stringify(body)
            });
        }
    };

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
