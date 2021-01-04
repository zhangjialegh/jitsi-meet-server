import Vue from 'vue'
import { io } from 'socket.io/client-dist/socket.io';

Vue.io = Vue.prototype.$io = io
