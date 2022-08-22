import type { Component } from 'solid-js';
import { Navigate, Route, Routes } from '@solidjs/router';

import socketIO from 'socket.io-client';

import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

const socket = socketIO('http://localhost:9999');

const App: Component = () => {
  return (
    <Routes>
      <Route path="/"><Navigate href={'/home'} /></Route>
      <Route path="/home" element={<HomePage />} />
      <Route path="/chat" element={<ChatPage socket={socket} />} />
    </Routes>
  );
};

export default App;
