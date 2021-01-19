<template>
  <div></div>
</template>
<script>
import { parseURLParams } from '~/utils/base'
export default {
  asyncData ({ isDev, query }) {
    return {
      isDev,
      id: query.id
    }
  },
  data () {
    return {
      socket: null,
      rooms: [],
      transport: null
    }
  },
  destroyed () {
    if (this.socket) {
      this.socket.disconnect()
    }
    if (this.transport) {
      this.transport.dispose()
    }
  },
  mounted () {
    const API_ID = parseURLParams(window.location).meet_external_api_id
    this.transport = this.$postmessage({
      scope: `meet_external_api_${API_ID}`
    })
    this.transport.on('event', ({ name, data }) => {
      switch (name) {
        case 'calling':
          if (!data.length) return
          const sts = this.rooms.filter((item) => data.includes(item.id))
          this.socket.emit('call', sts, (caller) => {
            this.goMeet(caller)
          })
          break
        case 'displayName':
          this.initSocket(data)
          break;
        case 'receive':
          this.goMeet(data)
        default:
          break
      }
    })
  },
  methods: {
    initSocket ({name,id}) {
      const url = this.isDev ? 'http://localhost:4004' : 'https://im.jialekoi.cn'
      this.socket = this.$io(url, {
        transports: ['websocket'],
        reconnectionDelayMax: 100,
        path: '/nuxt.socket',
        query: {
          token: 'test',
          room: this.id,
          name,
          id
        }
      })
      // on reconnection, reset the transports option, as the Websocket
      // connection may have failed (caused by proxy, firewall, browser, ...)
      this.socket.io.on('reconnect_attempt', () => {
        this.socket.io.opts.transports = ['polling', 'websocket']
      })
      this.socket.on('connect', () => {
        this.transport.sendEvent({
          name: 'connect'
        })
        this.socket.on(`rooms_${this.id}`, (m) => {
          this.transport.sendEvent({
            name: 'users',
            data: m
          })
          this.rooms = m
        })
        this.socket.on('call_' + id, (caller) => {
          this.transport.sendEvent({
            name: 'called',
            data: caller
          })
        })
      })
      this.socket.on('connect_error', (error) => {
        this.transport.sendEvent({
          name: 'error',
          data: error
        })
      })
    },
    goMeet (caller) {
      window.open('/meet?roomName=' + caller.roomName + '&name=' + caller.name, '_blank')
    }
  }
}
</script>
