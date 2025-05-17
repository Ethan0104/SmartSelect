"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function FinalCtaSection() {
  return (
    <section className="py-12 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">Ready to Enhance Your Browsing Experience?</h2>
          <p className="text-lg text-gray-300">
            Start selecting text smarter, not harder. Install Better Double Click Select today.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white text-lg h-12 px-8 font-bold"
            onClick={() =>
              window.open(
                "https://chromewebstore.google.com/detail/better-double-click-selec/nhkmlbajieenacopoepocpoiiancolgb?utm_source=website&utm_medium=footer&utm_campaign=landing",
                "_blank",
              )
            }
          >
            Add to Chrome
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
