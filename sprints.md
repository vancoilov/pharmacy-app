# Аптека - Развој во спринтови

Реална фармацевтска е-commerce платформа слична на elenafarm.mk

---

## ✅ SPRINT 1 — ОСНОВА (UI SYSTEM + КОМПОНЕНТИ)

Fundament за целиот проект - design system, глобални компоненти, и реуزабилни UI елементи.

### 🎨 ДИЗАЈН СИСТЕМ
* ✅ Боје: бело, зелено (primary), сино (accent), неутрални тонови
* ✅ Типографија: Sans-serif за целиот сајт
* ✅ Spacing, borders, shadows

### 🧱 ГЛОБАЛНИ КОМПОНЕНТИ
* ✅ Header (пребарување, кошничка, wishlist)
* ✅ Bottom Navigation (мобилен)
* ✅ ProductCard (слика, цена, попуст, wishlist)
* ✅ Category shortcuts
* ✅ Buttons, Badges, Tags
* ✅ Footer

### 📐 РЕСПОНЗИВНОСТ
* ✅ Mobile-first approach (2 col grid)
* ✅ Tablet (3 col grid)
* ✅ Desktop (4 col grid)

### 🎯 СТАТУС: ✅ ЗАВРШЕН

---

## ✅ SPRINT 2 — HOMEPAGE

Комплетна homepage страна со сите главни секции.

### 📦 СОДРЖИНА
* ✅ Top bar (контакт инфо)
* ✅ Promo banner (достава)
* ✅ Hero slider (промоции)
* ✅ Categories grid (2x5 категории)
* ✅ Featured products (На попуст, Ново)
* ✅ Features section (достава, плаќање, поддршка)
* ✅ Newsletter signup
* ✅ Footer

### 🎨 ДИЗАЈН
* Слично на elenafarm.mk
*響сивна на desktop и мобилен

### 🎯 СТАТУС: ✅ ЗАВРШЕН

---

## ✅ SPRINT 3 — SHOP PAGE + FILTERS

Страна за приказ на сите производи со филтрирање и сортирање.

### 🔍 ФИЛТРИ (Collapsible)
* ✅ Категорија (checkbox list)
* ✅ Цена (min/max inputs)
* ✅ Бренд (checkbox list)
* ✅ На попуст (yes/no toggle)

### 📊 СОРТИРАЊЕ
* ✅ По популарност (default)
* ✅ По цена (ниска → висока)
* ✅ По цена (висока → ниска)
* ✅ Ново (most recent)

### 📱 LAYOUT
* ✅ Мобилен: 2 колони, филтри во drawer/modal
* ✅ Tablet: 3 колони, филтри на страна
* ✅ Desktop: 4 колони, филтри на страна

### 📦 ДОПОЛНИТЕЛНО
* ✅ Active filters tags со X за бришење
* ✅ Breadcrumb навигација
* ✅ Products count
* ✅ Empty state кога нема резултати
* ✅ lib/data.ts со 24 производи и брендови

### 🎯 СТАТУС: ✅ ЗАВРШЕН

---

## ✅ SPRINT 4 — PRODUCT DETAIL PAGE

Детална страна за еден производ.

### 📷 ГАЛЕРИЈА
* ✅ Swipeable image gallery (или слајдер)
* ✅ Thumbnail навигација
* ✅ Zoom на image

### 📝 ИНФОРМАЦИИ
* ✅ Име + бренд
* ✅ Цена + попуст
* ✅ Rating (звезди) + број на reviews
* ✅ Кратко описание
* ✅ Quantity selector (+-  buttons)

### 🎬 АКЦИИ
* ✅ "Додади во кошничка" (primary button)
* ✅ "Додади во омилени" (heart icon)
* ✅ Share (социјални мрежи)

### 📑 ТАБОВИ
* ✅ Полн опис
* ✅ Карактеристики (таблица)
* ✅ Упатство за користење
* ✅ Related/Similar products

### 💬 REVIEWS
* ✅ List of reviews
* ✅ Rating distribution

### 🎯 СТАТУС: ✅ ЗАВРШЕН

---

## ✅ SPRINT 5 — CART PAGE + CHECKOUT

