import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface SearchBarProps {
    variant?: "default" | "card"
}

export function SearchBar({ variant = "default" }: SearchBarProps) {
    return (
        <div className="relative w-full max-w-xl mx-auto">
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border border-gray-200">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                    <Search className="h-5 w-5" />
                </div>

                <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    type="text"
                    id="search"
                    placeholder="Search for services..."
                />

                <div className="pr-2">
                    <Button size="sm">Search</Button>
                </div>
            </div>
        </div>
    )
}
