'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  ChevronRight,
  Edit2,
  Save,
  X,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { ProductCard } from '@/components/ProductCard';
import { useAuth } from '@/lib/auth-context';
import { PRODUCTS, CATEGORIES } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MACEDONIAN_CITIES = [
  'Скопје',
  'Битола',
  'Куманово',
  'Прилеп',
  'Тетово',
  'Велес',
  'Охрид',
  'Гостивар',
  'Штип',
  'Струмица',
];

const ORDER_STATUS_MAP = {
  pending: { label: 'На чекање', color: 'text-yellow-600 bg-yellow-50', icon: Clock },
  processing: { label: 'Се обработува', color: 'text-blue-600 bg-blue-50', icon: Package },
  shipped: { label: 'Испратено', color: 'text-purple-600 bg-purple-50', icon: Truck },
  delivered: { label: 'Доставено', color: 'text-green-600 bg-green-50', icon: CheckCircle },
  cancelled: { label: 'Откажано', color: 'text-red-600 bg-red-50', icon: AlertCircle },
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, logout, updateProfile, orders, wishlist } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      setEditData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    await updateProfile(editData);
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Дома
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Мој профил</span>
          </nav>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-border p-6">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <h2 className="font-semibold text-foreground">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                <Link
                  href="#profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-primary/5 text-primary"
                >
                  <User className="w-5 h-5" />
                  <span>Профил</span>
                </Link>
                <Link
                  href="#orders"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition"
                >
                  <Package className="w-5 h-5" />
                  <span>Нарачки</span>
                  <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded-full">
                    {orders.length}
                  </span>
                </Link>
                <Link
                  href="#wishlist"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition"
                >
                  <Heart className="w-5 h-5" />
                  <span>Омилени</span>
                  <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded-full">
                    {wishlist.length}
                  </span>
                </Link>
                <Link
                  href="#address"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Адреси</span>
                </Link>
              </nav>

              <div className="border-t border-border mt-4 pt-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Одјава</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0 mb-6">
                <TabsTrigger
                  value="profile"
                  className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                  Профил
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                  Нарачки ({orders.length})
                </TabsTrigger>
                <TabsTrigger
                  value="wishlist"
                  className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                  Омилени ({wishlist.length})
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="mt-0">
                <div className="bg-white rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-foreground">Лични информации</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Измени</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-4 h-4" />
                          <span>Откажи</span>
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={isSaving}
                          className="flex items-center gap-1 text-sm text-primary hover:underline disabled:opacity-50"
                        >
                          <Save className="w-4 h-4" />
                          <span>{isSaving ? 'Се зачувува...' : 'Зачувај'}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Име
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.firstName}
                          onChange={(e) =>
                            setEditData({ ...editData, firstName: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                        />
                      ) : (
                        <p className="text-foreground">{user.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Презиме
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.lastName}
                          onChange={(e) =>
                            setEditData({ ...editData, lastName: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                        />
                      ) : (
                        <p className="text-foreground">{user.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Емаил
                      </label>
                      <p className="text-foreground">{user.email}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Телефон
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                          placeholder="070 123 456"
                        />
                      ) : (
                        <p className="text-foreground">{user.phone || '-'}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Адреса
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.address}
                          onChange={(e) =>
                            setEditData({ ...editData, address: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                          placeholder="ул. Македонија бр. 1"
                        />
                      ) : (
                        <p className="text-foreground">{user.address || '-'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Град
                      </label>
                      {isEditing ? (
                        <select
                          value={editData.city}
                          onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white"
                        >
                          <option value="">Изберете град</option>
                          {MACEDONIAN_CITIES.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="text-foreground">{user.city || '-'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Поштенски код
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.postalCode}
                          onChange={(e) =>
                            setEditData({ ...editData, postalCode: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                          placeholder="1000"
                        />
                      ) : (
                        <p className="text-foreground">{user.postalCode || '-'}</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="mt-0">
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="bg-white rounded-xl border border-border p-12 text-center">
                      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold text-foreground mb-2">Нема нарачки</h3>
                      <p className="text-muted-foreground mb-4">
                        Сеуште немате направено нарачка.
                      </p>
                      <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition"
                      >
                        Продавница
                      </Link>
                    </div>
                  ) : (
                    orders.map((order) => {
                      const status = ORDER_STATUS_MAP[order.status];
                      const StatusIcon = status.icon;

                      return (
                        <div
                          key={order.id}
                          className="bg-white rounded-xl border border-border p-6"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <div>
                              <div className="font-semibold text-foreground">{order.id}</div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(order.date).toLocaleDateString('mk-MK', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </div>
                            </div>
                            <div
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${status.color}`}
                            >
                              <StatusIcon className="w-4 h-4" />
                              <span>{status.label}</span>
                            </div>
                          </div>

                          <div className="space-y-3 mb-4">
                            {order.items.map((item, index) => {
                              const product = PRODUCTS.find((p) => p.id === item.productId);
                              const category = CATEGORIES.find(
                                (c) => c.id === product?.category
                              );
                              return (
                                <div key={index} className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center shrink-0">
                                    <span className="text-lg text-muted-foreground/50">
                                      {category?.icon || '💊'}
                                    </span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-foreground line-clamp-1">
                                      {product?.name || 'Непознат производ'}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {item.price} ден x {item.quantity}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div className="text-sm text-muted-foreground">
                              Вкупно: <span className="font-bold text-foreground">{order.total} ден</span>
                            </div>
                            <button className="flex items-center gap-1 text-sm text-primary hover:underline">
                              <span>Детали</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist" className="mt-0">
                {wishlistProducts.length === 0 ? (
                  <div className="bg-white rounded-xl border border-border p-12 text-center">
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Нема омилени производи</h3>
                    <p className="text-muted-foreground mb-4">
                      Додадете производи во омилени за да ги зачувате за подоцна.
                    </p>
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition"
                    >
                      Продавница
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {wishlistProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        image={product.image || ''}
                        name={product.name}
                        price={product.price}
                        discount={product.discount}
                        badge={product.badge}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
