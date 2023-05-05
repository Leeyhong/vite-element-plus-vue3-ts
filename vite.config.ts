import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'

const targetURL = 'http://10.38.27.12'
export default defineConfig({
  base: './',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
  server: {
    host: '10.39.83.111', // 本机电脑ip
    port: 80,
    proxy: {
      '/business': {
        target: targetURL, // 代理服务器地址
        changeOrigin: true,
        rewrite: path => path.replace(/^\/business/, '')
      }
    }
  },
  
  // 生产环境打包配置
  build: {
    emptyOutDir: true,
    terserOptions: {
        compress: {
            drop_console: true,
            drop_debugger: true,
        },
    },
    rollupOptions: {
        output: {
            chunkFileNames: 'static/js/[name]-[hash].js',
            entryFileNames: 'static/js/[name]-[hash].js',
            assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
            }
        }
    }
}
})
