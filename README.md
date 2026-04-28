# 竹文化展览网站

这是一个基于 [Next.js 16](https://nextjs.org) + [shadcn/ui](https://ui.shadcn.com) 的竹文化主题网站，展示中国竹文化的生态、历史、艺术和现代应用。

## 快速开始

### 环境要求
- Node.js 18+
- pnpm 9.0.0+

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm exec next dev --webpack --port 5000
```

启动后，在浏览器中打开 [http://localhost:5000](http://localhost:5000) 查看应用。

开发服务器支持热更新，修改代码后页面会自动刷新。

### 停止开发服务器
在终端中按 `Ctrl + C` 停止开发服务器。

### 构建生产版本
```bash
pnpm run build
```

### 启动生产服务器
```bash
pnpm run start
```

## 项目结构

```
src/
├── app/                      # Next.js App Router 目录
│   ├── layout.tsx           # 根布局组件
│   ├── page.tsx             # 首页
│   ├── globals.css          # 全局样式（包含 shadcn 主题变量）
│   ├── chapter0/            # 竹韵九州 - 竹文化概述
│   │   └── page.tsx
│   ├── chapter1/            # 竹影风物 - 竹的生态与分布
│   │   └── page.tsx
│   ├── chapter2/            # 竹林艺韵 - 竹与艺术
│   │   └── page.tsx
│   ├── chapter3/            # 竹与生活 - 现代应用
│   │   └── page.tsx
│   ├── timeline/            # 竹文化历史时间线
│   │   └── page.tsx
│   └── components/          # 自定义组件
│       ├── BambooBackground.tsx
│       ├── Logo.tsx
│       ├── Navigation.tsx
│       ├── TopNavbar.tsx
│       └── VideoBackground.tsx
├── components/              # React 组件目录
│   └── ui/                  # shadcn/ui 基础组件
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
├── lib/                     # 工具函数库
│   └── utils.ts            # cn() 等工具函数
└── hooks/                   # 自定义 React Hooks
    └── use-mobile.ts
```

## 页面说明

| 页面 | 路径 | 描述 |
|------|------|------|
| 首页 | `/` | 网站入口，展示竹文化主题视频 |
| 竹韵九州 | `/chapter0` | 竹文化概述，包含中国竹分布地图 |
| 竹影风物 | `/chapter1` | 竹的生态特征与地理分布 |
| 竹林艺韵 | `/chapter2` | 竹与中国传统艺术（书画、诗词、音乐） |
| 竹与生活 | `/chapter3` | 竹在现代生活中的应用 |
| 时间线 | `/timeline` | 竹文化发展历史时间线 |

## 核心开发规范

### 1. 组件开发

**优先使用 shadcn/ui 基础组件**

本项目已预装完整的 shadcn/ui 组件库，位于 `src/components/ui/` 目录。开发时应优先使用这些组件作为基础：

```tsx
// ✅ 推荐：使用 shadcn 基础组件
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>标题</CardHeader>
      <CardContent>
        <Input placeholder="输入内容" />
        <Button>提交</Button>
      </CardContent>
    </Card>
  );
}
```

**可用的 shadcn 组件清单**

- 表单：`button`, `input`, `textarea`, `select`, `checkbox`, `radio-group`, `switch`, `slider`
- 布局：`card`, `separator`, `tabs`, `accordion`, `collapsible`, `scroll-area`
- 反馈：`alert`, `alert-dialog`, `dialog`, `toast`, `sonner`, `progress`
- 导航：`dropdown-menu`, `menubar`, `navigation-menu`, `context-menu`
- 数据展示：`table`, `avatar`, `badge`, `hover-card`, `tooltip`, `popover`
- 其他：`calendar`, `command`, `carousel`, `resizable`, `sidebar`

详见 `src/components/ui/` 目录下的具体组件实现。

### 2. 路由开发

Next.js 使用文件系统路由，在 `src/app/` 目录下创建文件夹即可添加路由：

```bash
# 创建新路由 /about
src/app/about/page.tsx

# 创建动态路由 /posts/[id]
src/app/posts/[id]/page.tsx

