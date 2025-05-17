export default function HeroArrowGraphic() {
  return (
    <div className="bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-800 relative">
      <div className="relative h-[280px] w-full">
        {/* Top email (unhighlighted) */}
        <div className="absolute top-4 left-2">
          <span className="text-lg text-gray-200 font-mono">
            john.doe@example.com
          </span>
        </div>

        {/* Bottom email (highlighted) */}
        <div className="absolute bottom-4 right-2">
          <span
            className="text-lg bg-primary/50 text-gray-200 p-1 rounded font-mono px-2"
            style={{ backgroundClip: 'content-box' }}
          >
            john.doe@example.com
          </span>
        </div>

        {/* SVG Arrow */}
        <div className="absolute inset-0 overflow-visible">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 280"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Curved arrow path */}
            <path
              d="M150,50 Q250,100 280,220"
              stroke="#548CC5"
              strokeWidth="2"
              strokeDasharray="5,5"
              fill="none"
              id="arrowPath"
            />

            {/* Arrow head */}
            {/* <path d="M280,220 L270,215 L275,205 Z" fill="#548CC5" /> */}
          </svg>
        </div>

        {/* Label - positioned along the path */}
        <div
          className="absolute bg-none px-2 py-0.5 text-xs text-primary font-medium whitespace-nowrap z-10"
          style={{
            top: '110px',
            left: '30vw',
            transform: 'translateX(-50%)',
          }}
        >
          a single double click
        </div>
      </div>
    </div>
  );
}
