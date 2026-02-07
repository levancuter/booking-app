import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
    return (
        <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">Sẵn sàng để bắt đầu?</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Tham gia cùng hàng nghìn người dùng và đối tác trên nền tảng đặt lịch dịch vụ hàng đầu.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/register">
                        <Button size="lg">Đăng ký ngay</Button>
                    </Link>
                    <Link href="/provider/register">
                        <Button size="lg" variant="outline">Trở thành đối tác</Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
