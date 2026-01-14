# Docker 部署指南

## 📦 保留的核心文件

- `Dockerfile` - Docker 映像配置
- `docker-compose.prod.yml` - 生產環境編排
- `.dockerignore` - 構建優化
- `env.production.example` - 環境變數範例
- `src/app/api/health/route.ts` - 健康檢查 API
- `next.config.ts` - 已添加 standalone 配置

## 🚀 部署步驟

### 1. 準備環境變數
```bash
cp env.production.example .env.production
nano .env.production
```

填入你的配置：
```env
OPEN_AI_BASE_URL=https://api.openai.com/v1
MODEL_KEY=你的_API_金鑰
```

### 2. 部署
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

### 3. 常用命令
```bash
# 查看狀態
docker-compose -f docker-compose.prod.yml ps

# 查看日誌
docker-compose -f docker-compose.prod.yml logs -f

# 重啟
docker-compose -f docker-compose.prod.yml restart

# 停止
docker-compose -f docker-compose.prod.yml down

# 更新
git pull
docker-compose -f docker-compose.prod.yml up -d --build
```

## 🔧 VPS 準備

如果 VPS 還沒安裝 Docker：

```bash
# 安裝 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# 安裝 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 登出並重新登入
exit
```

## 🌐 設置域名（可選）

### 安裝 Nginx
```bash
sudo apt install -y nginx
```

### 配置反向代理
```bash
sudo nano /etc/nginx/sites-available/quiz-mint-ai
```

添加：
```nginx
server {
    listen 80;
    server_name 你的域名.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 啟用配置
```bash
sudo ln -s /etc/nginx/sites-available/quiz-mint-ai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 獲取 SSL 證書
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d 你的域名.com
```

## 🔍 健康檢查

```bash
curl http://localhost:3000/api/health
# 應返回: {"status":"ok","timestamp":"..."}
```

## ⚠️ 故障排除

### 容器無法啟動
```bash
docker-compose -f docker-compose.prod.yml logs
```

### 端口被佔用
```bash
sudo lsof -i :3000
```

### 防火牆設置
```bash
sudo ufw allow 3000
sudo ufw allow 80
sudo ufw allow 443
```

---

就這麼簡單！🎉
