# Sử dụng image nhẹ hơn để chạy ứng dụng
FROM node:20-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép ứng dụng đã build từ máy của bạn vào container
COPY .next ./.next
COPY node_modules ./node_modules
COPY package.json ./
COPY public ./public

# Mở cổng 3000 để phục vụ ứng dụng
EXPOSE 3000

# Khởi động ứng dụng Next.js
CMD ["npm", "start"]