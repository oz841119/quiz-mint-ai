import Logo from "@/components/Logo";
import Link from "next/link";

export default function Home() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-white to-gray-100">
			{/* Hero Section */}
			<section className="container mx-auto px-4 py-20 text-center">
				<div className="flex justify-center mb-8">
					<Logo className="scale-150" />
				</div>
				<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
					由AI生成考試題目
				</p>
				<Link
					href="/dashboard/exam"
					className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
				>
					開始使用
				</Link>
			</section>

			{/* Features Section */}
			<section className="container mx-auto px-4 py-16">
				<div className="grid md:grid-cols-3 gap-8">
					<div className="bg-white p-6 rounded-xl shadow-sm">
						<div className="text-blue-600 text-2xl mb-4">📊</div>
						<h3 className="text-xl font-semibold mb-2">......</h3>
						<p className="text-gray-600">............</p>
					</div>
					<div className="bg-white p-6 rounded-xl shadow-sm">
						<div className="text-blue-600 text-2xl mb-4">🤖</div>
						<h3 className="text-xl font-semibold mb-2">AI 驅動</h3>
						<p className="text-gray-600">智能生成測驗題目，節省您的時間</p>
					</div>
					<div className="bg-white p-6 rounded-xl shadow-sm">
						<div className="text-blue-600 text-2xl mb-4">🎯</div>
						<h3 className="text-xl font-semibold mb-2">......</h3>
						<p className="text-gray-600">............</p>
					</div>
				</div>
			</section>
		</main>
	);
}
