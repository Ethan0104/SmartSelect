import { Check } from "lucide-react"

export default function FeaturesSection() {
  const features = ["Emails", "File Paths (Mac, Windows, and Linux)", "HTTP URLs", "UUIDs"]

  return (
    <section id="features" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Features</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our extension supercharges your double-click to intelligently select complete text patterns in one action!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-primary">Supported text patterns:</h3>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-3 mt-1">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg text-gray-200">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-2 text-primary">Customizable</h3>
            <p className="text-gray-300">
              Enable only the patterns you need through our simple settings panel. You have complete control over which
              selection patterns are active.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
