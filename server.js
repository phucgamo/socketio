// Import các thư viện và modules cần thiết
const express = require('express');  // Thư viện Express cho web server
const http = require('http');         // Module HTTP để tạo server
const socketIo = require('socket.io'); // Thư viện Socket.IO cho giao tiếp real-time

// Khởi tạo ứng dụng Express, server HTTP và Socket.IO
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Định nghĩa route cho đường dẫn chính
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Sự kiện xảy ra khi có kết nối mới từ client (máy khách)
io.on('connection', (socket) => {
  console.log('A user connected'); // Log thông báo khi có kết nối mới

  // Xử lý sự kiện khi người dùng gửi tin nhắn
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Gửi tin nhắn đến tất cả người dùng
  });

  // Xử lý sự kiện khi người dùng ngắt kết nối
  socket.on('disconnect', () => {
    console.log('User disconnected'); // Log thông báo khi người dùng ngắt kết nối
  });
});

// Bắt đầu lắng nghe trên cổng 3000 và log khi server đã sẵn sàng
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
