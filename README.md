## Projeto Foods da Full-Stack Week

Nesse projeto estaremos trabalhando com Next, React e para o BD usarei o prisma e o Neon db para o Banco de Dados

- Utilizei a seed para popular o banco de dados.
- Todas as pastas que não são rotas estão começando com _, para identificar melhor.



## Comandos utilizados

Para usar o banco de dados postgresql, usei o comando
````
npx prisma init --datasource-provider postgresql
````
Para fazer a migração do banco de dados usei o comando 
````
npx prisma migrate dev --name init_database   
````
E para a seed usei o  comando:
````
npx prisma db seed  
````



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

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
