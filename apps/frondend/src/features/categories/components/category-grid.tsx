import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

// Mock data for categories
const categories = [
    { id: 1, name: "Haircut", slug: "haircut", icon: "✂️" },
    { id: 2, name: "Massage", slug: "massage", icon: "💆" },
    { id: 3, name: "Nails", slug: "nails", icon: "💅" },
    { id: 4, name: "Makeup", slug: "makeup", icon: "💄" },
    { id: 5, name: "Spa", slug: "spa", icon: "🧖" },
    { id: 6, name: "Other", slug: "other", icon: "✨" },
]

export function CategoryGrid() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
                <Link key={category.id} href={`/categories/${category.slug}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                        <CardContent className="flex flex-col items-center justify-center p-6 gap-2">
                            <span className="text-4xl">{category.icon}</span>
                            <span className="font-medium text-sm text-center">{category.name}</span>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}