Кошничка и нарачка форма.

### 🛒 КОШНИЧКА PAGE
* ✅ List of cart items
* ✅ Quantity control (+/- buttons)
* ✅ Remove item (X button)
* ✅ Subtotal + tax + shipping
* ✅ Total price
* ✅ "Продолжи кон нарачка" button
* ✅ "Продолжи куповање" link

### 📋 CHECKOUT PAGE
* ✅ Delivery info form:
  * ✅ Име и презиме (required)
  * ✅ Email (required)
  * ✅ Телефон (required)
  * ✅ Адреса (required)
  * ✅ Град (dropdown)
  * ✅ Постален број

* ✅ Shipping method:
  * ✅ Стандардна достава (5-7 денови)
  * ✅ Експресна достава (1-2 денови)

* ✅ Payment method:
  * ✅ Плаќање при достава (cash on delivery)
  * ✅ Online плаќање (Stripe/PayPal)

* ✅ Order review:
  * ✅ Cart summary
  * ✅ Prices breakdown
  * ✅ "Потврди нарачка" button

### 🎯 СТАТУС: ✅ ЗАВРШЕН

---

## ✅ SPRINT 6 — USER ACCOUNT

Кориснички профил и логика за регистрација.

### 👤 PAGES
* ✅ Login page
* ✅ Register page
* ✅ My profile
* ✅ My orders
* ✅ Wishlist (омилени производи)
* ✅ Address book (во профил)
* Payment methods (за следна верзија)

### 🎯 СТАТУС: ✅ ЗАВРШЕН

---

## 🟠 SPRINT 7 — ADMIN DASHBOARD (Основа)

Администраторски панел за управување со платформата.

### 📊 DASHBOARD
* Overview cards (вкупни нарачки, продажба, производи, корисници)
* Recent orders table
* Chart (sales trend)
* Quick stats

### 🧭 NAVIGATION (Sidebar)
* Контролна табла (Dashboard)
* Производи (Products)
* Категории (Categories)
* Нарачки (Orders)
* Промоции (Promotions)
* Корисници (Users)
* Подесувања (Settings)

### 🎨 ДИЗАЈН
* SaaS-style layout
* Sidebar + main content
* Dark mode ready

### 🎯 GOAL: Admin dashboard structure

---

## 🟢 SPRINT 8 — ADMIN PRODUCTS MANAGEMENT

Управување со производи.

### 📦 PRODUCTS LIST
* Table: слика | име | цена | залиха | категорија | статус
* Pagination
* Search + filters
* Actions: Edit, Delete, View

### ➕ ADD/EDIT PRODUCT FORM
* Име (required)
* Опис (required, rich editor)
* Цена (required)
* Попуст (% или фиксна сума)
* Категорија (dropdown)
* Бренд
* Барови за категорија (tags)
* Upload слики (multiple, drag-drop)
* Залиха/количество
* Toggle: "Во промоција"
* Toggle: "Активен/неактивен"

### 🎯 GOAL: Manage products inventory

---

## 🔴 SPRINT 9 — ADMIN CATEGORIES + PROMOTIONS

Управување со категории и промоции.

### 📂 CATEGORIES
* List of categories with image
* Add/Edit/Delete category
* Reorder categories (drag-drop)

### 🎁 PROMOTIONS
* List of active promotions
* Create promotion:
  * Назив
  * Selected products (multi-select)
  * Discount % or fixed price
  * Start date + end date
  * Enable/disable toggle
* Edit/Delete promotion

### 🎯 GOAL: Control categories and discounts

---

## 🟡 SPRINT 10 — ADMIN ORDERS + SETTINGS

Управување со нарачки и подесувања.

### 📦 ORDERS
* Orders table: ID | Customer | Total | Date | Status
* Order details view:
  * Customer info
  * Products ordered
  * Status timeline (Ново → Испратено → Доставено)
  * Change status
* Export orders (CSV)

### ⚙️ SETTINGS
* Store info (назив, лого, email, телефон)
* Shipping settings (цена, free threshold)
* Email templates (order confirmation, shipping)
* Contact page (addresses, phones, hours)

### 🎯 GOAL: Complete admin functionality