# 创建路由组（不影响 URL）
src/app/(marketing)/about/page.tsx

# 创建 API 路由
src/app/api/users/route.ts
```

**页面组件示例**

```tsx
// src/app/about/page.tsx
import { Button } from '@/components/ui/button';

export const metadata = {
  title: '关于我们',
  description: '关于页面描述',
};

export default function AboutPage() {
  return (
    <div>
      <h1>关于我们</h1>
      <Button>了解更多</Button>
    </div>
  );
}
```

**动态路由示例**

```tsx
// src/app/posts/[id]/page.tsx
export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>文章 ID: {id}</div>;
}
```

**API 路由示例**

```tsx
// src/app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ users: [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true });
}
```

### 3. 依赖管理

**必须使用 pnpm 管理依赖**

```bash
# ✅ 安装依赖
pnpm install

# ✅ 添加新依赖
pnpm add package-name

# ✅ 添加开发依赖
pnpm add -D package-name

# ❌ 禁止使用 npm 或 yarn
# npm install  # 错误！
# yarn add     # 错误！
```

项目已配置 `preinstall` 脚本，使用其他包管理器会报错。

### 4. 样式开发

**使用 Tailwind CSS v4**

本项目使用 Tailwind CSS v4 进行样式开发，并已配置 shadcn 主题变量。

```tsx
// 使用 Tailwind 类名
<div className="flex items-center gap-4 p-4 rounded-lg bg-background">
  <Button className="bg-primary text-primary-foreground">
    主要按钮
  </Button>
</div>

// 使用 cn() 工具函数合并类名
import { cn } from '@/lib/utils';

<div className={cn(
  "base-class",
  condition && "conditional-class",
  className
)}>
  内容
</div>
```

**主题变量**

主题变量定义在 `src/app/globals.css` 中，支持亮色/暗色模式：

- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`, `--destructive-foreground`
- `--border`, `--input`, `--ring`

### 5. 表单开发

推荐使用 `react-hook-form` + `zod` 进行表单开发：

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  username: z.string().min(2, '用户名至少 2 个字符'),
  email: z.string().email('请输入有效的邮箱'),
});

export default function MyForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: '', email: '' },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input {...form.register('username')} />
      <Input {...form.register('email')} />
      <Button type="submit">提交</Button>
    </form>
  );
}
```

### 6. 数据获取

**服务端组件（推荐）**

```tsx
// src/app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'no-store', // 或 'force-cache'
  });
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

**客户端组件**

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function ClientComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}
```

## 常见开发场景

### 添加新页面

1. 在 `src/app/` 下创建文件夹和 `page.tsx`
2. 使用 shadcn 组件构建 UI
3. 根据需要添加 `layout.tsx` 和 `loading.tsx`

### 创建业务组件

1. 在 `src/components/` 下创建组件文件（非 UI 组件）
2. 优先组合使用 `src/components/ui/` 中的基础组件
3. 使用 TypeScript 定义 Props 类型

### 添加全局状态

推荐使用 React Context 或 Zustand：

```tsx
// src/lib/store.ts
import { create } from 'zustand';

interface Store {
  count: number;
  increment: () => void;
}

export const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

### 集成数据库

推荐使用 Prisma 或 Drizzle ORM，在 `src/lib/db.ts` 中配置。

## 部署方法

### 方法1：Netlify 部署（推荐）
1. **准备代码**：
   - 确保所有代码已提交到 GitHub 仓库
   - 确保视频文件已上传到云存储（如 Google Drive、OneDrive）并更新代码中的链接


