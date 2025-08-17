Steps:

1. NextJS Creation

bunx create-react-app@latest . --yes

2. Prisma Initialization

bun add -D prisma tsx
bun add @prisma/extension-accelerate @prisma/client

bun add @prisma/adapter-neon @prisma/adapter-pg

bunx prisma generate

3. ShadCN setup

bunx --bun shadcn@latest init

bunx --bun shadcn@latest add accordion alert alert-dialog aspect-ratio avatar badge breadcrumb button calendar card carousel chart checkbox collapsible command context-menu dialog drawer dropdown-menu hover-card input input-otp label menubar navigation-menu pagination popover progress radio-group resizable scroll-area select separator sheet sidebar skeleton slider sonner switch table tabs textarea toggle toggle-group tooltip

bun add next-themes

4. Better Auth 

bun add better-auth

bunx @better-auth/cli generate
bunx @better-auth/cli migrate (not allowed yet)

bunx prisma migrate dev --name "auth_schemas"
bunx prisma db push
