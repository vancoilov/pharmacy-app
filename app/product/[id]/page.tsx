'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import {
  Heart,
  ShoppingCart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Star,
  Minus,
  Plus,
  Check,
  Truck,
  Shield,
  RotateCcw,
  ThumbsUp,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { ProductCard } from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES, REVIEWS } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/lib/cart-context';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product = PRODUCTS.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Производот не е пронајден</h1>
          <Link href="/shop" className="text-primary hover:underline">
            Назад кон продавница
          </Link>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const discountedPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  const category = CATEGORIES.find((c) => c.id === product.category);
  const productReviews = REVIEWS.filter((r) => r.productId === product.id);
  
  // Related products from same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = productReviews.filter((r) => r.rating === stars).length;
    const percentage = productReviews.length > 0 ? (count / productReviews.length) * 100 : 0;
    return { stars, count, percentage };
  });

  // Mock images (in real app would come from product.images)
  const images = product.images || [1, 2, 3].map(() => null);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Погледни го ${product.name}`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
    }
    setShowShareMenu(false);
  };

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
            <Link href="/shop" className="hover:text-primary">
              Продавница
            </Link>
            <span className="mx-2">/</span>
            {category && (
              <>
                <Link href={`/shop?category=${category.id}`} className="hover:text-primary">
                  {category.name}
                </Link>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Product Overview */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-xl border border-border overflow-hidden group">
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <span className="text-8xl text-muted-foreground/30">
                  {category?.icon || '💊'}
                </span>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded-md">
                    {product.badge}
                  </span>
                )}
                {product.discount && product.discount > 0 && (
                  <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-md">
                    -{product.discount}%
                  </span>
                )}
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 justify-center">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 rounded-lg border-2 overflow-hidden transition ${
                      currentImageIndex === index
                        ? 'border-primary'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-xl text-muted-foreground/50">
                        {category?.icon || '💊'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            <div className="text-sm text-muted-foreground">{product.brand}</div>

            {/* Name */}
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{product.name}</h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(product.rating || 0)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} рецензии)</span>
              </div>
            )}

            {/* SKU */}
            {product.sku && (
              <div className="text-sm text-muted-foreground">
                SKU: <span className="font-medium">{product.sku}</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">{discountedPrice} ден</span>
              {product.discount && product.discount > 0 && (
                <span className="text-xl text-muted-foreground line-through">{product.price} ден</span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            )}

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock !== false ? (
                <>
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-medium">На залиха</span>
                </>
              ) : (
                <>
                  <span className="w-5 h-5 text-red-500">✕</span>
                  <span className="text-red-500 font-medium">Нема на залиха</span>
                </>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-muted transition"
                  disabled={product.inStock === false}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-16 h-12 flex items-center justify-center font-medium border-x border-border">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-muted transition"
                  disabled={product.inStock === false}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${
                  addedToCart 
                    ? 'bg-green-600 text-white' 
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
                disabled={product.inStock === false}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Додадено во кошничка</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Додади во кошничка</span>
                  </>
                )}
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                  liked
                    ? 'border-red-500 text-red-500 bg-red-50'
                    : 'border-border hover:border-muted-foreground'
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-red-500' : ''}`} />
                <span>{liked ? 'Во омилени' : 'Додади во омилени'}</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-muted-foreground transition"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Сподели</span>
                </button>

                {showShareMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowShareMenu(false)} />
                    <div className="absolute top-full mt-2 right-0 bg-white border border-border rounded-lg shadow-lg z-20 min-w-[150px]">
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition first:rounded-t-lg"
                      >
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition"
                      >
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition last:rounded-b-lg"
                      >
                        Копирај линк
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div className="text-xs text-muted-foreground">Бесплатна достава над 1500 ден</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div className="text-xs text-muted-foreground">Гаранција за квалитет</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <RotateCcw className="w-5 h-5 text-primary" />
                </div>
                <div className="text-xs text-muted-foreground">Враќање до 14 дена</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0 mb-6">
              <TabsTrigger
                value="description"
                className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                Опис
              </TabsTrigger>
              <TabsTrigger
                value="characteristics"
                className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                Карактеристики
              </TabsTrigger>
              <TabsTrigger
                value="usage"
                className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                Упатство
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                Рецензии ({product.reviews || 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-0">
              <div className="bg-white rounded-xl border border-border p-6">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {product.fullDescription || product.description || 'Нема достапен опис за овој производ.'}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="characteristics" className="mt-0">
              <div className="bg-white rounded-xl border border-border overflow-hidden">
                {product.characteristics && product.characteristics.length > 0 ? (
                  <table className="w-full">
                    <tbody>
                      {product.characteristics.map((char, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-muted/30' : ''}>
                          <td className="px-6 py-3 font-medium text-foreground w-1/3">{char.label}</td>
                          <td className="px-6 py-3 text-muted-foreground">{char.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    Нема достапни карактеристики за овој производ.
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="usage" className="mt-0">
              <div className="bg-white rounded-xl border border-border p-6">
                <p className="text-muted-foreground leading-relaxed">
                  {product.usage || 'Нема достапно упатство за овој производ. Консултирајте се со фармацевт.'}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Rating Summary */}
                <div className="bg-white rounded-xl border border-border p-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-foreground mb-2">{product.rating || 0}</div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.round(product.rating || 0)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-muted text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Врз основа на {product.reviews || 0} рецензии
                    </div>
                  </div>

                  {/* Rating Distribution */}
                  <div className="space-y-2">
                    {ratingDistribution.map((item) => (
                      <div key={item.stars} className="flex items-center gap-2">
                        <span className="w-3 text-sm text-muted-foreground">{item.stars}</span>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="w-8 text-sm text-muted-foreground text-right">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-2 space-y-4">
                  {productReviews.length > 0 ? (
                    productReviews.map((review) => (
                      <div key={review.id} className="bg-white rounded-xl border border-border p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="font-medium text-foreground">{review.userName}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString('mk-MK', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-muted text-muted'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4">{review.comment}</p>
                        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Корисно ({review.helpful || 0})</span>
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white rounded-xl border border-border p-12 text-center">
                      <div className="text-4xl mb-4">💬</div>
                      <h3 className="font-medium text-foreground mb-2">Нема рецензии</h3>
                      <p className="text-muted-foreground">
                        Биди прв/а што ќе остави рецензија за овој производ.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-6">Слични производи</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  image={p.image || ''}
                  name={p.name}
                  price={p.price}
                  discount={p.discount}
                  badge={p.badge}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
