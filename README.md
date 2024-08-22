This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Next App

```sh
npx create-next-app@latest store
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Remove Boilerplate

- in globals.css remove all code after directives
- page.tsx

```tsx
function HomePage() {
  return <h1 className="text-3xl">HomePage</h1>;
}
export default HomePage;
```

### Create Pages

- about
- admin
- cart
- favorites
- orders
- products
- reviews

- new file - pageName/page.tsx

```tsx
function AboutPage() {
  return <div>AboutPage</div>;
}
export default AboutPage;
```

### Shadcn/ui

[Docs](https://ui.shadcn.com/)

[Next Install](https://ui.shadcn.com/docs/installation/next)

```sh
npx shadcn-ui@latest init

```

- New York
- Zinc
- CSS variables:YES

```sh
npx shadcn-ui@latest add button
```

```tsx
import { Button } from "@/components/ui/button";

function HomePage() {
  return (
    <div>
      <h1 className="text-3xl">HomePage</h1>
      <Button variant="outline" size="lg" className="capitalize m-8">
        Click me
      </Button>
    </div>
  );
}
export default HomePage;
```

```sh
npx shadcn-ui@latest add breadcrumb card checkbox dropdown-menu input label popover select separator table textarea toast skeleton carousel
```

- components
  - ui
  - cart
  - form
  - global
  - home
  - navbar
  - products
  - single-product

### Navbar - Setup

- create

- navbar
  - CartButton
  - DarkMode
  - LinksDropdown
  - Logo
  - Navbar
  - NavSearch
  - SignOutLink
  - UserIcon

### Container Component

- create globals/Container.tsx

```tsx
import { cn } from "@/lib/utils";

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-6xl xl:max-w-7xl px-8", className)}>
      {children}
    </div>
  );
}

export default Container;
```

cn() function takes any number of arguments (which are expected to be strings or falsy values), filters out any falsy values (like false, null, undefined, 0, NaN, and empty string ""), and then joins the remaining strings into a single string with spaces in between.

### Navbar Component

```tsx
import Logo from "./Logo";
import LinksDropdown from "./LinksDropdown";
import DarkMode from "./DarkMode";
import CartButton from "./CartButton";
import NavSearch from "./NavSearch";
import Container from "../global/Container";
function Navbar() {
  return (
    <nav className="border-b ">
      <Container className="flex flex-col sm:flex-row  sm:justify-between sm:items-center flex-wrap gap-4 py-8">
        <Logo />
        <NavSearch />
        <div className="flex gap-4 items-center ">
          <CartButton />
          <DarkMode />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}
export default Navbar;
```

- layout.tsx

```tsx
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";

return (
  <html lang="en">
    <body className={inter.className}>
      <Navbar />
      <Container className="py-20">{children}</Container>
    </body>
  </html>
);
```

### Logo

```sh
npm install react-icons
```

[React Icons](https://react-icons.github.io/react-icons/)

Logo.tsx

```tsx
import Link from "next/link";
import { Button } from "../ui/button";
import { LuArmchair } from "react-icons/lu";
import { VscCode } from "react-icons/vsc";

function Logo() {
  return (
    <Button size="icon" asChild>
      <Link href="/">
        <VscCode className="w-6 h-6" />
      </Link>
    </Button>
  );
}

export default Logo;
```

### NavSearch Component

```tsx
import { Input } from "../ui/input";

function NavSearch() {
  return (
    <Input
      type="search"
      placeholder="search product..."
      className="max-w-xs dark:bg-muted "
    />
  );
}
export default NavSearch;
```

### CartButton Component

```tsx
import { Button } from "@/components/ui/button";
import { LuShoppingCart } from "react-icons/lu";
import Link from "next/link";
async function CartButton() {
  // temp
  const numItemsInCart = 9;
  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="flex justify-center items-center relative"
    >
      <Link href="/cart">
        <LuShoppingCart />
        <span className="absolute -top-3 -right-3 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
          {numItemsInCart}
        </span>
      </Link>
    </Button>
  );
}
export default CartButton;
```

### Theme

[Theming Options](https://ui.shadcn.com/docs/theming)
[Themes](https://ui.shadcn.com/themes)

- replace css variables in in globals.css

### Providers

- create app/providers.tsx

```tsx
"use client";

function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export default Providers;
```

layout.tsx

```tsx
import Providers from "./providers";

return (
  <html lang="en" suppressHydrationWarning>
    <body className={inter.className}>
      <Providers>
        <Navbar />
        <Container className="py-20">{children}</Container>
      </Providers>
    </body>
  </html>
);
```
