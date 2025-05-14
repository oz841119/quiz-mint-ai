import Logo from "@/components/Logo";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
	return (
		<main className="min-h-screen relative overflow-hidden flex flex-col">
			{/* Diagonal Background */}
			<div className="absolute inset-0 z-0">
				<div className="absolute inset-0 bg-blue-100" />
				<div className="absolute inset-0 bg-purple-200 [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
			</div>

			{/* Hero Section - Full Screen */}
			<div className="relative flex-1 flex items-center z-10 py-8 md:py-12">
				{/* Background decoration */}
				<div className="absolute top-0 left-0 w-full h-full pointer-events-none">
					<div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-300 opacity-30 blur-3xl" />
					<div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-300 opacity-30 blur-3xl" />
				</div>

				<section className="container mx-auto px-4 sm:px-6">
					<div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
						<div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
							<div className="mb-4 md:mb-6">
								<Logo className="mx-auto lg:mx-0 transform scale-90 sm:scale-100" />
							</div>
							<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
								Intelligent Quiz Generator
							</h1>
							<div className="mb-6 md:mb-8">
								<p className="text-lg sm:text-xl text-gray-700 mb-2 max-w-xl sm:max-w-2xl mx-auto lg:mx-0">
									AI-powered quizzes to enhance learning efficiency
								</p>
								<div className="text-sm sm:text-md text-gray-600 flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-1 justify-center lg:justify-start max-w-xl sm:max-w-2xl mx-auto lg:mx-0 mt-3">
									<span className="flex items-center">
										<span className="mr-1 sm:mr-2 text-blue-600">🌐</span>{" "}
										Multilingual Support
									</span>
									<span className="flex items-center">
										<span className="mr-1 sm:mr-2 text-purple-600">🤖</span>{" "}
										AI-Generated Questions, Answers & Explanations
									</span>
								</div>
							</div>
							<div className="flex justify-center lg:justify-start">
								<Link
									href="/dashboard/exam"
									className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-blue-300/50 w-full sm:w-auto max-w-xs mx-auto sm:mx-0"
								>
									Get Started
								</Link>
							</div>
						</div>
						<div className="flex-1 relative mt-8 lg:mt-0 w-full max-w-lg mx-auto lg:max-w-none">
							<div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/20">
								<Image
									src="/screen.png"
									alt="Quiz Mint AI Platform Screenshot"
									width={800}
									height={500}
									className="w-full h-auto object-contain"
									priority
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent" />
							</div>
						</div>
					</div>
				</section>
			</div>

			{/* Footer */}
			<footer className="container mx-auto px-4 py-3 sm:py-4 text-center text-gray-600 text-xs relative z-10">
				<p>© {new Date().getFullYear()} Quiz Mint AI. All rights reserved.</p>
			</footer>
		</main>
	);
}
