import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/features/search/components/search-bar'
import { CategoryGrid } from '@/features/categories/components/category-grid'
import { FeaturedServices } from '@/features/services/components/featured-services'
import { CTASection } from '@/components/sections/cta-section'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                Đặt lịch thông minh,{' '}
                <span className="text-primary">trải nghiệm hoàn hảo</span>
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Kết nối với hàng nghìn dịch vụ chất lượng cao. Đặt lịch chỉ trong 30 giây,
                thanh toán an toàn, hoàn tiền dễ dàng.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="text-base" asChild>
                  <Link href="/search">Khám phá ngay</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base" asChild>
                  <Link href="/provider/register">Đăng ký đối tác</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div>
                  <div className="text-3xl font-bold text-primary">12K+</div>
                  <div className="text-sm text-muted-foreground">Dịch vụ</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Khách hàng</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">4.9★</div>
                  <div className="text-sm text-muted-foreground">Đánh giá</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <SearchBar variant="card" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              Danh mục phổ biến
            </h2>
            <p className="text-lg text-muted-foreground">
              Khám phá hàng nghìn dịch vụ chất lượng cao
            </p>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {/* Featured Services */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              Đối tác nổi bật
            </h2>
            <p className="text-lg text-muted-foreground">
              Được hàng nghìn khách hàng tin tưởng
            </p>
          </div>
          <FeaturedServices limit={6} />
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
