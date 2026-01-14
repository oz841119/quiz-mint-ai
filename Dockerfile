# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# 複製 package 文件
COPY package*.json ./

# 安裝依賴
RUN npm ci --only=production

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# 複製 package 文件
COPY package*.json ./

# 安裝所有依賴（包括 devDependencies）
RUN npm ci

# 複製源代碼
COPY . .

# 設置環境變數
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# 建置應用
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

# 設置環境變數
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 創建非 root 用戶
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 複製必要文件
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 設置正確的權限
RUN chown -R nextjs:nodejs /app

# 切換到非 root 用戶
USER nextjs

# 暴露端口
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 啟動應用
CMD ["node", "server.js"] 