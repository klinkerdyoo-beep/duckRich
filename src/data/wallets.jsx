// src/data/wallets.js
// โหลดทุกไฟล์ png ในทุกโฟลเดอร์ย่อยของ assets/wallets
const files = import.meta.glob('../assets/wallet/*/*.png', { eager: true });

const wallets = {};

for (const [path, mod] of Object.entries(files)) {
  // path = ../assets/wallets/wallet1/primary-blue.png
  const parts = path.split('/');
  const folder = parts[parts.length - 2]; // ชื่อ folder เช่น wallet1
  const name = parts[parts.length - 1].replace('.png', ''); // ชื่อไฟล์ เช่น primary-blue

  if (!wallets[folder]) wallets[folder] = {}; // สร้าง object ของแต่ละ wallet folder
  wallets[folder][name] = mod.default;       // เก็บ path ของรูป
}

export default wallets;