2. **连接 Netlify**：
   - 登录 [Netlify](https://www.netlify.com/)
   - 点击 "Add new site" → "Import an existing project"
   - 选择 GitHub 作为 Git provider
   - 授权 Netlify 访问你的 GitHub 仓库

3. **配置构建设置**：
   - **Build command**: `bash ./scripts/build.sh`
   - **Publish directory**: `.next`

4. **部署**：
   - 点击 "Deploy site" 开始部署
   - 等待部署完成（1-3 分钟）
   - 部署完成后，Netlify 会生成网站 URL


5. **自动更新**：
   - 修改 GitHub 上的代码并推送
   - Netlify 会自动检测更改并重新部署
   - 无需手动操作


### 方法2：Vercel 部署
1. **准备代码**：
   - 确保所有代码已提交到 GitHub 仓库
   - 确保视频文件已上传到云存储并更新代码中的链接


2. **连接 Vercel**：
   - 登录 [Vercel](https://vercel.com/)
   - 点击 "Add New Project"
   - 选择 GitHub 作为 Git provider
   - 选择你的项目仓库

3. **配置构建设置**：
   - **Build Command**: `npx next build`
   - **Output Directory**: `.next`

4. **部署**：
   - 点击 "Deploy" 开始部署
   - 等待部署完成
   - 部署完成后，Vercel 会生成网站 URL


### 方法3：GitHub Pages 部署
1. **准备代码**：
   - 确保所有代码已提交到 GitHub 仓库
   - 确保视频文件已上传到云存储并更新代码中的链接


2. **创建 GitHub Actions**：
   - 在项目根目录创建 `.github/workflows/deploy.yml` 文件
   - 复制以下内容：
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 18
         - run: npm install -g pnpm
         - run: pnpm install
         - run: pnpm run build
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

3. **配置 GitHub Pages**：
   - 进入仓库设置 → Pages
   - **Source**: 选择 "Deploy from a branch"
   - **Branch**: 选择 `gh-pages`，**Folder**: 选择 `/`
   - 点击 "Save"

4. **自动部署**：
   - 推送代码到 GitHub 后，GitHub Actions 会自动构建并部署
   - 部署完成后，访问 `https://你的用户名.github.io/仓库名`

## 技术栈
- **框架**: Next.js 16.1.1 (App Router)
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **样式**: Tailwind CSS v4
- **表单**: React Hook Form + Zod
- **图标**: Lucide React
- **字体**: Geist Sans & Geist Mono
- **包管理器**: pnpm 9+
- **TypeScript**: 5.x

## 参考文档

- [Next.js 官方文档](https://nextjs.org/docs)
- [shadcn/ui 组件文档](https://ui.shadcn.com)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com)

## 视频文件处理

本项目包含多个视频文件，由于 GitHub 文件大小限制（单个文件最大 25MB），视频文件需要单独处理：

### 本地开发
- 视频文件位于 `public/video/` 目录
- 开发服务器会自动加载本地视频

### 部署时
- **方案1**: 使用云存储（推荐）
  - 上传视频到 Google Drive、OneDrive 或其他云存储服务
  - 获取视频直链
  - 修改代码中的视频路径为云存储直链

- **方案2**: 使用 GitHub LFS
  - 安装 Git LFS: `git lfs install`
  - 跟踪视频文件: `git lfs track "public/video/*.mp4"`
  - 提交并推送: `git add . && git commit -m "Add videos" && git push`

### 视频文件清单
| 文件 | 大小 | 用途 |
|------|------|------|
| chapter0.mp4 | ~50MB | 竹韵九州页面背景视频 |
| chapter1.mp4 | ~50MB | 竹影风物页面背景视频 |
| chapter2.mp4 | ~50MB | 竹林艺韵页面背景视频 |
| chapter3.mp4 | ~50MB | 竹与生活页面背景视频 |
| timeline.mp4 | ~50MB | 时间线页面背景视频 |
| voice1.mp4 | ~10MB | 语音解说1 |
| voice2.mp4 | ~10MB | 语音解说2 |
| voice3.mp4 | ~10MB | 语音解说3 |

## 重要提示

1. **必须使用 pnpm** 作为包管理器
2. **优先使用 shadcn/ui 组件** 而不是从零开发基础组件
3. **遵循 Next.js App Router 规范**，正确区分服务端/客户端组件
4. **使用 TypeScript** 进行类型安全开发
5. **使用 `@/` 路径别名** 导入模块（已配置）
6. **视频文件**：由于 GitHub 文件大小限制，部署前需要将视频上传到云存储并更新链接
