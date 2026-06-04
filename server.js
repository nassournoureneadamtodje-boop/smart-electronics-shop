const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const db = new sqlite3.Database("./shop.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      category TEXT,
      price REAL,
      image TEXT,
      description TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT,
      phone TEXT,
      address TEXT,
      items TEXT,
      total REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run("DELETE FROM products");

  const products = [
    ["Wireless Headphones", "Audio", 25000, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", "Bluetooth headphones with deep bass and long battery life."],
    ["Wireless Earbuds", "Audio", 35000, "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1", "Compact earbuds with charging case and clear sound."],
    ["Bluetooth Speaker", "Audio", 30000, "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1", "Portable speaker for music, parties, and outdoor use."],
    ["Sound Bar", "Audio", 85000, "https://images.unsplash.com/photo-1545454675-3531b543be5d", "Home sound bar for TV and entertainment systems."],

    ["Smart Watch", "Wearables", 45000, "https://images.unsplash.com/photo-1523275335684-37898b6baf30", "Smart watch with heart rate, steps, and notifications."],
    ["Fitness Band", "Wearables", 28000, "https://images.unsplash.com/photo-1576243345690-4e4b79b63288", "Fitness tracker for daily health and activity monitoring."],
    ["Digital Watch", "Wearables", 18000, "https://images.unsplash.com/photo-1524592094714-0f0654e20314", "Stylish digital watch for daily use."],
    ["Smart Glasses", "Wearables", 120000, "https://images.unsplash.com/photo-1572635196237-14b3f281503f", "Modern smart glasses for technology lovers."],

    ["Gaming Mouse", "Accessories", 15000, "https://images.unsplash.com/photo-1527814050087-3793815479db", "Fast RGB gaming mouse with smooth control."],
    ["Wireless Keyboard", "Accessories", 22000, "https://images.unsplash.com/photo-1587829741301-dc798b83add3", "Comfortable keyboard for office and study use."],
    ["Laptop Bag", "Accessories", 18000, "https://images.unsplash.com/photo-1553062407-98eeb64c6a62", "Durable laptop bag for students and workers."],
    ["Laptop Cooling Pad", "Accessories", 24000, "https://images.unsplash.com/photo-1593642632823-8f785ba67e45", "Cooling pad to reduce laptop overheating."],
    ["Webcam HD", "Accessories", 32000, "https://images.unsplash.com/photo-1587826080692-f439cd0b70da", "HD webcam for online classes and meetings."],
    ["USB Cable", "Accessories", 5000, "https://images.unsplash.com/photo-1603539444875-76e7684265f6", "Strong USB charging and data transfer cable."],

    ["Phone Charger", "Phones", 12000, "https://images.unsplash.com/photo-1583863788434-e58a36330cf0", "Fast charger for Android smartphones."],
    ["Phone Stand", "Phones", 7000, "https://images.unsplash.com/photo-1616410011236-7a42121dd981", "Adjustable phone stand for video calls and study."],
    ["Phone Case", "Phones", 6000, "https://images.unsplash.com/photo-1601593346740-925612772716", "Protective phone case with modern design."],
    ["Screen Protector", "Phones", 4000, "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb", "Tempered glass screen protector for smartphones."],

    ["USB Flash Drive 64GB", "Storage", 8000, "https://images.unsplash.com/photo-1627843240167-b1f9e14cba99", "64GB flash drive for files, photos, and documents."],
    ["External Hard Drive", "Storage", 65000, "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b", "Portable hard drive for backup and storage."],
    ["Memory Card 128GB", "Storage", 18000, "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7", "128GB memory card for phones and cameras."],
    ["SSD Drive 512GB", "Storage", 95000, "https://images.unsplash.com/photo-1591488320449-011701bb6704", "Fast SSD drive for laptops and desktops."],

    ["Power Bank 20000mAh", "Power", 28000, "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5", "Large power bank for charging devices anywhere."],
    ["Extension Cable", "Power", 15000, "https://images.unsplash.com/photo-1625842268584-8f3296236761", "Multi-socket extension cable for home and office."]
  ];

  products.forEach(p => {
    db.run(
      "INSERT INTO products (name, category, price, image, description) VALUES (?, ?, ?, ?, ?)",
      p
    );
  });
});

app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/orders", (req, res) => {
  const { customer_name, phone, address, items, total } = req.body;

  if (!customer_name || !phone || !address || !items || !total) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.run(
    "INSERT INTO orders (customer_name, phone, address, items, total) VALUES (?, ?, ?, ?, ?)",
    [customer_name, phone, address, JSON.stringify(items), total],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Order placed successfully", orderId: this.lastID });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});