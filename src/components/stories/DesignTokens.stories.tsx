import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Design System/Design Tokens',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ColorPalette = () => (
  <div className="p-8 bg-background">
    <h1 className="text-4xl font-serif font-bold mb-8 text-foreground">Design Tokens</h1>

    {/* Warm Vintage Palette */}
    <section className="mb-16">
      <h2 className="text-2xl font-serif font-semibold mb-6 text-amber-700">Warm Vintage - Amber</h2>
      <div className="grid grid-cols-5 gap-4">
        {[
          { name: 'Amber 50', hex: '#faf8f3', var: '--color-amber-50' },
          { name: 'Amber 500', hex: '#c9935f', var: '--color-amber-500' },
          { name: 'Amber 600', hex: '#b8804d', var: '--color-amber-600' },
          { name: 'Amber 700', hex: '#a66d3b', var: '--color-amber-700' },
        ].map((color) => (
          <div key={color.var} className="flex flex-col gap-2">
            <div
              className="w-full h-24 rounded-lg border border-border shadow-sm"
              style={{ backgroundColor: color.hex }}
            />
            <p className="font-mono text-xs font-semibold text-foreground">{color.name}</p>
            <p className="font-mono text-xs text-text-secondary">{color.hex}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Sea Glass Teal */}
    <section className="mb-16">
      <h2 className="text-2xl font-serif font-semibold mb-6 text-teal-700">Sea Glass - Teal</h2>
      <div className="grid grid-cols-4 gap-4">
        {[
          { name: 'Teal 50', hex: '#f0faf9', var: '--color-teal-50' },
          { name: 'Teal 500', hex: '#5a9a99', var: '--color-teal-500' },
          { name: 'Teal 600', hex: '#4a8282', var: '--color-teal-600' },
          { name: 'Teal 700', hex: '#3a6a67', var: '--color-teal-700' },
        ].map((color) => (
          <div key={color.var} className="flex flex-col gap-2">
            <div
              className="w-full h-24 rounded-lg border border-border shadow-sm"
              style={{ backgroundColor: color.hex }}
            />
            <p className="font-mono text-xs font-semibold text-foreground">{color.name}</p>
            <p className="font-mono text-xs text-text-secondary">{color.hex}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Parchment Cream */}
    <section className="mb-16">
      <h2 className="text-2xl font-serif font-semibold mb-6 text-amber-700">Parchment - Cream</h2>
      <div className="grid grid-cols-3 gap-4">
        {[
          { name: 'Parchment 50', hex: '#fffbf5', var: '--color-parchment-50' },
          { name: 'Parchment 500', hex: '#f5c9a8', var: '--color-parchment-500' },
          { name: 'Parchment 600', hex: '#e8b896', var: '--color-parchment-600' },
        ].map((color) => (
          <div key={color.var} className="flex flex-col gap-2">
            <div
              className="w-full h-24 rounded-lg border border-border shadow-sm"
              style={{ backgroundColor: color.hex }}
            />
            <p className="font-mono text-xs font-semibold text-foreground">{color.name}</p>
            <p className="font-mono text-xs text-text-secondary">{color.hex}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Water Glass Effects */}
    <section className="mb-16">
      <h2 className="text-2xl font-serif font-semibold mb-6 text-foreground">Water Glass Effects</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="glass-effect p-6 rounded-2xl">
          <p className="font-serif text-sm font-semibold text-foreground mb-2">Glass Effect</p>
          <p className="text-xs text-text-secondary">Subtle blur with light border</p>
        </div>
        <div className="glass-effect-sm p-6 rounded-xl">
          <p className="font-serif text-sm font-semibold text-foreground mb-2">Glass Effect SM</p>
          <p className="text-xs text-text-secondary">Medium blur, compact</p>
        </div>
        <div className="glass-effect-lg p-6 rounded-3xl">
          <p className="font-serif text-sm font-semibold text-foreground mb-2">Glass Effect LG</p>
          <p className="text-xs text-text-secondary">Strong blur, elevated</p>
        </div>
      </div>
    </section>

    {/* Typography */}
    <section className="mb-16">
      <h2 className="text-2xl font-serif font-semibold mb-6 text-foreground">Typography</h2>
      <div className="space-y-4">
        <div>
          <p className="text-5xl font-serif font-bold text-foreground mb-1">Display Large - Serif</p>
          <p className="text-xs text-text-secondary font-mono">font-serif, text-5xl, font-bold</p>
        </div>
        <div>
          <p className="text-2xl font-serif font-semibold text-foreground mb-1">Heading - Serif</p>
          <p className="text-xs text-text-secondary font-mono">font-serif, text-2xl, font-semibold</p>
        </div>
        <div>
          <p className="text-lg font-sans font-normal text-foreground mb-1">Body Text - Sans</p>
          <p className="text-xs text-text-secondary font-mono">font-sans, text-lg, font-normal</p>
        </div>
        <div>
          <p className="text-sm font-sans font-medium text-text-secondary mb-1">Secondary - Sans</p>
          <p className="text-xs text-text-secondary font-mono">font-sans, text-sm, font-medium</p>
        </div>
      </div>
    </section>

    {/* Spacing Scale */}
    <section className="mb-16">
      <h2 className="text-2xl font-serif font-semibold mb-6 text-foreground">Spacing Scale</h2>
      <div className="space-y-4">
        {[
          { label: 'Space 4 (16px)', class: 'h-4' },
          { label: 'Space 6 (24px)', class: 'h-6' },
          { label: 'Space 8 (32px)', class: 'h-8' },
          { label: 'Space 12 (48px)', class: 'h-12' },
          { label: 'Space 16 (64px)', class: 'h-16' },
        ].map(({ label, class: className }) => (
          <div key={label} className="flex items-center gap-4">
            <p className="text-sm font-mono font-semibold text-foreground w-32">{label}</p>
            <div className={`${className} bg-amber-500 rounded shadow-sm`} />
          </div>
        ))}
      </div>
    </section>

    {/* Interactive States */}
    <section>
      <h2 className="text-2xl font-serif font-semibold mb-6 text-foreground">Interactive States</h2>
      <div className="space-y-4">
        <button className="glass-effect px-6 py-3 rounded-lg font-sans font-medium text-foreground transition-smooth hover:shadow-lg active:scale-95">
          Glass Button - Hover
        </button>
        <button className="bg-amber-600 text-white px-6 py-3 rounded-lg font-sans font-medium transition-smooth hover:bg-amber-700 active:scale-95">
          Amber Button
        </button>
        <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-sans font-medium transition-smooth hover:bg-teal-700 active:scale-95">
          Teal Button
        </button>
      </div>
    </section>
  </div>
);

export const Default: Story = {
  render: () => <ColorPalette />,
};
