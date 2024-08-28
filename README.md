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

### Shadcn DarkMode

[Next.js Dark Mode](https://ui.shadcn.com/docs/dark-mode/next)

```sh
npm install next-themes
```

- create app/theme-provider.tsx

```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

providers.tsx

```tsx
"use client";
import { ThemeProvider } from "./theme-provider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
export default Providers;
```

### DarkMode Component

- make sure you export as default !!!

```tsx
"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

https://nextui.org/docs/customization/dark-mode

### Links

- create utils/links.ts

```ts
type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/products", label: "products" },
  { href: "/favorites", label: "favorites" },
  { href: "/cart", label: "cart" },
  { href: "/orders", label: "orders" },
];
```

### LinksDropdown Component

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LuAlignLeft } from "react-icons/lu";
import Link from "next/link";
import { Button } from "../ui/button";
import { links } from "@/utils/links";

function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w-[100px]">
          <LuAlignLeft className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start" sideOffset={10}>
        {links.map((link) => {
          return (
            <DropdownMenuItem key={link.href}>
              <Link href={link.href} className="capitalize w-full">
                {link.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropdown;
```

### Supabase

[Docs](https://supabase.com/)

- create account and organization
- create project
- setup password in .env (optional)
- add .env to .gitignore !!!

### Prisma

- install prisma vs-code extension

Prisma ORM is a database toolkit that simplifies database access in web applications. It allows developers to interact with databases using a type-safe and auto-generated API, making database operations easier and more secure.

- Prisma server: A standalone infrastructure component sitting on top of your database.
- Prisma client: An auto-generated library that connects to the Prisma server and lets you read, write and stream data in your database. It is used for data access in your applications.

```sh
npm install prisma --save-dev
npm install @prisma/client
```

```sh
npx prisma init
```

### Setup Instance

In development, the command next dev clears Node.js cache on run. This in turn initializes a new PrismaClient instance each time due to hot reloading that creates a connection to the database. This can quickly exhaust the database connections as each PrismaClient instance holds its own connection pool.

(Prisma Instance)[https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#solution]

- create utils/db.ts

```ts
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### Connect Supabase with Prisma

[Useful Info](https://supabase.com/partners/integrations/prisma)
[Useful Info](https://supabase.com/dashboard/project/wrgxzfukkikecsbvvbwe) # in your project

- add to .env

```bash
DATABASE_URL=""
DIRECT_URL=""
```

- Check CONNECT on your supabase project
- DATABASE_URL : Transaction + Password + "?pgbouncer=true&connection_limit=1"
- DIRECT_URL : Session + Password

```prisma
- Connect to db and connection btw Prisma and Supabase
datasource db {
  provider          = "postgresql"
  url               = env("DATABASE_URL")
  directUrl         = env("DIRECT_URL")
}

generator client {
  provider = "prisma-client-js"
}

- First table wiht columns id and name (similar to building in SQL workbench)
model TestProfile {
id  String @id @default(uuid())
name String

```

- npx prisma migrate dev --name init
- npx prisma db push

npx prisma migrate dev --name init creates a new migration for your database schema
changes and applies it, while npx prisma db push directly updates the database schema without creating a migration. In the context of databases, a migration is set of operations, that modify the database schema, helping it evolve over time while preserving existing data.

```bash
npx prisma db push
```

```bash
npx prisma studio
```

## Optional - Prisma Crud

[Prisma Docs](https://www.prisma.io/docs/concepts/components/prisma-client/crud)

- Create Single Record

```js
const task = await prisma.task.create({
  data: {
    content: "some task",
  },
});
```

- Get All Records

```js
const tasks = await prisma.task.findMany();
```

- Get record by ID or unique identifier

```js
// By unique identifier
const user = await prisma.user.findUnique({
  where: {
    email: "elsa@prisma.io",
  },
});

// By ID
const task = await prisma.task.findUnique({
  where: {
    id: id,
  },
});
```

- Update Record

```js
const updateTask = await prisma.task.update({
  where: {
    id: id,
  },
  data: {
    content: "updated task",
  },
});
```

- Update or create records

```js
const upsertTask = await prisma.task.upsert({
  where: {
    id: id,
  },
  update: {
    content: "some value",
  },
  create: {
    content: "some value",
  },
});
```

- Delete a single record

```js
const deleteTask = await prisma.task.delete({
  where: {
    id: id,
  },
});
```

### Practice Prisma Queries

about/page.tsx

```tsx
import db from "@/utils/db";

async function AboutPage() {
  const profile = await db.testProfile.create({
    data: {
      name: "random name",
    },
  });

  const users = await db.testProfile.findMany();

  return (
    <div>
      {users.map((user) => {
        return (
          <h2 key={user.id} className="text-2xl font-bold">
            {user.name}
          </h2>
        );
      })}
    </div>
  );
}
export default AboutPage;
```

### Product Model

```prisma

model Product {
  id           String     @id @default(uuid())
  name        String
  company     String
  description String
  featured   Boolean
  image       String
  price       Int
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  clerkId  String
}

```

- stop server

```bash
npx prisma db push
npx prisma studio
npm run dev
```

### Products JSON

- create prisma/products.json

```json
[
  {
    "name": "avant-garde lamp",
    "company": "Modenza",
    "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    "featured": true,
    "image": "https://images.pexels.com/photos/943150/pexels-photo-943150.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "price": 100,
    "clerkId": "clerkId"
  },
  {
    "name": "chic chair",
    "company": "Luxora",
    "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    "featured": true,
    "image": "https://images.pexels.com/photos/5705090/pexels-photo-5705090.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "price": 200,
    "clerkId": "clerkId"
  },
  {
    "name": "comfy bed",
    "company": "Homestead",
    "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    "featured": true,
    "image": "https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "price": 300,
    "clerkId": "clerkId"
  },
  {
    "name": "contemporary sofa",
    "company": "Comfora",
    "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    "featured": false,
    "image": "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "price": 400,
    "clerkId": "clerkId"
  }
]
```

### Seed File

- create prisma/seed.js

```js
const { PrismaClient } = require("@prisma/client");
const products = require("./products.json");
const prisma = new PrismaClient();

async function main() {
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

```sh
node prisma/seed
```

- check prisma studio

### Create More Components

- global

  - EmptyList
  - SectionTitle
  - LoadingContainer

- home

  - FeaturedProducts
  - Hero
  - HeroCarousel

- products
  - FavoriteToggleButton
  - FavoriteToggleForm
  - ProductsContainer
  - ProductsGrid
  - ProductsList

### Home Page

```tsx
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";

function HomPage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
}
export default HomPage;
```

### SectionTitle Component

```tsx
import { Separator } from "@/components/ui/separator";

function SectionTitle({ text }: { text: string }) {
  return (
    <div>
      <h2 className="text-3xl font-medium tracking-wider capitalize mb-8">
        {text}
      </h2>
      <Separator />
    </div>
  );
}
export default SectionTitle;
```

### EmptyList Component

```tsx
import { cn } from "@/lib/utils";

function EmptyList({
  heading = "No items found.",
  className,
}: {
  heading?: string;
  className?: string;
}) {
  return <h2 className={cn("text-xl ", className)}>{heading}</h2>;
}

export default EmptyList;
```

### FetchFeaturedProducts and FetchAllProducts

- create utils/actions.ts

```ts
import db from "@/utils/db";

export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
};

export const fetchAllProducts = () => {
  return db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
```

### FeaturedProducts Component

```tsx
import { fetchFeaturedProducts } from "@/utils/actions";
import EmptyList from "../global/EmptyList";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";
async function FeaturedProducts() {
  const products = await fetchFeaturedProducts();
  if (products.length === 0) return <EmptyList />;
  return (
    <section className="pt-24">
      <SectionTitle text="featured products" />
      <ProductsGrid products={products} />
    </section>
  );
}
export default FeaturedProducts;
```

### FormatCurrency

- utils/format.ts

```ts
export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};
```

### FavoriteToggleButton

```tsx
import { FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
function FavoriteToggleButton({ productId }: { productId: string }) {
  return (
    <Button size="icon" variant="outline" className="p-2 cursor-pointer">
      <FaHeart />
    </Button>
  );
}
export default FavoriteToggleButton;
```

### ProductsGrid

```tsx
import { Product } from "@prisma/client";
import { formatCurrency } from "@/utils/format";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";

function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { name, price, image } = product;
        const productId = product.id;
        const dollarsAmount = formatCurrency(price);
        return (
          <article key={productId} className="group relative">
            <Link href={`/products/${productId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-4">
                  <div className="relative h-64 md:h-48 rounded overflow-hidden ">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      priority
                      className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h2 className="text-lg  capitalize">{name}</h2>
                    <p className="text-muted-foreground  mt-2">
                      {dollarsAmount}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute top-7 right-7 z-5">
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
export default ProductsGrid;
```

### RemotePatterns

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
```

### Hero Component

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroCarousel from "./HeroCarousel";

function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          We are changing the way people shop
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque et
          voluptas saepe in quae voluptate, laborum maiores possimus illum
          reprehenderit aut delectus veniam cum perferendis unde sint doloremque
          non nam.
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link href="/products">Our Products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
}
export default Hero;
```

### Product Images

[Pexels](https://www.pexels.com/)

HeroCarousel

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import hero1 from "@/public/images/hero1.jpg";
import hero2 from "@/public/images/hero2.jpg";
import hero3 from "@/public/images/hero3.jpg";
import hero4 from "@/public/images/hero4.jpg";

const carouselImages = [hero1, hero2, hero3, hero4];

function HeroCarousel() {
  return (
    <div className="hidden lg:block">
      <Carousel>
        <CarouselContent>
          {carouselImages.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="p-2">
                    <Image
                      src={image}
                      alt="hero"
                      className="w-full h-[24rem] rounded-md object-cover"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
export default HeroCarousel;
```

### About Page

```tsx
function AboutPage() {
  return (
    <section>
      <h1 className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl">
        We love
        <span className="bg-primary py-2 px-4 rounded-lg tracking-widest text-white">
          store
        </span>
      </h1>
      <p className="mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero hic
        distinctio ducimus temporibus nobis autem laboriosam repellat, magni
        fugiat minima excepturi neque, tenetur possimus nihil atque! Culpa nulla
        labore nam?
      </p>
    </section>
  );
}
export default AboutPage;
```

### Suspense Component

- bcs the Hero component is static, doesn´t make sense to have a loadimng component
  for all the components, but only for the ones where we are fetching. Note: do not
  fetch anything here bcs it won't work the Suspense hook

app/page.tsx

```tsx
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import LoadingContainer from "@/components/global/LoadingContainer";
import { Suspense } from "react";
function HomPage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts />
      </Suspense>
    </>
  );
}
export default HomPage;
```

### LoadingContainer Component

```tsx
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "../ui/card";

function LoadingContainer() {
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <LoadingProduct />
      <LoadingProduct />
      <LoadingProduct />
    </div>
  );
}

function LoadingProduct() {
  return (
    <Card>
      <CardContent className="p-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-4 w-3/4 mt-4" />
        <Skeleton className="h-4 w-1/4 mt-4" />
      </CardContent>
    </Card>
  );
}
export default LoadingContainer;
```

### Products Page - Loading

- create app/products/loading.tsx

```tsx
"use client";

import LoadingContainer from "@/components/global/LoadingContainer";

function loading() {
  return <LoadingContainer />;
}
export default loading;
```

### Products Page

```tsx
import ProductsContainer from "@/components/products/ProductsContainer";

async function ProductsPage({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string };
}) {
  const layout = searchParams.layout || "grid";
  const search = searchParams.search || "";
  return (
    <>
      <ProductsContainer layout={layout} search={search} />
    </>
  );
}
export default ProductsPage;
```

### Products Page - Loading

- create app/products/loading.tsx

```tsx
"use client";

import LoadingContainer from "@/components/global/LoadingContainer";

function loading() {
  return <LoadingContainer />;
}
export default loading;
```

### ProductsContainer Component

```tsx
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchAllProducts } from "@/utils/actions";
import Link from "next/link";

async function ProductsContainer({
  layout,
  search,
}: {
  layout: string;
  search: string;
}) {
  const products = await fetchAllProducts();
  const totalProducts = products.length;
  const searchTerm = search ? `&search=${search}` : "";
  return (
    <>
      {/* HEADER */}
      <section>
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg">
            {totalProducts} product{totalProducts > 1 && "s"}
          </h4>
          <div className="flex gap-x-4">
            <Button
              variant={layout === "grid" ? "default" : "ghost"}
              size="icon"
              asChild
            >
              <Link href={`/products?layout=grid${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              variant={layout === "list" ? "default" : "ghost"}
              size="icon"
              asChild
            >
              <Link href={`/products?layout=list${searchTerm}`}>
                <LuList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </section>
      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : layout === "grid" ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )}
      </div>
    </>
  );
}
export default ProductsContainer;
```

### ProductsList Component

```tsx
import { formatCurrency } from "@/utils/format";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@prisma/client";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";
function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        const { name, price, image, company } = product;
        const dollarsAmount = formatCurrency(price);
        const productId = product.id;
        return (
          <article key={productId} className="group relative">
            <Link href={`/products/${productId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                  <div className="relative h-64  md:h-48 md:w-48">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      priority
                      className="w-full rounded-md object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold capitalize">{name}</h2>
                    <h4 className="text-muted-foreground">{company}</h4>
                  </div>
                  <p className="text-muted-foreground text-lg md:ml-auto">
                    {dollarsAmount}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute bottom-8 right-8 z-5">
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
export default ProductsList;
```
