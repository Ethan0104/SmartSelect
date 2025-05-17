"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section id="home" className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Select Smarter, <span className="text-primary">Not Harder</span>
            </h1>
            <p className="text-xl text-gray-300 md:pr-12">
              No more dragging on text! Supercharge your double click to select text intelligently.
            </p>
            <div>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white text-lg h-14 px-8 font-bold"
                onClick={() =>
                  window.open(
                    "https://chromewebstore.google.com/detail/better-double-click-selec/nhkmlbajieenacopoepocpoiiancolgb?utm_source=website&utm_medium=hero&utm_campaign=landing",
                    "_blank",
                  )
                }
              >
                Add to Chrome
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-800 relative">
            <div className="flex flex-col h-full">
              <div className="text-left mb-8">
                <span className="text-xl text-gray-200 p-2 rounded-md font-mono">john.doe@example.com</span>
              </div>

              <div className="relative flex-1 flex items-center justify-center">
                <svg width="200" height="100" viewBox="0 0 200 100" className="w-full h-full">
                  {/* Curved arrow from top left to bottom right */}
                  <path d="M30,30 Q100,80 170,80" fill="none" stroke="#548CC5" strokeWidth="2" strokeDasharray="5,5" />
                  {/* Arrow head pointing to the bottom right */}
                  <polygon points="170,80 160,75 163,85" fill="#548CC5" />
                  {/* Text positioned above the middle of the arrow */}
                  <text x="100" y="60" textAnchor="middle" fill="#548CC5" fontSize="12" fontWeight="bold">
                    a single double click
                  </text>
                </svg>
              </div>

              <div className="text-right mt-8">
                <span className="text-xl bg-primary/20 text-primary p-2 rounded-md font-mono">
                  john.doe@example.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
