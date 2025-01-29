import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'text-justify',
    'my-5',
    'my-6',
    'indent-8',
    'text-center',
    'text-emerald-700',
    'text-blue-600',
    'underline',
    'text-blue-500',
    'font-bold',
    'font-medium',
    'text-3x1',
    'text-2x1',
    'mx-8',
    'mx-10',
    'justify-start',
    'mb-10',
    'mb-15',
    'ml-1'
    // Adicione todas as classes que aparecem dinamicamente
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'card-bg-color': 'rgb(250, 243, 234)',
        'primary-blue': '#106EB0',
        'primary-orange': '#EC7000',
        'primary-gray': '#33303E',
        'second-gray': '#4E4B59',
        'gray-phone': '#F4F4F4',
        'txt-gray': '#7A7786',
        'opacity-gray': 'rgba(100, 80, 57, 0.1)',
      },
    },
    // fontFamily: {
    //   roboto: [
    //     '"Roboto"',
    //   ]
    // }

  },
  plugins: [],
} satisfies Config;
